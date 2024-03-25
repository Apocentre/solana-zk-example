import * as anchor from "@coral-xyz/anchor";

const {AddressLookupTableProgram, TransactionMessage, VersionedTransaction} = anchor.web3;

/// Create a new lookup table
export const createAddressLUT = async (provider) => {
  const ownerWallet = provider.wallet.payer;
  const [lookupTableIx, lookupTable] = AddressLookupTableProgram.createLookupTable({
    authority: ownerWallet.publicKey,
    payer: ownerWallet.publicKey,
    // TODO: added -1 becuase on test validator it was failing with "not a recent slot"
    recentSlot: await provider.connection.getSlot() - 1,
  });

  await createAndSendV0Tx(provider, [lookupTableIx], ownerWallet.publicKey, [ownerWallet]);

  return lookupTable;
}

/// adds account to the given lookup table
/// account is a list of Pubkeys
export const addAddressesToAddressLUT = async (provider, addressLUT, addresses) => {
  const ownerWallet = provider.wallet.payer;
  const ix = AddressLookupTableProgram.extendLookupTable({
    payer: ownerWallet.publicKey,
    authority: ownerWallet.publicKey,
    lookupTable: addressLUT,
    addresses,
});

  await createAndSendV0Tx(provider, [ix], ownerWallet.publicKey, [ownerWallet]);
}

export const signAndSend = async(provider, tx, signers) => {
  let latestBlockhash = await provider.connection.getLatestBlockhash("confirmed");

  // Step 1 - Sign your transaction with the required `Signers`
  tx.sign(signers);
  
  // Step 2 - Send our v0 transaction to the cluster
  const txid = await provider.connection.sendTransaction(tx, {maxRetries: 5});

  // Step 3 - Confirm Transaction
  const confirmation = await provider.connection.confirmTransaction({
    signature: txid,
    blockhash: latestBlockhash.blockhash,
    lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
  });

  if (confirmation.value.err) {
    throw new Error(`   ❌ - Transaction not confirmed.\nReason: ${confirmation.value.err}`);
  }
}

/// Create and send a versioned transaction
export const createAndSendV0Tx = async (
  provider,
  instructions,
  payerKey,
  signers,
  addressLUTs = [],
) => {
  // 1 - Fetch the latest blockhash
  let latestBlockhash = await provider.connection.getLatestBlockhash("confirmed");

  // 2 - Generate Transaction Message
  const messageV0 = new TransactionMessage({
    payerKey,
    recentBlockhash: latestBlockhash.blockhash,
    instructions,
  }).compileToV0Message(addressLUTs);
  const tx = new VersionedTransaction(messageV0);

  // 3 -Sign and send
  await signAndSend(provider, tx, signers);
}

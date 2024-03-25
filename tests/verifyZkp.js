import * as anchor from "@coral-xyz/anchor";
import Web3Pkg from "@apocentre/solana-web3";
import {createAndSendV0Tx} from "./utils/tx.js";
import {buildBn128, utils} from "ffjavascript";
import {
  g1Uncompressed, g2Uncompressed, to32ByteBuffer, negateAndSerializeG1, reverseEndianness
} from "./utils/zk.js";
import proof from "../circuit/build/proof.json" assert {type: "json"}
import publicSignals from "../circuit/build/public.json" assert {type: "json"}
import {expect} from "./utils/solana-chai.js";

const Web3 = Web3Pkg.default;
const {unstringifyBigInts} = utils;

describe("Create wallet", () => {
  it("should verify the zkp", async () => {
    const curve = await buildBn128();
    const proofProc = unstringifyBigInts(proof);

    const proofA = g1Uncompressed(curve, proofProc.pi_a);
    const proofB = g2Uncompressed(curve, proofProc.pi_b);
    const proofC = g1Uncompressed(curve, proofProc.pi_c);
    const publicSignalsBuffer = to32ByteBuffer(BigInt(publicSignals[0]));

    const provider = anchor.AnchorProvider.local();
    const program = anchor.workspace.SimpleZkExample;
    const owner = provider.wallet.payer;
    const web3 = Web3(owner.publicKey)

    const ix = await program.methods
    .verifyZkp(proofA, proofB, proofC, publicSignalsBuffer)
    .accounts({})
    .instruction();

    let cbIx = web3.getComputationBudgetIx(1_000_000);

    await createAndSendV0Tx(
      provider,
      [cbIx, ix],
      owner.publicKey,
      [owner]
    );
  });

});

use anchor_lang::prelude::*;
use groth16_solana::groth16::Groth16Verifier;
use crate::{
  zk::verifying_key::VERIFYINGKEY, program_error::ErrorCode,
};

pub fn verify_proof(
  proof_a: [u8; 64],
  proof_b: [u8; 128],
  proof_c: [u8; 64],
  public_inputs: [u8; 32],
) -> Result<()> {
  let public_inputs = [public_inputs];
  let mut verifier = Groth16Verifier::new(
    &proof_a,
    &proof_b,
    &proof_c,
    &public_inputs,
    &VERIFYINGKEY,
  ).map_err(|_| ErrorCode::InvalidProofData)?;
  
  verifier.verify().map_err(|error| {
    msg!("Error: >>>>>>>>>> {:?}", error);
    ErrorCode::GrothVerificationError
  })?;

  Ok(())
}

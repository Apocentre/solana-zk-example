use anchor_lang::prelude::*;
use crate::{
  instructions::verify_zkp::VerifyZkp, zk::verifier::verify_proof
};

pub fn exec(
  _: Context<VerifyZkp>,
  proof_a: [u8; 64],
  proof_b: [u8; 128],
  proof_c: [u8; 64],
  public_inputs: [u8; 32],
) -> Result<()> {
  verify_proof(proof_a, proof_b, proof_c, public_inputs)?;

  Ok(())
}

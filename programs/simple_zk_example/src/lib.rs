mod zk;
mod instructions;
mod processors;
mod program_error;

use anchor_lang::prelude::*;
use crate::instructions::verify_zkp::*;

declare_id!("21WWBd4z2kJ2EBvKchFgBH1Bx23NkNq7aqVYNrbDBYhf");

#[program]
pub mod simple_zk_example {
  use super::*;

  pub fn verify_zkp(
    ctx: Context<VerifyZkp>,
    proof_a: [u8; 64],
    proof_b: [u8; 128],
    proof_c: [u8; 64],
    public_inputs: [u8; 32],
  ) -> Result<()> {
    processors::verify_zkp::exec(
      ctx,
      proof_a,
      proof_b,
      proof_c,
      public_inputs,
    )
  }
}

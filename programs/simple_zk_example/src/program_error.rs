use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
  #[msg("Invalid Groth16 proof data")]
  InvalidProofData,
  #[msg("Groth verification error")]
  GrothVerificationError,
}

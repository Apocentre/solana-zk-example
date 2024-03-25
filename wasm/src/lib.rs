mod utils;

use std::ops::Neg;
use ark_serialize::{CanonicalDeserialize, CanonicalSerialize, Compress, Validate};
use utils::{map_js_err, set_panic_hook};
use wasm_bindgen::prelude::*;

type G1 = ark_bn254::g1::G1Affine;

fn change_endianness(bytes: &[u8]) -> Vec<u8> {
  let mut vec = Vec::new();
  
  for b in bytes.chunks(32) {
    for byte in b.iter().rev() {
      vec.push(*byte);
    }
  }

  vec
}

#[wasm_bindgen(js_name = "convert_proof")]
pub fn convert_proof(proof: &[u8]) -> Result<Vec<u8>, String> {
  set_panic_hook();

  let proof_a: G1 = G1::deserialize_with_mode(
    &*[&change_endianness(&proof), &[0u8][..]].concat(),
    Compress::No,
    Validate::Yes,
  ).map_err(map_js_err)?;

  let mut proof_a_neg = [0u8; 65];

  proof_a
  .neg()
  .x
  .serialize_with_mode(&mut proof_a_neg[..32], Compress::No)
  .map_err(map_js_err)?;

  proof_a
  .neg()
  .y
  .serialize_with_mode(&mut proof_a_neg[32..], Compress::No)
  .map_err(map_js_err)?;

  let proof_a = change_endianness(&proof_a_neg[..64]);

  Ok(proof_a)
}

import {buildBn128, utils} from "ffjavascript";
import * as snarkjs from "snarkjs"
import {convert_proof} from "wasm"
import {g1Uncompressed, g2Uncompressed, to32ByteBuffer} from "../tests/utils/zk.js";
import proof from "./proof.json" assert {type: "json"}
import publicSignals from "./public.json" assert {type: "json"}
import vkey from "./verification_key.json" assert {type: "json"}

const {unstringifyBigInts} = utils;

const main = async () => {
  const curve = await buildBn128();
  const proofProc = unstringifyBigInts(proof);

  let proofA = g1Uncompressed(curve, proofProc.pi_a);
  proofA = convert_proof(proofA);  
  console.log("proofA >>>>>>>>>>>>>>>", new Uint8Array(proofA));
  const proofB = g2Uncompressed(curve, proofProc.pi_b);
  console.log("proofB >>>>>>>>>>>>>>>", new Uint8Array(proofB));
  const proofC = g1Uncompressed(curve, proofProc.pi_c);
  console.log("proofC >>>>>>>>>>>>>>>", new Uint8Array(proofC));
  const publicSignalsBuffer = [
    to32ByteBuffer(BigInt(publicSignals[0])),
    to32ByteBuffer(BigInt(publicSignals[1])),
    to32ByteBuffer(BigInt(publicSignals[2])),
  ];

  console.log(">>>>>>>>>>>>>>>", publicSignalsBuffer.map(v => new Uint8Array(v)))

  const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
}


main()
.then(() => console.log("Success"))
.catch((err) => console.log("Error: ", err))

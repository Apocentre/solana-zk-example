export const reverseEndianness = (buffer) => {
  return Buffer.from(buffer.reverse());
}

export const negateAndSerializeG1 = async (curve, reversedP1Uncompressed) => {
  if (!reversedP1Uncompressed || !(reversedP1Uncompressed instanceof Uint8Array || Buffer.isBuffer(reversedP1Uncompressed))) {
    console.error('Invalid input to negateAndSerializeG1:', reversedP1Uncompressed);
    throw new Error('Invalid input to negateAndSerializeG1');
  }
  // Negate the G1 point
  let p1 = curve.G1.toAffine(curve.G1.fromRprUncompressed(reversedP1Uncompressed, 0));
  let negatedP1 = curve.G1.neg(p1);

  // Serialize the negated point
  // The serialization method depends on your specific library
  let serializedNegatedP1 = new Uint8Array(64); // 32 bytes for x and 32 bytes for y
  curve.G1.toRprUncompressed(serializedNegatedP1, 0, negatedP1);
  // curve.G1.toRprUncompressed(serializedNegatedP1, 32, negatedP1.y);

  // Change endianness if necessary
  let proof_a = reverseEndianness(serializedNegatedP1);

  return proof_a;
}

export const g1Uncompressed = (curve, p1Raw) => {
  const p1 = curve.G1.fromObject(p1Raw);
  const buff = new Uint8Array(64); // 64 bytes for G1 uncompressed
  curve.G1.toRprUncompressed(buff, 0, p1);

  return Buffer.from(buff);
}

export const g2Uncompressed = (curve, p2Raw) => {
  const p2 = curve.G2.fromObject(p2Raw);
  const buff = new Uint8Array(128); // 128 bytes for G2 uncompressed
  curve.G2.toRprUncompressed(buff, 0, p2);

  return Buffer.from(buff);
}

export const toHex64Padded = val => BigInt(val).toString(16).padStart(64, "0");
export const to32ByteBuffer = val => Buffer.from(toHex64Padded(val), "hex");

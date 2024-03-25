echo "Compiling multiply.circom..."

circom ./circuit/multiply.circom  --r1cs --sym --wasm -o ./circuit/build -l node_modules

if [ -f ./circuit/build/ptau/powersOfTau28_hez_final_10}.ptau ]; then
    echo "----- powersOfTau28_hez_final_10}.ptau already exists -----"
else
    echo "----- Download powersOfTau28_hez_final_10.ptau -----"
    mkdir ./circuit/build/ptau
    wget -P ./circuit/build/ptau https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_10.ptau
fi

cd ./circuit/build/multiply_js
node generate_witness.js multiply.wasm ../../input.json witness.wtns

# Copy the witness.wtns to the outside and go there
cp witness.wtns ../witness.wtns
cd ..

# Start a new powers of tau ceremony
snarkjs powersoftau new bn128 10 pot10_0000.ptau -v

# Contribute to the ceremony
snarkjs powersoftau contribute pot10_0000.ptau pot10_0001.ptau --name="First contribution" -v

# Start generating th phase 2
snarkjs powersoftau prepare phase2 pot10_0001.ptau pot10_final.ptau -v

# Generate a .zkey file that will contain the proving and verification keys together with all phase 2 contributions
snarkjs groth16 setup multiply.r1cs pot10_final.ptau multiply_0000.zkey

# Contribute to the phase 2 of the ceremony
snarkjs zkey contribute multiply_0000.zkey multiply_0001.zkey --name="1st Contributor Name" -v

# Export the verification key
snarkjs zkey export verificationkey multiply_0001.zkey verification_key.json

# Generate a zk-proof associated to the circuit and the witness. This generates proof.json and public.json
snarkjs groth16 prove multiply_0001.zkey witness.wtns proof.json public.json

# Verify the proof
snarkjs groth16 verify verification_key.json public.json proof.json

# Generate a Solidity verifier that allows verifying proofs on Ethereum blockchain
# snarkjs zkey export solidityverifier multiply_0001.zkey ../contracts/ZkInVerifier.sol

# Generate and print parameters of call
snarkjs generatecall | tee parameters.txt

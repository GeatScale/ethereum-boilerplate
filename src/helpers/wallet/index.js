import { ethers } from "ethers";

export const sameAddress = (from, to) => {
  return from.toLowerCase() === to.toLowerCase();
};

export async function decryptWallet(encryptedJSON, password) {
  const Wallet = await ethers.Wallet.fromEncryptedJson(encryptedJSON, password);
  const { address, _mnemonic, privateKey } = Wallet;

  return {
    Wallet,
    address,
    mnemonic: _mnemonic(),
    privateKey,
  };
}

import { ethers } from "ethers";

const session = () => {
  return {};
};

export const passwords_match = (password, confirm_password) =>
  password === confirm_password;

export const is_valid_password_length = (password) => password.length > 7;

export const is_valid_input_seed = (seed, chosen_words) => {
  const arr = seed.split(` `);

  let words_match = true;
  for (let i = 0; i < chosen_words.length; i++)
    if (arr[i] !== chosen_words[i]) words_match = false;

  return words_match && chosen_words.length === arr.length;
};

export const getEncryptedKeyStore = async () => {
  const encryptedJSON = await session.get(`ks`, true);
  const { address } = JSON.parse(encryptedJSON);
  return { encryptedJSON, address: `0x${address}` };
};

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

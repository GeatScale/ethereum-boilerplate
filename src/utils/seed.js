import { ethers } from "ethers";
import { decryptWallet, getEncryptedKeyStore } from "../helpers/wallet";
import { HD_PATH } from "constants/wallet";

const types = {};
const session = () => {
  return {};
};

export function generate_seed() {
  try {
    const { mnemonic } = ethers.Wallet.createRandom();
    return mnemonic.phrase;
  } catch (e) {
    console.log(e);
  }
}

export function create_wallet({ password, seed, onSuccess, onFail }) {
  return async (dispatch) => {
    const wallet = ethers.Wallet.fromMnemonic(seed);

    if (ethers.utils.isValidMnemonic(seed)) {
      const encryptedJSON = await wallet.encrypt(password, { path: HD_PATH });

      session.set(`ks`, encryptedJSON, false, true);
      session.delete(`seed`);
      session.set(`logged`, JSON.stringify(true));

      dispatch({ type: types.LOGGED, logged: true });
      onSuccess({ address: wallet.address });
      return;
    }

    onFail("INVALID_SEED");
  };
}

export function createWalletFromPK(
  { privateKey, password, onSuccess, onFail },
  provider,
) {
  return async (dispatch) => {
    try {
      const WalletFromPK = new ethers.Wallet(privateKey, provider);
      const seed = WalletFromPK._mnemonic();

      if (seed) dispatch(create_wallet({ password, seed, onSuccess, onFail }));
    } catch (err) {
      console.log({ err });
      onFail("INVALID_PK");
    }
  };
}

export function restore_wallet_by_keystore(
  { password, keyStore, onSuccess, onFail },
  network,
) {
  console.log(network);
  return async (dispatch) => {
    try {
      const { address } = await decryptWallet(keyStore, password);

      if (address) {
        session.set(`ks`, keyStore, false, true);
        session.set(`logged`, JSON.stringify(true));
        dispatch({ type: types.LOGGED, logged: true });
        onSuccess();
        return;
      }
    } catch (err) {
      console.log("Error trying to login: ", { err });
      onFail("Login failed!");
    }
  };
}

export function login({ success, error, password }, network) {
  console.log(network);
  return async (dispatch) => {
    const { encryptedJSON, address } = await getEncryptedKeyStore();

    if (encryptedJSON && !address) {
      error("Old Wallet. Restore with the Seed Phrase.");
      return;
    }

    try {
      const { address } = await decryptWallet(encryptedJSON, password);

      if (address) {
        session.set(`logged`, JSON.stringify(true));
        await dispatch({ type: types.LOGGED, logged: true });
        success();
        return;
      }

      error("Login failed!");
    } catch (err) {
      console.log("Error trying to login: ", { err });
      error("Login failed!");
    }

    return;
  };
}

export function logout({ success }) {
  return (dispatch) => {
    session.set(`logged`, JSON.stringify(false));
    dispatch({ type: types.LOGGED, logged: false });
    success();
  };
}

export function reset_transaction() {
  return (dispatch) => {
    dispatch({ type: types.RESET_TRANSACTION });
  };
}

export function set_transaction({ key, value }) {
  return (dispatch) => {
    dispatch({ type: types.SET_TRANSACTION, key, value });
  };
}

export function get_seed_and_pk({ password, success, error }) {
  return async () => {
    const { encryptedJSON } = await getEncryptedKeyStore();

    try {
      const { mnemonic, privateKey } = await decryptWallet(
        encryptedJSON,
        password,
      );

      if (mnemonic && mnemonic.phrase) {
        success({ seed: mnemonic.phrase, privateKey });
        return;
      }

      error(`Password invalid!`);
    } catch (e) {
      error(e);
    }
  };
}

export function get_key_store({ callback }) {
  return async () => {
    const ks = await session.get(`ks`, true);
    callback(ks);
  };
}

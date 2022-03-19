import { createState, useState } from "@hookstate/core";
import { Persistence } from "@hookstate/persistence";

const authState = createState({
  isAuthenticated: false,
  keyStore: null,
});

export function useAuthState() {
  const state = useState(authState);
  state.attach(Persistence("authState"));

  return {
    get keyStore() {
      return state.keyStore.get();
    },
    get parsedKeyStore() {
      const keyStore = state.keyStore.get();
      return JSON.parse(keyStore);
    },
    setKeyStore(keyStore) {
      state.keyStore.set(keyStore);
    },
    get isAuthenticated() {
      return state.isAuthenticated.get();
    },
    setIsAuthenticated(isAuthenticated) {
      state.isAuthenticated.set(isAuthenticated);
    },
    get address() {
      const keyStore = state.keyStore.get();
      return JSON.parse(keyStore)?.address;
    },
    clearAuthData() {
      state.isAuthenticated.set(false);
      state.keyStore.set(null);
    },
  };
}

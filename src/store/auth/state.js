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
    setKeyStore(keyStore) {
      state.keyStore.set(keyStore);
    },
    get isAuthenticated() {
      return state.isAuthenticated.get();
    },
    setIsAuthenticated(isAuthenticated) {
      state.isAuthenticated.set(isAuthenticated);
    },
  };
}

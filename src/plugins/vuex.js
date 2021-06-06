import { createStore } from "vuex";
import user from "./modules/user";
import test from "./modules/test";
import logger from "./modules/logger";
import { createLogger } from "vuex";

// Create a new store instance.
const store = createStore({
  plugins: [createLogger(logger)],

  namespaced: true,
  state() {
    return {
      loader: false,
      msg: { text: "", color: "", active: false },
    };
  },
  mutations: {
    SET_LOADER(state, payload) {
      state.loading = payload;
    },
    SET_MSG(state, payload) {
      state.msg = payload;
      setTimeout(function () {
        state.msg.active = false;
      }, 5000);
    },
  },
  modules: {
    user,
    test,
  },
});

export default store;

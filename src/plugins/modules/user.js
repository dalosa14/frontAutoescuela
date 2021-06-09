import { createStore } from "vuex";
import { userApi } from "../../api";
import router from "../router";

const state = {
  token: localStorage.getItem("token") || "",
  status: false,
  user: { email: "", name: "" },
};
const getters = {
  isAuthenticated: (state) => !!state.token,
  msg: (state) => state.msg,
  authStatus: (state) => state.status,
};

const mutations = {
  SET_TOKEN(state, payload) {
    state.token = payload;
    payload
      ? localStorage.setItem("token", payload)
      : localStorage.removeItem("token");
  },

  SET_USER(state, payload) {
    state.user = payload;
  },
};

const actions = {
  logout({ commit }) {
    return new Promise(async (resolve, reject) => {
      try {
        commit("SET_LOADER", true, { root: true });

        commit("SET_TOKEN", "");
        commit("SET_USER", {});

        commit(
          "SET_MSG",
          {
            text: "Desconexión satisfactoria",
            color: "success",
            active: true,
          },
          { root: true }
        );
        commit("SET_LOADER", false, { root: true });
        resolve({
          text: "Desconexión satisfactoria",
          color: "success",
          active: true,
        });
        router.push({ name: "login" });
      } catch (error) {
        reject(error);
      }
    });
  },
  async register({ commit, dispatch }, userCredentials) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });
      var request;
      try {
        // REGISTER
        request = await userApi.register(userCredentials);
        // SUCCESS
        if (request.data.success != true) {
          return commit(
            "SET_MSG",
            {
              text: request.data.msg,
              color: "error",
              active: true,
            },
            { root: true }
          );
        }
        await dispatch("login", userCredentials);

        commit("SET_LOADER", false, { root: true });
      } catch (error) {
        commit(
          "SET_MSG",
          {
            text: error.response.data.msg,
            color: "error",
            active: true,
          },
          { root: true }
        );
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async login({ commit }, userCredentials) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        // REGISTER
        var request = await userApi.login(userCredentials);

        // SUCCESS
        commit(
          "SET_MSG",
          {
            text: request.data.msg,
            color: "success",
            active: true,
          },
          { root: true }
        );

        commit("SET_TOKEN", request.data.data.token);
        commit("SET_USER", {
          name: request.data.data.name,
          email: request.data.data.email,
        });
        router.push({ name: "testsPacks" });

        resolve({ status: true, request });
      } catch (error) {
        commit(
          "SET_MSG",
          {
            text: error.response.data.msg,
            color: "error",
            active: true,
          },
          { root: true }
        );
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });
    });
  },
  async isAuthenticated({ commit ,dispatch}) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        // REGISTER

        var request = await userApi.isAuthenticated();
console.log(request);
        // SUCCESS
       

        if (request.data.success) {
          commit("SET_LOADER", false, { root: true });

             return resolve({ success: true, request });
        }
        dispatch('logout')
        commit("SET_LOADER", false, { root: true });

         reject({ success: false, request });
         

      } catch (error) {
        commit("SET_LOADER", false, { root: true });

        reject({ success: false, error });
      }

      commit("SET_LOADER", false, { root: true });
    });
  },
};
const modules = {};

const user = {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  modules,
};

export default user;

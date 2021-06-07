import { createStore } from "vuex";
import { testPackage } from "../../api";
import router from "../router";

const state = {
  buyedTestPackages:[{"id":1,"name":'asd',"title":'ey',"img":'asd',"desc":'asd',"price":'asd',"createdAt":"2021-06-04T10:06:00.000Z","updatedAt":"2021-06-04T10:06:00.000Z","ownerId":1,"owner":{"id":1,"username":"123","email":"123"}},{"id":2,"name":"prueba1","title":"prueba1","img":"https://elements-assets.envato.com/apps/storefront/audioCover01-8c537039e711097cca2b.svg","desc":"hola muy buenas","price":"54","createdAt":"2021-06-04T10:06:25.000Z","updatedAt":"2021-06-04T10:06:25.000Z","ownerId":1,"owner":{"id":1,"username":"123","email":"123"}}],
  allTestPackages:[],
  tests:[],
  selectedTest:{type:'',testQuestions:[]}
};
const getters = {
  getBuyedTestPackages: (state) => state.buyedTestPackages,
  getAllTestPackages: (state) => state.allTestPackages,
  getAllTestOfPackage: (state) => state.tests,
  
};

const mutations = {
  
  SET_ALL_PACKAGES(state, payload) {
    state.allTestPackages = payload;

  },
  SET_BUYED_PACKAGES(state, payload) {
    state.buyedTestPackages = payload;

  },
  SET_TESTS_OF_PACKAGE(state, payload) {
    state.tests = payload;

  },
  SET_TESTS_SELECTED_TEST(state, payload) {
    state.tests = payload;

  },
  
  
};

const actions = {

  // async getAllTestPackages({ commit }, userCredentials) {
  async getAllTestPackages({ commit }) {
    return new Promise(async(resolve, reject) => {
         commit("SET_LOADER", true, { root: true });

    try {
      var request = await testPackage.getAllTestPackages();
      commit("SET_ALL_PACKAGES", request.data.data)
      // SUCCESS
      

     
    } catch (error) {
      
      reject(error.response.data.msg)
    }

    commit("SET_LOADER", false, { root: true });


    resolve ({ status: true, request });
    })

   
  },
  async getBuyedTestPackages({ commit }) {
    return new Promise(async(resolve, reject) => {
         commit("SET_LOADER", true, { root: true });

    try {
      var request = await testPackage.getBuyedTestPackages();
      commit("SET_BUYED_PACKAGES", request.data.data)
      // SUCCESS
      

     
    } catch (error) {
      
      reject(error.response.data.msg)
    }

    commit("SET_LOADER", false, { root: true });


    resolve ({ status: true, request });
    })

   
  },
  async addTestPackageToUser({ commit,dispatch },testPackageId) {
    return new Promise(async(resolve, reject) => {
         commit("SET_LOADER", true, { root: true });

    try {
      var request = await testPackage.addTestPackageToUser(testPackageId);
      await dispatch("getBuyedTestPackages")
      // SUCCESS
      

     
    } catch (error) {
      
      reject(error.response.data.msg)
    }

    commit("SET_LOADER", false, { root: true });


    resolve ({ status: true, request });
    })

   
  },
  async getAllTestsOfPackage({ commit },testPackageId) {
    return new Promise(async(resolve, reject) => {
         commit("SET_LOADER", true, { root: true });

    try {
      var request = await testPackage.getAllTestsOfPackage(testPackageId);
      // SUCCESS
      commit("SET_TESTS_OF_PACKAGE", request.data.data)

     
    } catch (error) {
      
      reject(error.response.data.msg)
    }

    commit("SET_LOADER", false, { root: true });


    resolve ({ status: true, request });
    })

   
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

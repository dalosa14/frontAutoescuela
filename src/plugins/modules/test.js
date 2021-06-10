import { createStore } from "vuex";
import { testPackage } from "../../api";
import router from "../router";

const state = {
  buyedTestPackages: [],
  allTestPackages: [],
  tests: [],
  selectedTest: { selectedTestIndex: 0, type: "", testQuestions: [] },
  OwnedTestPackages:[]
};
const getters = {
  getBuyedTestPackages: (state) => state.buyedTestPackages,
  getAllTestPackages: (state) => state.allTestPackages,
  getAllTestOfPackage: (state) => state.tests,
  getOwnedTestPackages: (state) => state.OwnedTestPackages,
  getSelectedTest: (state) => state.selectedTest,
  getQuestionAndAnswersOfTest: (state) =>state.selectedTest.testQuestions[state.selectedTest.selectedTestIndex],
  getTestMark: (state) =>{
    return state.selectedTest.testQuestions.reduce((acc,question)=>{
      if (!question.answer.isTrue) {
        acc++
      }
      return acc
    },0)
  },
  getAllQuestionsType: (state) => state.selectedTest.type,
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
  SET_OWNED_TESTPACKAGES(state, payload) {
    state.OwnedTestPackages = payload;
  },
  SET_QUESTIONS_OF_TEST(state, payload) {
    state.selectedTest.testQuestions = payload.map((obj) => ({
      ...obj,
      answer: {answered:false,selectedAnswer:'',isTrue:false},
    }));
  },
  SET_PREV_SELECTED_QUESTION(state) {
    if (state.selectedTest.selectedTestIndex > 0) {
      state.selectedTest.selectedTestIndex--;
    }
  },
  SET_NEXT_SELECTED_QUESTION(state) {
    if (state.selectedTest.testQuestions.length - 1 > state.selectedTest.selectedTestIndex) {
      state.selectedTest.selectedTestIndex++;
    }
  },
  RESET_SELECTED_TEST(state) {
    state.selectedTest =  { selectedTestIndex: 0, type: "", testQuestions: [] }
  },
  SET_SELECTED_ANSWER_ON_QUESTION(state,{answerId,isTrue}) {
    if ( !state.selectedTest.testQuestions[state.selectedTest.selectedTestIndex].answer.answered) {
      state.selectedTest.testQuestions[state.selectedTest.selectedTestIndex].answer.answered = true;
      state.selectedTest.testQuestions[state.selectedTest.selectedTestIndex].answer.selectedAnswer = answerId;
      state.selectedTest.testQuestions[state.selectedTest.selectedTestIndex].answer.isTrue = isTrue;

    }
  },
};

const actions = {
  // async getAllTestPackages({ commit }, userCredentials) {
  async getAllTestPackages({ commit }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        var request = await testPackage.getAllTestPackages();
        commit("SET_ALL_PACKAGES", request.data.data);
        // SUCCESS
      } catch (error) {
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async getBuyedTestPackages({ commit }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        var request = await testPackage.getBuyedTestPackages();
        commit("SET_BUYED_PACKAGES", request.data.data);
        // SUCCESS
      } catch (error) {
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async addTestPackageToUser({ commit, dispatch }, testPackageId) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        var request = await testPackage.addTestPackageToUser(testPackageId);
        await dispatch("getBuyedTestPackages");
        // SUCCESS
      } catch (error) {
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async getAllTestsOfPackage({ commit }, testPackageId) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        var request = await testPackage.getAllTestsOfPackage(testPackageId);
        // SUCCESS
        commit("SET_TESTS_OF_PACKAGE", request.data.data);
      } catch (error) {
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async getAllQuestionsAndAnswersOfTest({ commit }, testId) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        var request = await testPackage.getAllQuestionsAndAnswersOfTest(testId);
        // SUCCESS
        commit("SET_QUESTIONS_OF_TEST", request.data.data);
      } catch (error) {
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async getOwnedTestPackages({ commit }) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });

      try {
        var request = await testPackage.getOwnedTestPackages();
        // SUCCESS
        commit("SET_OWNED_TESTPACKAGES", request.data.data);
      } catch (error) {
        reject(error.response.data.msg);
      }

      commit("SET_LOADER", false, { root: true });

      resolve({ status: true, request });
    });
  },
  async createTestPackage({ commit },payload) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });
      if (payload.price == null || payload.price == '') {
         commit(
          "SET_MSG",
          {
            text: 'El precio debe ser 0 o un numero positivo ',
            color: "error",
            active: true,
          },
          { root: true }
        );
        commit("SET_LOADER", false, { root: true });
        return reject('El precio debe ser 0 o un numero positivo');

      }
      try {
        var request = await testPackage.createTestPackage(payload);
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

      resolve({ success: true, data :request.data.data });
    });
  },
  async createTest({ commit },payload) {
    return new Promise(async (resolve, reject) => {
      commit("SET_LOADER", true, { root: true });
     
      try {
        var request = await testPackage.createTest(payload);
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

      resolve({ success: true, data :request.data.data });
    });
  },
  async createQuestionAndAnswers({ commit },payload) {
    return new Promise(async (resolve, reject) => {
      let {questionData,
        answerData,} = payload
      commit("SET_LOADER", true, { root: true });
     
      try {
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
        let AnswerCounter = answerData.reduce((acc,answer)=>{
          if(answer.answer != '') acc ++
          return acc
        },0)
        if (AnswerCounter == 0) {
           commit(
            "SET_MSG",
            {
              text: 'al menos tiene que haber alguna respuesta',
              color: "error",
              active: true,
            },
            { root: true }
          );
          commit("SET_LOADER", false, { root: true });

          return reject({ success: false, data :null,msg:'al menos tiene que haber alguna respuesta' });

        }

        let AnswerTrueCounter = answerData.reduce((acc,answer)=>{
          if(answer.isTrue == true && answer.answer != '') acc ++
          return acc
        },0)
        if (AnswerTrueCounter == 0) {
          commit(
           "SET_MSG",
           {
             text: 'al menos tiene que haber alguna respuesta correcta y valida',
             color: "error",
             active: true,
           },
           { root: true }
         );
         commit("SET_LOADER", false, { root: true });

         return reject({ success: false, data :null,msg:'al menos tiene que haber alguna respuesta correcta y valida' });

       }
       var request = await testPackage.createQuestion(questionData);

        answerData.forEach(async answer => {
          answer.questionId = request.data.data.id
          if (answer.answer != '') {
            await testPackage.createAnswer(answer);
          }
           

        });

        commit("SET_LOADER", false, { root: true });

         commit(
          "SET_MSG",
          {
            text: request.data.msg,
            color: "success",
            active: true,
          },
          { root: true }
        );
        return resolve({ success: true, data :request.data.msg });
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

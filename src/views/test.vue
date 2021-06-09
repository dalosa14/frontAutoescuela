<template lang="pug">
navBar
div(v-if="viewTest")
  div(class="grid grid-rows-4 grid-cols-3 gap-4 p-8 relative" v-if="questionAndAnswers" )
    div(class="row-span-1  col-span-3 flex justify-center  items-center bg-gray-400 p-8") 
        h1 {{questionAndAnswers.name}} {{SelectedTest.selectedTestIndex+1}}/{{SelectedTest.testQuestions.length}}
    div(class="row-span-3  col-span-1 flex justify-center items-center w-full ") 
        img(class="ring" :src="questionAndAnswers.img ? questionAndAnswers.img :  'https://images1.autocasion.com/unsafe/1200x800/actualidad/wp-content/uploads/2020/07/Seat-Leon-2020-1600-02.jpg'") 
    div(class="col-span-2 row-span-1 flex justify-center  items-center") 
        h1(class="text-center") {{questionAndAnswers.question}}
    div(class="row-span-2 col-span-2 text-center") 
      answerButton( :answer="answer" :index="index" :answered="questionAndAnswers.answer.answered" v-for="(answer,index) in questionAndAnswers.answers")
  div(class="grid grid-rows-1 grid-cols-2  p-8 ")
    div(class="row-span-2  col-span-2 flex justify-between  items-center  p-8") 
      button(@click.prevent="prevQuestion()" class="bg-blue-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-blue-100 rounded-full hover:shadow-lg hover:bg-blue-700") Anterior
      button(@click.prevent="isTheLastQuestion ? finalScreen() :nextQuestion()" class="bg-green-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-green-100 rounded-full hover:shadow-lg hover:bg-green-700") {{isTheLastQuestion ? 'Finalizar' : 'Siguiente'}}
div(v-if="!viewTest")
  div(class=" flex justify-center  items-center ") 
    img( class="object-contain " :src="imgLight", alt="alt")
  div(class="flex flex-col justify-center  items-center")
      h1(class="my-2") {{testMark}}/{{SelectedTest.testQuestions.length}} Errores
      button(@click.prevent="resetAllAndGoHome()" class="bg-blue-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-blue-100 rounded-full hover:shadow-lg hover:bg-green-700") Ver más tests

</template>
<script>
import navBar from "../components/navbar.vue";
import answerButton from "../components/answerButton.vue";

import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import router from "../plugins/router";

export default {
  components: {
    answerButton,
    navBar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    
    store.dispatch("test/getAllQuestionsAndAnswersOfTest", route.params.id);
    let SelectedTest = computed(() => {
      return store.getters["test/getSelectedTest"];
    });
    let viewTest = ref(true)
    let questionAndAnswers = computed(() => {
          return store.getters["test/getQuestionAndAnswersOfTest"];
    });
    let testMark = computed(() => {
          return store.getters["test/getTestMark"];
    });
    let imgLight = computed(() => {
          if (testMark.value == 0) return 'https://i.ibb.co/SmD9b2p/green.png'
          if (testMark.value == 1) return 'https://i.ibb.co/QCQBT4Q/yellow.png'
          if (testMark.value >3) return 'https://i.ibb.co/cbsB45M/red.png'
    });

    // console.log(SelectedTest.value.testQuestions.length);

    let isTheLastQuestion = computed(() => {
      if (SelectedTest.value.testQuestions.length - 1 == SelectedTest.value.selectedTestIndex)
        return true;
      return false;
    });

    const prevQuestion = () => {
            store.commit("test/SET_PREV_SELECTED_QUESTION")

    };
    const nextQuestion = () => {
            store.commit("test/SET_NEXT_SELECTED_QUESTION")

    };
    function resetAllAndGoHome(){
      router.back()
        store.commit("test/RESET_SELECTED_TEST")
        
    }
    function finalScreen(){
      viewTest.value = false 
    }
    return {
      imgLight,
      resetAllAndGoHome,
      viewTest,
      testMark,
      finalScreen,
      questionAndAnswers,
      nextQuestion,
      prevQuestion,
      SelectedTest,
      isTheLastQuestion,
    };
  },
};
</script>

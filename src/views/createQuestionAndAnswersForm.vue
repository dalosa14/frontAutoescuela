<template lang="pug">
div(class="h-full  flex items-center justify-center py-10" ) 
    div(class="font-sans")
        div(class="relative min-h-screen w-72 flex flex-col sm:justify-center  items-center ")
            div(class="relative sm:max-w-sm w-full h-full")
                
                div(class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md")
                    form(method="#" action="#" class="mt-10")
                        div(class="flex justify-center")
                                img(src="https://i.ibb.co/XYNXWqy/logoautoescuela.png"  class="h-20" alt="alt")
                        div(class="flex justify-center")
                                h1 Crear pregunta 
                        div(class="mt-7")   
                            input(v-model="questionData.name" type="text" placeholder="Nombre de la pregunta" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="questionData.question" type="text" placeholder="Pregunta" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="questionData.img" type="text" placeholder="Url de imagen (opcional)" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="flex flex-wrap -mx-1 ")
                            div(class="mt-7 my-1 px-1 w-1/6 inline-flex items-center has-tooltip") 
                                span(class='tooltip bg-green-500 p-3 -mt-20 lg:-mt-20 rounded') marcar como verdadera
                                input(type="checkbox" class="form-checkbox text-green-500" :disabled="!answerData[0].answer"   v-model="answerData[0].isTrue") 
                            div(class="mt-7 my-1 px-1 w-5/6 ")              
                                input(v-model="answerData[0].answer" type="text" placeholder="respuesta 1" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                            div(class="mt-7 my-1 px-1 w-1/6 inline-flex items-center has-tooltip") 
                                span(class='tooltip bg-green-500 p-3 -mt-20 lg:-mt-20 rounded') marcar como verdadera
                                input(type="checkbox" class="form-checkbox text-green-500" :disabled="!answerData[1].answer"  v-model="answerData[1].isTrue" )
                            div(class="mt-7 my-1 px-1 w-5/6 ")              
                                input(v-model="answerData[1].answer" type="text" placeholder="respuesta 2" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                            div(class="mt-7 my-1 px-1 w-1/6 inline-flex items-center has-tooltip") 
                                span(class='tooltip bg-green-500 p-3 -mt-20 lg:-mt-20 rounded') marcar como verdadera
                                input(type="checkbox" class="form-checkbox text-green-500" :disabled="!answerData[2].answer"  v-model="answerData[2].isTrue")
                            div(class="mt-7 my-1 px-1 w-5/6 ")              
                                input(v-model="answerData[2].answer" type="text" placeholder="respuesta 3" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                            div(class="mt-7 my-1 px-1 w-1/6 inline-flex items-center has-tooltip") 
                                span(class='tooltip bg-green-500 p-3 -mt-20 lg:-mt-20 rounded') marcar como verdadera
                                input(type="checkbox" class="form-checkbox text-green-500" :disabled="!answerData[3].answer"  v-model="answerData[3].isTrue")
                            div(class="mt-7 my-1 px-1 w-5/6 ")              
                                input(v-model="answerData[3].answer" type="text" placeholder="respuesta 4" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                           
                        div(class="mt-7")
                            button(@click.prevent="createQuestionAndAnswers()" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105") Crear pregunta
                        div(class="mt-7")
                            button(@click.prevent="endTest()" class="bg-red-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105") Terminar preguntas

                      
                        div(class="mt-7")
                            div(class="flex justify-center items-center")
                                alert
                                
                                        
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import alert from "../components/alert.vue";
import router from "../plugins/router";
import { useRoute } from "vue-router";

export default {
  components: { alert },
  setup() {
    const route = useRoute();

    let questionData = reactive({
      img:'',
      name: "",
      question: "",
      testId: route.params.testId,
    });
    let answerData = reactive([
      { answer: "", isTrue: false },
      { answer: "", isTrue: false },
      { answer: "", isTrue: false },
      { answer: "", isTrue: false },
    ]);
    const store = useStore();
    // let user = computed(() => store.state.account.user);
    const endTest = ()=>{
        questionData.name = "";
        questionData.img = "";
        questionData.question = "";
        answerData[0] = {answer: "", isTrue: false}
        answerData[1] = {answer: "", isTrue: false}
        answerData[2] = {answer: "", isTrue: false}
        answerData[3] = {answer: "", isTrue: false}
        router.push({ name: "testsPacks" });
       
    }
    let createQuestionAndAnswers = async () => {
      let question = await store.dispatch("test/createQuestionAndAnswers", {
        questionData,
        answerData,
      });
      if (question.success) {
        questionData.name = "";
        questionData.img = "";
        questionData.question = "";
        answerData[0] = {answer: "", isTrue: false}
        answerData[1] = {answer: "", isTrue: false}
        answerData[2] = {answer: "", isTrue: false}
        answerData[3] = {answer: "", isTrue: false}

       
      }
    };

    return {
      answerData,
      questionData,
      endTest,
      createQuestionAndAnswers,
    };
  },
};
</script>

<style>
.tooltip {
  visibility: hidden;
  position: absolute;
}
.has-tooltip:hover .tooltip {
  visibility: visible;
  z-index: 100;
}
</style>

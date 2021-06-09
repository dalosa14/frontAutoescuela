<template lang="pug">
div(class="h-screen overflow-hidden flex items-center justify-center" style="background: #edf2f7;") 
    div(class="font-sans")
        div(class="relative min-h-screen w-72 flex flex-col sm:justify-center  items-center ")
            div(class="relative sm:max-w-sm w-full h-full")
                
                div(class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md")
                    form(method="#" action="#" class="mt-10")
                        div 
                            div(class="flex justify-center")
                                img(src="https://i.ibb.co/XYNXWqy/logoautoescuela.png"  class="h-20" alt="alt")
                            div(class="flex justify-center")
                                h1 Crear test 
                            input(v-model="testData.name" type="text" placeholder="Nombre visible" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="testData.img" type="text" placeholder="Url de imagen (opcional)" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                      
                        div(class="mt-7")
                            button(@click.prevent="createTest()" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105") Crear test

                      
                        div(class="mt-7")
                            div(class="flex justify-center items-center")
                                alert
                                
                                        
</template>

<script>
import {  reactive } from 'vue'
import { useStore } from 'vuex'
import alert from '../components/alert.vue'
import router from "../plugins/router";
import { useRoute } from "vue-router";

export default {
    components:{  alert},
setup(){
        const route = useRoute();

    let testData = reactive({name:'', img:'',testpackageId:route.params.testpackId})
    const store = useStore()
    // let user = computed(() => store.state.account.user);


    let createTest = async ()=> {
       let test = await store.dispatch("test/createTest",testData)
       if (test.success) {
           testData.name = ''
        
           testData.img = ''
           
           router.push({ name: "createQuestion" ,params:{testId:test.data.id} });
                 

       }
    }

    return {
        
        
        testData,
        createTest

    }
}
}
</script>

<style>

</style>
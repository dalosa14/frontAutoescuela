<template lang="pug">
div(class="h-screen overflow-hidden flex items-center justify-center" ) 
    div(class="font-sans")
        div(class="relative min-h-screen w-72 flex flex-col sm:justify-center  items-center ")
            div(class="relative sm:max-w-sm w-full h-full ")
                
                div(class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md my-5")
                    form(method="#" action="#" class="mt-10")
                    div
                        div(class="flex justify-center")
                            img(src="https://i.ibb.co/XYNXWqy/logoautoescuela.png"  class="h-20" alt="alt")
                        div(class="mt-7 flex justify-center") 
                            h1(class="") Crear pack de tests                                    
                        div(class="mt-7") 
                            input(v-model="testPackage.name" type="text" placeholder="Nombre" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")  
                            input(v-model="testPackage.title" type="text" placeholder="Titulo visible" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="testPackage.img" type="text" placeholder="Url de imagen (opcional)" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="testPackage.desc" type="text" placeholder="Descripción" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="testPackage.price" type="number" placeholder="Precio" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")

                        div(class="mt-7")
                            button(@click.prevent="createTestPackage()" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105") Crear pack de tests

                      
                        div(class="mt-7")
                            div(class="flex justify-center items-center")
                                alert
                                
                                        
</template>

<script>
import {  reactive } from 'vue'
import { useStore } from 'vuex'
import alert from './alert.vue'
import router from "../plugins/router";

export default {
    components:{  alert},
setup(){
    let testPackage = reactive({name:'',title:'',img:'',desc:'',price:null})
    const store = useStore()
    // let user = computed(() => store.state.account.user);


    let createTestPackage = async ()=> {
       let testPack = await store.dispatch("test/createTestPackage",testPackage)
       console.log(testPack);
       if (testPack.success) {
           testPackage.name = ''
           testPackage.title = ''
           testPackage.img = ''
           testPackage.desc = ''
           testPackage.price = null
            router.push({ name: "createTest" ,params:{testpackId:testPack.data.id} });
                 

       }
    }

    return {
        
        
        testPackage,
        createTestPackage

    }
}
}
</script>

<style>

</style>
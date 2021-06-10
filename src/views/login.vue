<template lang="pug">
div(class="h-screen overflow-hidden flex items-center justify-center align-middle" ) 
    div(class="font-sans")
        div(class="relative min-h-screen w-72 flex flex-col sm:justify-center content-center items-center ")
            div(class="relative sm:max-w-sm w-full h-full")
                    div(class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6")
                    div(class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6")
                    div(class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md")
                        label(class="block mt-3 text-sm text-gray-700 text-center font-semibold") Login
                        Form(@submit.prevent="login" class="mt-10")
                            div 
                                input(v-model="userData.email" type="email" name="email" :rules="validateEmail" placeholder="Correo electronico" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                            div(class="mt-7")              
                                input(v-model="userData.password" type="password" placeholder="Contraseña" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        

                            div(class="mt-7 flex")
                                div(class="w-full text-center")  
                                    a(class="underline text-sm text-gray-600 hover:text-gray-900" href="#") ¿Olvidó su contraseña?
                            div(class="mt-7")
                                button(@click="submit" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105") Entrar

                            div(class="mt-7")
                                div(class="flex justify-center items-center")
                                    label(class="mr-2" ) ¿Eres nuevo?
                                        a( @click.prevent="goToRegister()" class=" cursor-pointer text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 ml-2")  Crea una cuenta 
                            div(class="mt-7")
                                div(class="flex justify-center items-center")
                                    alert
                                

</template>

<script>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'
import alert from '../components/alert.vue'

import router from "../plugins/router";


export default {
    components:{
        
    alert
},
setup(){

    let userData = reactive({email:'',password:'',username:'',rePassword:''})
    const store = useStore()
let login = async ()=> {
       let prueba = await store.dispatch("user/login",userData)
    }
const goToRegister = () => {
      router.push({ name: "register" });
    };
    

    return {
        userData,
        goToRegister,
        login

    }
}
}
</script>

<style>

</style>
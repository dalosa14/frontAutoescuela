<template lang="pug">
div(class="h-screen overflow-hidden flex items-center justify-center" ) 
    div(class="font-sans")
        div(class="relative min-h-screen w-72 flex flex-col sm:justify-center  items-center bg-gray-100")
            div(class="relative sm:max-w-sm w-full h-full")
                div(class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6")
                div(class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6")
                div(class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md")
                    label(class="block mt-3 text-sm text-gray-700 text-center font-semibold") Register
                    form(method="#" action="#" class="mt-10")
                        div 
                            input(v-model="userData.username" type="text" placeholder="Usuario" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")  
                            input(v-model="userData.email" type="email" placeholder="Correo electronico" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="userData.password" type="password" placeholder="Contraseña" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")
                        div(class="mt-7")              
                            input(v-model="userData.rePassword" type="password" placeholder="Confirma contraseña" class="pl-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0")

                        div(class="mt-7")
                            button(@click.prevent="register()" class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105") Registarse

                        div(class="mt-7")
                            div(class="flex justify-center items-center")
                                label(class="mr-2") ¿Ya tienes cuenta?
                                        a( @click.prevent="goToLogin()" class=" cursor-pointer text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105 ml-2")  Entrar 
                        div(class="mt-7")
                            div(class="flex justify-center items-center")
                                alert
                                
                                        
</template>

<script>
import {  reactive } from 'vue'
import { useStore } from 'vuex'
import alert from '../components/alert.vue'
import router from "../plugins/router";

export default {
    components:{  alert},
setup(){
    let userData = reactive({email:'',password:'',username:'',rePassword:''})
    const store = useStore()
    // let user = computed(() => store.state.account.user);

const goToLogin = () => {
      router.push({ name: "login" });
    };
    let register = async ()=> {
       let prueba = await store.dispatch("user/register",userData)
       console.log(prueba)
    }

    return {
        userData,
        register,
        goToLogin

    }
}
}
</script>

<style>

</style>
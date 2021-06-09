<template lang="pug">
nav(class="flex items-center justify-between flex-wrap bg-green-500 p-6")
    div(class="flex items-center flex-shrink-0 text-white mr-6")
        span(class="font-semibold text-xl tracking-tight") AutoTest
    div(class="block lg:hidden")
        button(class="flex items-center px-3 py-2 border rounded text-green-100 border-green-400 hover:text-white hover:border-white" id="navbar-btn")
    div(class="w-full block flex-grow lg:flex lg:items-center lg:w-auto " id="navbar")
        div(class="text-sm lg:flex-grow  text-center lg:text-right")
          a( @click.prevent="goToCreateTestpack" href="#" class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-4 text-lg" ) Crear tests
          a( @click.prevent="goToTests" href="#" class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-4 text-lg" ) Tests
          a(href="#" @click.prevent="goToBuy"  class="block mt-4 lg:inline-block lg:mt-0 text-green-100 hover:text-white mr-4 text-lg") Comprar tests
          a(href="#"  @click.prevent="logout" class="inline-block mr-4 text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-green-500 hover:bg-white mt-4 lg:mt-0 ml-3") Desconectarse
</template>
<script>
import { useStore } from 'vuex'
import router from "../plugins/router";

export default {
  setup(){
        const store = useStore()
const goToTests = () => {
      router.push({ name: "testsPacks" });
    };
const goToBuy = () => {
      router.push({ name: "buy" });
    };
const goToCreateTestpack = () => {
      router.push({ name: "createTestpack" });
    };
    let logout = async ()=> {
        await store.dispatch("user/logout")
    }
    return { logout,goToTests,goToBuy,goToCreateTestpack}
  }
  
}
</script>

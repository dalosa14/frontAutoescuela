<template lang="pug">
navBar
div(class="grid grid-rows-4 grid-cols-3 gap-4 p-8 relative")
    div(class="row-span-1  col-span-3 flex justify-center  items-center bg-gray-400 p-8") 
        h1 test title 1/30
    div(class="row-span-3  col-span-1 flex justify-center items-center w-full ") 
       img(class="ring" src="https://images1.autocasion.com/unsafe/1200x800/actualidad/wp-content/uploads/2020/07/Seat-Leon-2020-1600-02.jpg") 
    div(class="col-span-2 row-span-1 flex justify-center  items-center") 
        h1(class="text-center") asdasd
    div(class="row-span-2 col-span-2 text-center") asd3
</template>
<script>
import navBar from "../components/navbar.vue";
import card from "../components/card.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router'

export default {
  components: {
    card,
    navBar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
        store.dispatch("test/getAllTestsOfPackage",route.params.id);

     let tests = computed(() => {
      return  store.getters["test/getAllTestOfPackage"];
    });
    
    return {tests}
  },
};
</script>

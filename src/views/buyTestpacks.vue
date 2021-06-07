<template lang="pug">
div(class="h-screen")
  navBar(class="lg:h-1/6 h-2/6")
  div(class="lg:h-5/6 h-4/6")
    carrousel( :elements="elements" v-if="elements[0]" type="buy" title="COMPRAR PACKS DE TESTS")
    
</template>
<script>
import navBar from "../components/navbar.vue";
import carrousel from "../components/carrousel.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export default {
  components: {
    carrousel,
    navBar,
  },
  setup() {
    const store = useStore();
        store.dispatch("test/getAllTestPackages");

    

     let elements = computed(() => {
      return  store.getters["test/getAllTestPackages"];
    });
    
    return {elements}
  },
};
</script>

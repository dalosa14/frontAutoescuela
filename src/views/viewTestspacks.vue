<template lang="pug">
div(class="h-screen")
  navBar(class="lg:h-1/6 h-2/6")
  div(class="lg:h-5/6 h-4/6")
    carrousel( :elements="elements" v-if="elements[0]" type="ver" title="MIS TESTS DISPONIBLES")
    h1(class="mx-auto p-6 h-full sm:p-10 lg:p-24 text-center bg-gray-200 text-5xl text-indigo-600" v-if="elements.length == 0") No tienes ningún paquete comprado

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
    store.dispatch("test/getBuyedTestPackages");

    let elements = computed(() => {
      return store.getters["test/getBuyedTestPackages"];
    });

    return { elements };
  },
};
</script>

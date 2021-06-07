<template lang="pug">
div(class="h-screen")
  navBar(class="lg:h-1/6 h-2/6")
  div(class="lg:h-5/6 h-4/6 bg-gray-200")
    div( class="p-8 space-y-4")
      card( @click.prevent="goToTest(test.id)" :test="test"  v-for="test in tests"  )

</template>
<script>
import navBar from "../components/navbar.vue";
import card from "../components/card.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router'
import router from "../plugins/router";

export default {
  components: {
    card,
    navBar,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
        store.dispatch("test/getAllTestsOfPackage",route.params.id);

const goToTest = (testId) => {
      router.push({ name: "test" ,params:{id:testId} });
    };
     let tests = computed(() => {
      return  store.getters["test/getAllTestOfPackage"];
    });
    
    return {tests,goToTest}
  },
};
</script>

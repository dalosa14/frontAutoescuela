<template lang="pug">
div(class="h-screen")
  navBar(class="lg:h-1/6 h-2/6")
  div(class="lg:h-5/6 h-4/6 " v-if="!form")
    div( class="p-8 space-y-4 flex justify-center") 
      button(@click.prevent="changeForm()" class="bg-blue-600 px-5 py-3 text-sm shadow-sm font-medium tracking-wider border text-blue-100 rounded-full hover:shadow-lg hover:bg-green-700") Crear nuevo Pack de tests
    div( class="p-8 space-y-4")
      card( @click.prevent="goToTest(testPackage.id)" :img="testPackage.img" :title="testPackage.name" :desc="testPackage.desc"   v-for="testPackage in testPackages"  )
  div(class="lg:h-5/6 h-4/6 " v-if="form")
      createTestpackForm 
</template>
<script>
import navBar from "../components/navbar.vue";
import card from "../components/card.vue";
import createTestpackForm from "../components/createTestpackForm.vue";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from 'vue-router'
import router from "../plugins/router";

export default {
  components: {
    card,
    navBar,
    createTestpackForm
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    let form = ref(false)
        store.dispatch("test/getOwnedTestPackages");

const goToTest = (testId) => {
      router.push({ name: "test" ,params:{id:testId} });
    };
     let testPackages = computed(() => {
      return  store.getters["test/getOwnedTestPackages"];
    });
    const changeForm = () => {
      form.value = !form.value
    };
    return {testPackages,goToTest,form,changeForm}
  },
};
</script>

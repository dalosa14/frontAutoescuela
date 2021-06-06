<template lang="pug">
router-view
loader
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import loader from "./components/loader.vue";

export default {
  components: {
    loader,
  },
  setup() {
    const store = useStore();

    onMounted(async() => {

      store.commit("user/SET_TOKEN", localStorage.getItem("token"));
     
    });
  },
};
</script>

<template>
  <div
    v-if="answer && !answered"
    @click.prevent="selectAnswer()"
    class="
      dark:bg-gray-800
      bg-opacity-95
      border-opacity-60
      |
      p-4
      border-solid
      rounded-3xl
      border-2
      |
      flex
      justify-around
      cursor-pointer
      |
      bg-gray-100
      border-yellow-600
      hover:bg-yellow-400
      hover:border-transparent
      |
      transition-colors
      duration-500
    "
  >
    <h1>{{ letters[index] }}</h1>
    <div class="flex flex-col justify-center">
      <p class="text-gray-900 dark:text-gray-300 font-semibold">
        {{ answer.answer }}
      </p>
    </div>
  </div>
  <div
    v-if="answer.isTrue && answered"
    @click.prevent="selectAnswer()"
    class="
      dark:bg-gray-800
      bg-opacity-95
      border-opacity-60
      |
      p-4
      border-solid
      rounded-3xl
      border-2
      |
      flex
      justify-around
      cursor-pointer
      |
      border-green-600
      hover:bg-green-400
      hover:border-transparent
      |
      transition-colors
      duration-500
    "
    :class="{ 'bg-green-500': selected }"
  >
    <h1>{{ letters[index] }}</h1>
    <div class="flex flex-col justify-center">
      <p class="text-gray-900 dark:text-gray-300 font-semibold">
        {{ answer.answer }}
      </p>
    </div>
  </div>
  <div
    v-if="!answer.isTrue && answered"
    @click.prevent="selectAnswer()"
    class="
      dark:bg-gray-800
      bg-opacity-95
      border-opacity-60
      |
      p-4
      border-solid
      rounded-3xl
      border-2
      |
      flex
      justify-around
      cursor-pointer
      |
      border-red-600
      hover:bg-red-400
      hover:border-transparent
      |
      transition-colors
      duration-500
    "
    :class="{ 'bg-red-500': selected }"
  >
    <h1>{{ letters[index] }}</h1>
    <div class="flex flex-col justify-center">
      <p class="text-gray-900 dark:text-gray-300 font-semibold">
        {{ answer.answer }}
      </p>
    </div>
  </div>
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";

export default {
  props: ["answer", "index", "answered"],
  setup(props) {
    const store = useStore();
    let selected = ref(false);

    let letters = ["A", "B", "C", "D", "F"];
    let answered = computed(() => props.answered);
    function selectAnswer() {
      if (!answered.value) {
        selected.value = true;
      }
      store.commit("test/SET_SELECTED_ANSWER_ON_QUESTION", {
        answerId: props.answer.id,
        isTrue: props.answer.isTrue,
      });
    }
    return {
      selected,
      answer: computed(() => props.answer),
      index: computed(() => props.index),
      letters,
      selectAnswer,
      answered,
    };
  },
};
</script>

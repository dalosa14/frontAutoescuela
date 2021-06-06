<template>
  <div v-if="msg.active"
    class="
      
      px-4
      py-3
      rounded
      relative
    "
    :class="msg.color == 'error' ? ['bg-red-100',
      'border', 'border-red-400',
      'text-red-700']: ['bg-green-100',
      'border', 'border-green-400',
      'text-green-700'] "
    role="alert"
  >
    <!-- <strong class="font-bold">Holy smokes!</strong> -->
    <span class="block sm:inline">{{msg.text}}</span>
    <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
     
    </span>
  </div>
</template>
<script>
import { useStore } from 'vuex'
import {  computed } from 'vue'

export default {

  setup(props) {
          const store = useStore()
        let msg = computed(()=> store.state.msg)
      return {
msg
      }
  },
};
</script>

<template>
    <div v-if="title" class="bg-gray-100 border-yellow-600 dark:bg-gray-800 bg-opacity-95 border-opacity-60 | p-4 border-solid rounded-3xl border-2 | flex justify-around cursor-pointer | hover:bg-yellow-400 dark:hover:bg-yellow-600 hover:border-transparent | transition-colors duration-500">
      <img class="w-16 h-16 object-cover" :src="img ? img : 'https://www.clipartmax.com/png/middle/431-4316592_video-play-icon-transparent-transparent-background-video-play-icon-png.png'" alt="" />
      <div class="flex flex-col justify-center">
        <p class="text-gray-900 dark:text-gray-300 font-semibold">{{title}}</p>
        <p class="text-black dark:text-gray-100 text-justify font-semibold">{{desc}}</p>
      </div>
    </div>
</template>

<script>
import { computed } from 'vue'

export default {
  props:['img','title','desc'],
setup(props){
  const img = computed(()=>props.img)
  const title = computed(()=>props.title)
  const desc = computed(()=>props.desc)
return {desc,title,img}
}
}
</script>

<style>

</style>
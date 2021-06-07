<template>
  <!-- component -->
  <!-- Display Container (not part of component) START -->
  <div class=" h-full mx-auto
      
      
      
      text-center
      bg-gray-200
      text-5xl text-indigo-600">
  <div
    class="
      
    "
  >
    <h1 class="sm:p-10
      lg:p-24">{{title}}</h1>
  </div>
  <div class="mx-auto h-3/6  px-24 bg-gray-200">
    <!-- Carousel Body -->
    <div
      class="
        relative
        rounded-lg
        block
        md:flex
        items-center
        bg-gray-100
        shadow-xl
      "
      style="min-height: 19rem"
    >
      <div
        class="
          relative
          w-full
          md:w-2/5
          h-full
          overflow-hidden
          rounded-t-lg
          md:rounded-t-none md:rounded-l-lg
        "
        style="min-height: 19rem"
      >
        <img
          class="absolute inset-0 w-full h-full object-cover object-center"
          :src="false || './images/default.svg'"
          alt=""
        />
        <div
          class="absolute inset-0 w-full h-full bg-indigo-900 opacity-75"
        ></div>
        <div
          class="
            absolute
            inset-0
            w-full
            h-full
            flex
            items-center
            justify-center
            fill-current
            text-white
          "
        >
          <p>{{ selectedElement.title }} </p>
        </div>
      </div>
      <div
        class="w-full md:w-3/5 h-full flex items-center bg-gray-100 rounded-lg"
      >
        <div class="p-12 md:pr-24 md:pl-16 md:py-12">
          <p class="text-gray-600">{{selectedElement.desc  }}</p>
          <a
            class="
              flex
              items-baseline
              mt-3
              text-indigo-600
              hover:text-indigo-900
              focus:text-indigo-900
            "
            href=""
          >
            <span @click.prevent="type == 'buy' ? addTestPackageToUser(selectedElement.id) : goToTestPack(selectedElement.id)">{{type == 'buy' ? 'Comprar Pack de tests': 'Entrar ahora.'}}</span>
            <span class="text-xs ml-1">&#x279c;</span>
          </a>
        </div>
        <svg
          class="
            hidden
            md:block
            absolute
            inset-y-0
            h-full
            w-24
            fill-current
            text-gray-100
            -ml-12
          "
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <polygon points="50,0 100,0 50,100 0,100" />
        </svg>
      </div>
      <button
        @click.prevent="prevTestPackage()"
        class="
          absolute
          top-0
          mt-32
          left-0
          bg-white
          rounded-full
          shadow-md
          h-12
          w-12
          text-2xl text-indigo-600
          hover:text-indigo-400
          focus:text-indigo-400
          -ml-6
          focus:outline-none
          focus:shadow-outline
        "
      >
        <span class="block" style="transform: scale(-1)">&#x279c;</span>
      </button>
      <button
        @click.prevent="nextTestPackage()"
        class="
          absolute
          top-0
          mt-32
          right-0
          bg-white
          rounded-full
          shadow-md
          h-12
          w-12
          text-2xl text-indigo-600
          hover:text-indigo-400
          focus:text-indigo-400
          -mr-6
          focus:outline-none
          focus:shadow-outline
        "
      >
        <span class="block" style="transform: scale(1)">&#x279c;</span>
      </button>
    </div>

    <!-- Carousel Tabs -->
  </div>
  </div>
  <!-- Display Container (not part of component) END -->
</template>
<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import router from "../plugins/router";


export default {
   props: ['elements','type','title'],
  setup(props) {
    
    const store = useStore();

    let elements = computed(()=> props.elements)
    // let type = computed(()=> props.elements)

    let selectedElementCounter = ref(0);

    let selectedElement = computed(() => {
      return elements.value[selectedElementCounter.value];
    });

async function addTestPackageToUser(packageId){
 await store.dispatch("test/addTestPackageToUser",packageId);
}
function goToTestPack(packageId){
      router.push({ name: "testsPack" ,params:{id:packageId}});

}
    const prevTestPackage = () => {
      if (selectedElementCounter.value > 0) {
        selectedElementCounter.value--;
      }
    };
    const nextTestPackage = () => {
      if (
        elements.value.length - 1 >
        selectedElementCounter.value
      ) {
        selectedElementCounter.value++;
      }
    };

    // let selectedTestPackage = computed(()=> allTestPackages[SelectedTestPackageCounter])

    return {
      selectedElement,
      type:props.type,
      goToTestPack,
      title:props.title,
      prevTestPackage,
      addTestPackageToUser,
      nextTestPackage,
    };
  },
};
</script>

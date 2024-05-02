<script setup>
const props = defineProps({
  step: {
    type: Number,
    required: true,
  },
  titles: {
    type: Array,
    required: true,
  },
  lifeStyle: { // defined component type {profileInspectionRequest,carPriceEstimate}
    type: String,
    required: true,
  },
});


</script>

<template>
  <!-- show when use as 'profileInspectionRequest' -->
  <div v-if="lifeStyle == 'profileInspectionRequest'" class="flex items-center mb-20 md:mb-0 mx-auto">
    <div v-for="(title, index) in titles" :key="index" class="flex items-center">
      <div class="relative w-20 flex flex-col gap-2 items-center text-xs text-center -mx-7 text-brand-purple z-30">
        <div v-if="index + 1 < step" class="flex rounded-full bg-green-600 p-1.5">
          <NuxtIcon class="w-4 text-white" name="check" />
        </div>
        <div v-if="index + 1 == step" class="flex rounded-full bg-cyan-700 px-1.5">
          <NuxtIcon class="w-4 text-white" name="loading" />
        </div>
        <NuxtIcon v-if="index + 1 > step" class="w-5 text-gray-200 " name="circle" />
        <p v-if="index + 1 == step" class="absolute top-8 w-14 md:w-28 font-semibold text-brand-blue">{{ title }}</p>
        <p v-else class="absolute top-8 w-14 md:w-28"
          :class="index + 1 <= step ? 'text-green-600 font-semibold' : 'text-gray-400'">{{ title }}</p>
      </div>
      <div v-if="index + 1 < titles.length" class="flex w-10 sm:w-24 h-1 z-0"
        :class="index + 1 < step ? 'bg-green-600' : 'bg-gray-200'">
      </div>
    </div>
  </div>

  <!-- Use in Car Price Estimate page -->
  <div v-else-if="lifeStyle == 'carPriceEstimate'" class="flex items-center mb-20 md:mb-0 mx-auto my-3">
    <div v-for="(title, index) in titles" :key="index" class="flex items-center">
      <div class="relative w-20 flex flex-col gap-2 items-center text-xs text-center -mx-7 text-brand-purple z-30">
        <!-- v-if="index + 1 == step" -->
        <p v-if="index + 1 == step"  class="absolute top-6 w-10 md:w-28 text-xs font-thin text-gray-700">{{ title }}</p>  
        <!-- v-else -->
        <p v-else class="absolute top-6 w-10 text-xs md:w-28" :class="index + 1 <= step ? 'text-gray-700 font-bold' : 'text-gray-400'">{{ title }}</p>
        <!-- v-if="index + 1 < step"-->
        <div  v-if="index + 1 < step" class="flex w-5 h-5 justify-center rounded-full items-center p-1 bg-gray-800 border border-gray-800">
          <span class="text-gray-100 text-xs farsi-num flex ">{{index+1}}</span>
        </div>
        <!-- v-if="index + 1 == step"  -->
        <div v-if="index + 1 == step" class="flex w-5 h-5 justify-center rounded-full items-center p-1 bg-white border border-gray-800">
          <span class="text-gray-800 farsi-num  ">{{index+1}}</span>
        </div>
        <div v-if="index + 1 > step" class="flex w-5 h-5 justify-center rounded-full items-center p-1 bg-white border border-gray-400">
          <span  class="text-gray-400 text-xs farsi-num flex ">{{index+1}}</span>
        </div>          
      </div>
      <div v-if="index + 1 < titles.length" class="flex w-10 sm:w-24 h-1 z-0"
        :class="index + 1 < step ? 'bg-gray-800' : 'bg-gray-200'">
      </div>
    </div>
  </div>
</template>

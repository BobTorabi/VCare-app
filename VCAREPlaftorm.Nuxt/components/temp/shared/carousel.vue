<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  slidesNo: {
    type: Number,
    required: true,
  },
  height: {
    type: String,
  },
  navigation: {
    type: Boolean,
    default: true,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  autoPlay: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 7500,
  },
});
const currentSlide = ref(1);

// Next Slide
const nextSlide = () => {
  if (currentSlide.value > props.slidesNo - 1) {
    currentSlide.value = 1;
    emit('update:modelValue', currentSlide.value);
    return;
  }
  currentSlide.value += 1;
  emit('update:modelValue', currentSlide.value);
};

// Previous Slide
const prevSlide = () => {
  if (currentSlide.value === 1) {
    currentSlide.value = props.slidesNo;
    emit('update:modelValue', currentSlide.value);
    return;
  }
  currentSlide.value -= 1;
  emit('update:modelValue', currentSlide.value);
};

const goToSlide = (index) => {
  currentSlide.value = index;
  emit('update:modelValue', currentSlide.value);
};

const autoPlay = () => {
  setInterval(() => {
    nextSlide();
  }, props.duration);
};
onMounted(() => {
  if (props.autoPlay) {
    autoPlay();
  }
});
</script>
<template>
  <div class="flex flex-col space-y-5 items-center">
    <div class="relative w-full flex items-center xl:container mx-auto mt-5 px-10" :class="height">
      <slot />
      <!-- Navigation -->
      <div v-if="navigation" class="absolute inset-0 flex">
        <div class="w-1/2 flex items-center justify-start bg-transparent">
          <button
            class="bg-white/30 hover:bg-brand-red/10 text-black flex justify-center items-center shadow-md font-bold rounded-l-md w-9 h-10"
            @click="prevSlide"
          >
            <img class="w-10 rotate-180" src="/icons/chevron-left.svg" alt="" />
          </button>
        </div>
        <div class="flex items-center justify-end w-1/2 bg-transparent">
          <button
            class="bg-white/30 hover:bg-brand-red/10 text-black/30 shadow-md rounded-r-md w-9 h-10 flex justify-center items-center"
            @click="nextSlide"
          >
            <img class="w-10 flex" src="/icons/chevron-left.svg" alt="" />
          </button>
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="pagination" class="w-full flex items-center justify-center px-4">
      <div v-for="index in slidesNo" :key="index">
        <button
          class="mt-4 mx-2 mb-0 rounded-full overflow-hidden transition-colors cursor-pointer duration-200 ease-out hover:bg-gray-600 hover:shadow-lg"
          :class="{
            'bg-black w-5 h-5': currentSlide === index,
            'bg-gray-200 w-3 h-3': currentSlide !== index,
          }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>
  </div>
</template>

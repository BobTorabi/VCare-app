<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  isActive: {
    type: Boolean,
  },
  label: {
    type: String,
  },
});
const active = ref(props.isActive)
const toggleActive = () => {
  // active.value = active.value == true ? false : true;
  active.value = !active.value;
  emit("update:modelValue", active.value);
}

</script>
<template>
  <div class="flex flex-col gap-4 my-3 farsi-num w-full">
    <div>
      <label class="font-bold">{{ label }}</label>
    </div>
    <div class="flex gap-3 cursor-pointer items-center" @click="toggleActive()">
      <div class="relative w-11 h-6 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
        :class="{ 'bg-green-500': active }">
        <div class="absolute right-1 bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"
          :class="{ '-translate-x-5': active }"></div>
      </div>
    </div>
  </div>
</template>

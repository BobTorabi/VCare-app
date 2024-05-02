<script setup>
const props = defineProps({
  dir: {
    type: String,
    default: "rtl",
  },
  name: {
    type: String,
    required: true,
  },
  options: {
    type: Object,
  },
  hasIcon: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "",
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  requiredStar: {
    type: Boolean,
    default: false,
  },
});
</script>
<template>
  <div class="flex flex-col gap-2 my-3 w-full">
    <div>
      <label class="font-bold">{{ label }}
        <span v-if="requiredStar" class="text-color-green">*</span>
      </label>
    </div>
    <div class="relative">
      <VField :name="name" v-slot="{ field, meta }">
        <select :dir="dir" v-bind="field" :autofocus="autofocus" :placeholder="placeholder"
          class="max-w-full w-full border farsi-num rounded inline-flex py-2 px-6 outline-1 outline-offset-4 outline-blue-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]"
          :class="{
            'border-green-500': meta.valid && meta.touched,
            'border-red-500': !meta.valid && meta.touched,
          }">
          <option selected disabled>انتخاب کنید</option>
          <option v-for="(option, index) in options" :key="index" :value="option.id">
            {{ option.title }}
          </option>
        </select>
        <!-- <span
          class="absolute top-3"
          :class="{ 'left-3': dir === 'ltr', 'right-3': dir === 'rtl' }"
        >
          <i class="fas" :class="leftIcon"></i>
        </span> -->
        <span class="absolute top-2.5" :class="{ 'right-3': dir === 'ltr', 'left-3': dir === 'rtl' }"
          v-if="meta.valid && meta.touched && hasIcon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 text-green-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <span class="absolute top-2.5" :class="{ 'right-3': dir === 'ltr', 'left-3': dir === 'rtl' }"
          v-else-if="!meta.valid && meta.touched && hasIcon">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 text-red-600">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </span>
        <VErrorMessage :name="name" as="div" class="text-xs text-red-500 mt-2 farsi-num" />
      </VField>
    </div>
  </div>
</template>

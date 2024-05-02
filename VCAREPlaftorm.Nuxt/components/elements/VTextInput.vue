<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  dir: {
    type: String,
    default: "rtl",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
  },
  placeholder: {
    type: String,
    default: "",
  },
  maxlength: {
    type: String,
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  isNumber: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  requiredStar: {
    type: Boolean,
    default: false,
  },
});

const isNumber = (event) => {
  if (props.type == "tel" && !/\d/.test(event.key)) {
    return event.preventDefault();
  }
};
</script>
<template>
  <div class="flex flex-col gap-2 my-3 w-full">
    <div>
      <label class="font-bold">
        {{ label }}
        <span v-if="requiredStar" class="text-color-green">*</span>
      </label>
    </div>
    <div class="relative">
      <VField :name="name" v-slot="{ field, meta, errors }">
        <input :dir="dir" v-bind="field" :autofocus="autofocus" :autocomplete="autocomplete" @keypress="isNumber($event)"
          :maxlength="maxlength" :disabled="disabled" :placeholder="placeholder" :type="type"
          class="max-w-full w-full border rounded inline-flex h-10 py-4 pr-8 pl-3 outline-none appearance-none" :class="{
            'border-green-500': meta.valid && meta.touched,
            'border-red-500': !meta.valid && meta.touched,
          }" />
        <!-- <span
            class="absolute top-3"
            :class="{ 'left-3': dir === 'ltr', 'right-3': dir === 'rtl' }"
          >
            <i class="fas" :class="leftIcon"></i>
          </span> -->
        <span class="absolute top-2.5" :class="{ 'right-3': dir === 'ltr', 'left-3': dir === 'rtl' }"
          v-if="meta.valid && meta.touched">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
            class="w-5 h-5 text-green-700">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <span class="absolute top-2.5" :class="{ 'right-3': dir === 'ltr', 'left-3': dir === 'rtl' }"
          v-else-if="!meta.valid && meta.touched">
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

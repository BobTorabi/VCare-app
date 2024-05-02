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
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  leftIcon: {
    type: String,
    default: "",
  },
  autocomplete: {
    type: String,
    default: "off",
  },
  debug: {
    type: Boolean,
    default: false,
  },
  maxlength: {
    type: String,
  },
});

const isNumber = (event) => {
  if (!/\d/.test(event.key)) return event.preventDefault();
};
</script>
<template>
  <div
    class="w-full flex flex-col sm:flex-row items-center justify-between gap-2 my-3 bg-blue-50 border border-blue-500 rounded-md px-4 py-1 tracking-wide font-bold"
  >
    <div class="shrink-0">
      <label>{{ label }}</label>
      <VErrorMessage
        :name="name"
        as="div"
        class="text-xs text-red-500 mt-1 farsi-num font-normal"
      />
    </div>
    <div class="relative md:w-4/6">
      <VField :name="name" v-slot="{ field, meta }">
        <input
          :dir="dir"
          v-bind="field"
          class="max-w-full w-full border rounded inline-flex h-10 py-4 px-6 outline-1 outline-brand-blue-light"
          :class="{
            'border-green-500': meta.valid && meta.touched,
            'border-red-500': !meta.valid && meta.touched,
          }"
          :placeholder="placeholder"
          :type="type"
          @keypress="isNumber($event)"
          :maxlength="maxlength"
          :autocomplete="autocomplete"
        />
        <span
          class="absolute top-3"
          :class="{ 'left-3': dir === 'ltr', 'right-3': dir === 'rtl' }"
        >
          <!-- <i class="fas" :class="leftIcon"></i> -->
        </span>
        <span
          class="absolute top-2.5"
          :class="{ 'right-3': dir === 'ltr', 'left-3': dir === 'rtl' }"
          v-if="meta.valid && meta.touched"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-green-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
        <span
          class="absolute top-2.5"
          :class="{ 'right-3': dir === 'ltr', 'left-3': dir === 'rtl' }"
          v-else-if="!meta.valid && meta.touched"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-5 h-5 text-red-600"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
      </VField>
    </div>
  </div>
</template>
<style scoped>
/* @import "https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"; */
@import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css";
</style>

<script setup lang="ts">
import { useField } from "vee-validate";
const props = defineProps({
  value: {
    type: String,
    default: '',
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
  autoSubmit: {
    type: Boolean,
    default: false,
  },
  min: {
    type: String,
  },
  max: {
    type: String,
  },
  autoApply: {
    type: Boolean
  },
  row: {
    type: Boolean
  }
});
const name = toRef(props, 'name');
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
const isNumber = (event: any) => {
  return event.preventDefault();
};
</script>

<template>
  <div class="flex w-full" :class="{
    'flex-col gap-2': !row,
    'items-center': row,
  }">
    <div class="" :class="{
      'w-12 pb-[9px]': row,
    }" >
      <div :for="name" class="font-bold">{{ label }}</div>
    </div>
    <div class="relative">
      <ClientOnly>
        <Datepicker locale="en" v-model="inputValue" :name="name" :auto-submit="autoSubmit" :max-date="max"
          :min-date="min" :auto-apply="autoApply" />
      </ClientOnly>
      <input :name="name" :id="name" :type="type" :value="inputValue" :placeholder="placeholder"
        @keypress="isNumber($event)"
        class=".custom-input max-w-full custom-input farsi-num w-full border rounded h-10 py-4 px-6 outline-1 outline-offset-4 outline-blue-500 bg-[url('/icons/calendar.svg')] bg-no-repeat bg-[position:10px] hidden"
        :class="{
          'border-green-500': meta.valid && meta.touched,
          'border-red-500': !meta.valid && meta.touched,
        }" />
      <p class="text-xs text-red-500 mt-2 farsi-num" v-show="errorMessage || meta.valid">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>
<style>
.dp__cell_inner.dp__cell_offset.dp__pointer.dp__date_hover {
  color: #535353;
}
</style>
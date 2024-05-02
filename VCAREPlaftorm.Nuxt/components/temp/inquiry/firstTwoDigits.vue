<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
const isNumber = (event) => {
  if (!/\d/.test(event.key)) return event.preventDefault();
};
</script>
<template>
  <VField :name="name" v-slot="{ field, meta }">
    <input v-bind="field" autofocus 
      class="max-w-full w-full border rounded inline-flex h-10 py-4 text-center outline-1 outline-brand-blue-light "
      :class="{
        'border-green-500': meta.valid && meta.touched,
        'border-red-500': !meta.valid && meta.touched,
      }" @keypress="isNumber($event)" type="tel" placeholder="52" maxlength="2" />
  </VField>
</template>

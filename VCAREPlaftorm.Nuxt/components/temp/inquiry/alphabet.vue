<script setup>
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <VField :name="name" v-slot="{ field, meta }">
    <select v-bind="field" placeholder="الف"
      class="border w-10 sm:w-14 md:w-16 h-10 text-center rounded-md  outline-1 outline-brand-blue-light" :class="{
        'border-green-500': meta.valid && meta.touched,
        'border-red-500': !meta.valid && meta.touched,
      }">
      <option value="الف">الف</option>
      <option value="ب">ب</option>
      <option value="پ">پ</option>
      <option value="ت">ت</option>
      <option value="ث">ث</option>
      <option value="ج">ج</option>
      <option value="د">د</option>
      <option value="ز">ز</option>
      <option value="س">س</option>
      <option value="ش">ش</option>
      <option value="ص">ص</option>
      <option value="ط">ط</option>
      <option value="ع">ع</option>
      <option value="ف">ف</option>
      <option value="ق">ق</option>
      <option value="ک">ک</option>
      <option value="گ">گ</option>
      <option value="ل">ل</option>
      <option value="م">م</option>
      <option value="ن">ن</option>
      <option value="و">و</option>
      <option value="ه">ه‍</option>
      <option value="ی">ی</option>
      <option value="معلولین">معلولین</option>
      <option value="تشریفات">تشریفات</option>
      <option value="D">D</option>
      <option value="S">S</option>
    </select>
  </VField>
</template>

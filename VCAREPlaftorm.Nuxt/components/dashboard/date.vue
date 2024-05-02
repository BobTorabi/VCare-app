<script setup>
// const locale = ref()
// const switchLocale = () => {
//   locale.value = locale.value !== 'fr' ? 'fr' : 'en-GB'
// }
const date = ref('')
const changeDate = () => {
  date.value = Date.now()
}

onMounted(() =>
  setInterval(() => {
    changeDate();
  }, 5000)
);
</script>
<template>
  <div class="text-center text-color-green">
    <p>
      <b class="mx-1">
        <NuxtTime :datetime="date" day="numeric" />
      </b>
      <NuxtTime :datetime="date" month="long" />
    </p>
    <p>
      <NuxtTime :datetime="Date.now()" weekday="long" /> ,
      <b>
        <NuxtTime :datetime="date" minute="numeric" hour="numeric" />
      </b>
    </p>
    <img src="~/assets/images/tree.png" class="mx-auto -mt-14" alt="" />
  </div>
</template>
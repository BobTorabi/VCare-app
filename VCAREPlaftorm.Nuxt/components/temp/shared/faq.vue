<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
const props = defineProps({
  faqData: Object,
})

</script>

<template>
  <div class="xl:container mx-auto flex flex-col justify-center px-5 py-8 md:py-14 farsi-num">

    <h2 class="text-lg md:text-2xl font-extrabold mx-auto mb-3">
      سوالات متداول
    </h2>

    <div class="w-full self-center flex flex-col items-center justify-center leading-7">

      <SharedAccordion v-for="faq in faqData" :key="faq.id" :title="faq.title">
        <p class="text-gray-900 px-5 text-justify">{{ faq.details }}</p>
      </SharedAccordion>

    </div>
  </div>
</template>

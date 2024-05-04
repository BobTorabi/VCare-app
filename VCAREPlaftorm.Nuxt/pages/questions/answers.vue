<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { GetQuestionsForDirectQuestions } = useQuestions();

// States
const loading = ref(true);
const errMessage = ref();

// Logics

// select route query
if (route.query.bodyPartId) {
  handleGetBodyPartsForMainSymptom();
} else if (route.query.symptomSubgroupId) {
  handleGetSymptomSubgroupForMainSymptom();
} else if (route.query.directId) {
  // GetQuestionsForDirectQuestions
}

</script>
<template>
  <div class="pb-[140px]">

    <Head>
      <Title>Questions</Title>
    </Head>

    <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
      <SharedLoading v-if="loading" class="mb-6" />
      <div v-if="!loading" class="p-4">
        11
      </div>
    </div>

  </div>
</template>

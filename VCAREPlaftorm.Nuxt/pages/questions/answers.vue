<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const route = useRoute();
const { GetQuestionsForDirectQuestions } = useQuestions();

// States
const loading = ref(true);
const errMessage = ref();
const allQuestions = ref("");

// Logics
const handleGetQuestionsForDirectQuestions = () => {
  GetQuestionsForDirectQuestions(route.query.directId)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        allQuestions.value = await r;
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

// select route query
if (route.query.bodyPartId) {
  // handleGetBodyPartsForMainSymptom();
} else if (route.query.symptomSubgroupId) {
  // handleGetSymptomSubgroupForMainSymptom();
} else if (route.query.directId) {
  handleGetQuestionsForDirectQuestions();
}

</script>
<template>
  <div class="pb-[100px]">

    <Head>
      <Title>Questions</Title>
    </Head>

    <div>
      <SharedLoading v-if="loading" class="mb-6" />
      <div v-if="!loading">
        <div v-for="(item, index) in allQuestions" :key="index"
          class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
          <div class="p-4">
            {{ item.question.title }}
            <div v-for="(questionItem, index) in item.question.questionOptions" :key="index" class="mt-4">
              <input type="radio" name="question" :id="'question-' + questionItem.id" :value="questionItem.id"
                class="mr-2" />
              <label :for="'question-' + questionItem.id">{{ questionItem.title }}</label>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

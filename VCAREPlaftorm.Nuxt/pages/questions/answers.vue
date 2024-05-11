<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const route = useRoute();
const { GetQuestionsForBodyParts, GetQuestionsForDirectQuestions, GetQuestionsForSymptomSubgroup } = useQuestions();

// States
const loading = ref(true);
const errMessage = ref();
const allQuestions = ref("");

// Logics
const handleGetQuestionsForBodyParts = () => {
  GetQuestionsForBodyParts(route.query.bodyPartId)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        allQuestions.value = await r;
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

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

const handleGetQuestionsForSymptomSubgroup = () => {
  GetQuestionsForSymptomSubgroup(route.query.symptomSubgroupId)
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
  handleGetQuestionsForBodyParts();
} else if (route.query.symptomSubgroupId) {
  handleGetQuestionsForSymptomSubgroup();
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
        <div v-if="allQuestions.length > 0">
          <div v-for="(item, index) in allQuestions" :key="index"
            class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
            <div class="p-4">
              {{ index + 1 }}- {{ item.question.title }}
              <div v-for="(questionItem, questionIndex) in item.question.questionOptions" :key="questionIndex"
                class="mt-4">
                <input type="radio" :name="'question-' + index" :id="'question-' + questionItem.id"
                  :value="questionItem.id" class="mr-2" />
                <label :for="'question-' + questionItem.id">{{ questionItem.title }}</label>
              </div>
            </div>
          </div>
          <div class="px-4">
            <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block cursor-pointer">
              Submit
            </div>
          </div>
        </div>
        <div v-else class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
          <div class="p-4">
            We don't have any questions.
            <NuxtLink :to="`/`">
              <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block">
                Home page
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

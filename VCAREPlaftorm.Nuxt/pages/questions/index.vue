<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const router = useRouter();
const { GetSymptomsAndQuestions } = useQuestions();

// States
const loading = ref(true);
const errMessage = ref();
const allSymptomsAndQuestions = ref('');
const countQuestions = ref(0);
const answerFlag = ref(0);
const lastQuestions = ref(false);

// Logics
const handleNoButtonClick = () => {
  loading.value = true;

  if (answerFlag.value < countQuestions.value - 1) {
    answerFlag.value++;
  } else {
    lastQuestions.value = true;
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
}

const handleYesButtonClick = (symptomId, symptomType) => {
  if (symptomType == "BodyPart") {
    router.push(`/questions/subGroup?bodyPart=` + symptomId);
  } else if (symptomType == "DirectQuestion") {
    router.push("/questions/answers?directId=" + symptomId);
  } else if (symptomType == "SymptomSubgroup") {
    router.push(`/questions/subGroup?symptomSubgroup=` + symptomId);
  }
}

// Get Symptoms And Questions
const handleGetSymptomsAndQuestions = () => {
  GetSymptomsAndQuestions()
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        allSymptomsAndQuestions.value = await r;
        countQuestions.value = await r.length;
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}
handleGetSymptomsAndQuestions();

</script>
<template>
  <div class="pb-[140px]">

    <Head>
      <Title>Questions</Title>
    </Head>

    <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
      <SharedLoading v-if="loading" class="mb-6" />
      <div v-if="!loading" class="p-4">
        <div v-if="!lastQuestions">
          <div class="pb-4">{{ allSymptomsAndQuestions[answerFlag].questionTitle }}</div>
          <div class="flex gap-6">
            <button
              class="text-[#00ab10] border-[#00ab10] border w-full rounded-lg text-center p-3 mt-4 flex gap-2 justify-center"
              type="submit"
              @click="handleYesButtonClick(allSymptomsAndQuestions[answerFlag].symptomId, allSymptomsAndQuestions[answerFlag].symptomType)">
              <span>Yes</span>
              <span><img src="~/assets/images/question_true.png" class="mx-auto" alt="" /></span>
            </button>
            <button
              class="text-[#c60000] border-[#c60000] border w-full rounded-lg text-center p-3 mt-4 flex gap-2 justify-center"
              type="submit" @click="handleNoButtonClick">
              <span>No</span>
              <span><img src="~/assets/images/question_false.png" class="mx-auto" alt="" /></span>
            </button>
          </div>
        </div>
        <div v-else>
          <div>
            Today's questions are finished, you can return tomorrow.
          </div>
          <div>
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

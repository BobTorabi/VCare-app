<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const router = useRouter();
const { GetSymptomsAndQuestions } = useQuestions();
const cookieStep = useCookie("userStep");

// States
const loading = ref(true);
const errMessage = ref();
const allSymptomsAndQuestions = ref('');
const countQuestions = ref(0);
const lastQuestions = ref(false);
const firstQuestions = ref(true);

// Logics
const handleNoButtonClick = () => {
  loading.value = true;
  firstQuestions.value = false;

  if (cookieStep.value < countQuestions.value - 1) {
    cookieStep.value = cookieStep.value + 1;
  } else {
    lastQuestions.value = true;
    firstQuestions.value = true;
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

const handleBackButtonClick = () => {
  loading.value = true;
  cookieStep.value = cookieStep.value - 1;

  if (cookieStep.value == 0) {
    firstQuestions.value = true;
  }

  setTimeout(() => {
    loading.value = false;
  }, 500);
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
          <div class="pb-4">
            {{ cookieStep + 1 }}- {{ allSymptomsAndQuestions[cookieStep].questionTitle }}
          </div>
          <div class="flex gap-6">
            <button
              class="text-[#00ab10] border-[#00ab10] border w-full rounded-lg text-center p-3 mt-4 flex gap-2 justify-center"
              type="submit"
              @click="handleYesButtonClick(allSymptomsAndQuestions[cookieStep].symptomId, allSymptomsAndQuestions[cookieStep].symptomType)">
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
            You successfully answered all the questions for now. You can report your symptoms anytime later.
          </div>
          <div>
            <NuxtLink :to="`/`">
              <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block">
                Submit report
              </div>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <div class="flex gap-2 justify-end" v-if="!firstQuestions">
      <button class="bg-color-pri text-white border w-20 m-4 rounded-lg py-2 px-3 mt-4" type="submit"
        @click="handleBackButtonClick">
        <span>Back</span>
      </button>
    </div>

  </div>
</template>

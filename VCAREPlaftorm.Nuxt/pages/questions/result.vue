<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { GetSymptomsAndQuestions } = useQuestions();
const route = useRoute();

// States
const loading = ref(false);
const errMessage = ref();

const cookieStep = useCookie("userStep");
const cookieReportCode = useCookie("reportCode");
const { authReportCode } = useAuth();

const countQuestions = ref(0);
const lastQuestions = ref(false);
const router = useRouter()


// Logics
// Get Symptoms And Questions
const handleGetSymptomsAndQuestions = () => {
  GetSymptomsAndQuestions()
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        countQuestions.value = await r.length;

        if (cookieStep.value < countQuestions.value - 1) {
          cookieStep.value = cookieStep.value + 1;
        } else {
          lastQuestions.value = true;
        }

      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}
handleGetSymptomsAndQuestions();

const finalAnswers = async () => {
  authReportCode.value = await null;
  cookieReportCode.value = await null;
  router.push("/");
}

</script>
<template>
  <div class="pb-[100px]">

    <Head>
      <Title>Result</Title>
    </Head>

    <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
      <SharedLoading v-if="loading" class="mb-6" />
      <div v-if="!loading" class="p-4">
        <div class="text-lg mt-1 leading-7">
          <h1>
            Your report has been received, You can select another symptoms:
          </h1>
        </div>

        <div class="flex mt-4 flex-col">
          <NuxtLink to="/questions" class="border border-color-pri text-color-pri w-full rounded-lg text-center py-3"
            v-if="!lastQuestions">
            Add and countinue
          </NuxtLink>
          <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block cursor-pointer"
            @click="finalAnswers">
            I`m done, submit my report.
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

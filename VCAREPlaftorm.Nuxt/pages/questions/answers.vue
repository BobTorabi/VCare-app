<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const route = useRoute();
const router = useRouter();
const { authUser, authReportCode } = useAuth();
const { GetQuestionsForBodyParts, GetQuestionsForDirectQuestions, GetQuestionsForSymptomSubGroups, SendUserReport } = useQuestions();
const cookieReportCode = useCookie("reportCode");

// States
const loading = ref(true);
const errMessage = ref();
const allQuestionsBodyPart = ref([]);
const allQuestionsDirect = ref([]);
const allQuestionsSymptomSubgroup = ref([]);
const tempAnswers = ref({});

const counterBodyPart = ref(0);

const answersArray = ref({
  userId: authUser.value.id,
  submittedAnswers: [],
  submitDate: ""
}
);

// Logics
const handleGetQuestionsForBodyParts = () => {
  let bodyPartIdItem = route.query.bodyPartId;
  let bodyPartIdItems = bodyPartIdItem.split(',');
  GetQuestionsForBodyParts(bodyPartIdItems)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        allQuestionsBodyPart.value = await r;

        // const mapItems = {};
        // questions.forEach(item => {
        //   if (!mapItems[item.bodyPartName]) {
        //     mapItems[item.bodyPartName] = [];
        //   }
        //   mapItems[item.bodyPartName].push(item);
        // });
        // allQuestionsBodyPart.value = Object.values(mapItems);
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
        allQuestionsDirect.value = await r;
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

const handleGetQuestionsForSymptomSubGroups = () => {
  let symptomSubgroupIdItem = route.query.symptomSubgroupId;
  let symptomSubgroupIdItems = symptomSubgroupIdItem.split(',');
  GetQuestionsForSymptomSubGroups(symptomSubgroupIdItems)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        let questions = await r;

        const mapItems = {};
        questions.forEach(item => {
          if (!mapItems[item.symptomSubgroupName]) {
            mapItems[item.symptomSubgroupName] = [];
          }
          mapItems[item.symptomSubgroupName].push(item);
        });
        allQuestionsSymptomSubgroup.value = Object.values(mapItems);
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

// select route query
if (route.query.bodyPartId) {
  handleGetQuestionsForBodyParts();
} else if (route.query.symptomSubgroupId) {
  handleGetQuestionsForSymptomSubGroups();
} else if (route.query.directId) {
  handleGetQuestionsForDirectQuestions();
}

const selectAnswer = (questionId, questionCode, selectedAnswerId, selectedAnswerCode) => {
  const existingResponseIndex = answersArray.value.submittedAnswers.findIndex((item) => item.questionId === questionId);
  if (existingResponseIndex !== -1) {
    answersArray.value.submittedAnswers[existingResponseIndex] = {
      questionId: questionId,
      questionCode: questionCode,
      selectedAnswerId: selectedAnswerId,
      selectedAnswerCode: selectedAnswerCode
    };
  } else {
    answersArray.value.submittedAnswers.push({
      questionId: questionId,
      questionCode: questionCode,
      selectedAnswerId: selectedAnswerId,
      selectedAnswerCode: selectedAnswerCode
    });
  }
  answersArray.value.submitDate = new Date().toISOString();
  answersArray.value.reportCode = authReportCode.value;
}

const handleSendUserReport = () => {
  SendUserReport(answersArray.value)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        let result = await r;
        if (result.status) {
          cookieReportCode.value = result.reportCode;
          authReportCode.value = cookieReportCode.value;
        }
        if (result) {
          router.push(`/questions/result`);
        }
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

const nextButton = () => {
  if (counterBodyPart.value < allQuestionsBodyPart.value.length) {
    counterBodyPart.value = counterBodyPart.value + 1;
  }
}

const previousButton = () => {
  if (counterBodyPart.value > 0) {
    counterBodyPart.value = counterBodyPart.value - 1;
  }
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
        <div v-if="allQuestionsBodyPart.length > 0">
          <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
            <div class="p-4">

              <div class="border-b py-1 leading-7 border border-color-aux text-color-aux rounded-custom-10 px-2 mb-4">
                <p class="text-center">{{ allQuestionsBodyPart[counterBodyPart].bodyPartName }}</p>
              </div>
              {{ counterBodyPart + 1 }}- {{ allQuestionsBodyPart[counterBodyPart].question.title }}
              <div v-for="(questionItem, questionIndex) in allQuestionsBodyPart[counterBodyPart].question.questionOptions"
                :key="questionIndex" class="mt-4">
                <input type="radio" :name="'question-' + counterBodyPart" :id="'question-' + questionItem.id"
                  :value="questionItem.id" class="mr-2"
                  v-model="tempAnswers[allQuestionsBodyPart[counterBodyPart].question.id]"
                  @change="selectAnswer(allQuestionsBodyPart[counterBodyPart].question.id, allQuestionsBodyPart[counterBodyPart].question.code, questionItem.id, questionItem.code)" />
                <label :for="'question-' + questionItem.id">{{ questionItem.title }}</label>
              </div>
              <div class="flex gap-2 mt-2 justify-end">
                <div class="border border-color-pri text-color-pri rounded-lg text-center p-3 mt-4 block cursor-pointer"
                  @click="previousButton()" v-if="counterBodyPart > 0">
                  Previous
                </div>
                <template v-if="counterBodyPart < allQuestionsBodyPart.length - 1">
                  <div class="bg-color-pri text-white rounded-lg text-center p-3 mt-4 block cursor-pointer"
                    @click="nextButton()">
                    Next
                  </div>
                </template>
                <template v-else>
                  <div class="bg-color-pri text-white rounded-lg text-center p-3 pb-4 mt-4 block cursor-pointer"
                    @click="handleSendUserReport()">
                    Submit
                  </div>
                </template>
              </div>

            </div>
          </div>
        </div>
        <div v-else-if="allQuestionsDirect.length > 0">
          <div v-for="(item, index) in allQuestionsDirect" :key="index"
            class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
            <div class="p-4">
              {{ index + 1 }}- {{ item.question.title }}
              <div v-for="(questionItem, questionIndex) in item.question.questionOptions" :key="questionIndex"
                class="mt-4">
                <input type="radio" :name="'question-' + index" :id="'question-' + questionItem.id"
                  :value="questionItem.id" class="mr-2"
                  @change="selectAnswer(item.question.id, item.question.code, questionItem.id, questionItem.code)" />
                <label :for="'question-' + questionItem.id">{{ questionItem.title }}</label>
              </div>
            </div>
          </div>
          <div class="px-4">
            <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block cursor-pointer"
              @click="handleSendUserReport()">
              Submit
            </div>
          </div>
        </div>
        <div v-else-if="allQuestionsSymptomSubgroup.length > 0">
          <div v-for="(item, index) in allQuestionsSymptomSubgroup" :key="index"
            class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
            <div class="p-4">
              <div class="border-b py-1 leading-7 border border-color-aux text-color-aux rounded-custom-10 px-2">
                <p class="text-center">{{ item[0].symptomSubgroupName }}</p>
              </div>
              <div v-for="(subItem, index) in item" :key="index" class="mt-4 border-b pb-4">
                {{ index + 1 }}- {{ subItem.question.title }}
                <div v-for="(questionItem, questionIndex) in subItem.question.questionOptions" :key="questionIndex"
                  class="mt-4">
                  <input type="radio" :name="'question-' + index" :id="'question-' + questionItem.id"
                    :value="questionItem.id" class="mr-2"
                    @change="selectAnswer(subItem.question.id, subItem.question.code, questionItem.id, questionItem.code)" />
                  <label :for="'question-' + questionItem.id">{{ questionItem.title }}</label>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4">
            <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block cursor-pointer"
              @click="handleSendUserReport()">
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

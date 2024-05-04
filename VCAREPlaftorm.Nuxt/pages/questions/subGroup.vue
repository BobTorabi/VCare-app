<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const route = useRoute();
const { GetBodyPartsForMainSymptom, GetSymptomSubgroupForMainSymptom } = useQuestions();

// States
const loading = ref(true);
const errMessage = ref();
const AllBodyParts = ref('');
const AllSymptom = ref('');

// Logics
// Get Body Parts For Main Symptom
const handleGetBodyPartsForMainSymptom = () => {
  GetBodyPartsForMainSymptom(route.query.bodyPart)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        AllBodyParts.value = await r;
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

// Get Symptom Subgroup For Main Symptom
const handleGetSymptomSubgroupForMainSymptom = () => {
  GetSymptomSubgroupForMainSymptom(route.query.symptomSubgroup)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        AllSymptom.value = await r;
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

// select route query
if (route.query.bodyPart) {
  handleGetBodyPartsForMainSymptom();
} else if (route.query.symptomSubgroup) {
  handleGetSymptomSubgroupForMainSymptom();
}

</script>
<template>
  <div class="pb-[100px]">

    <Head>
      <Title>Questions</Title>
    </Head>

    <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
      <SharedLoading v-if="loading" class="mb-6" />
      <div v-if="!loading" class="p-4">
        <div v-if="AllBodyParts">
          Please select the body part:
          <div v-for="(item, index) in AllBodyParts" :key="index" class="main-category">
            <NuxtLink :to="'/questions/answers?bodyPartId=' + item.id"
              class="block text-center items-center font-bold bg-color-sec text-white rounded-custom-10 py-6 px-2 mt-4">
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
        <div v-else-if="AllSymptom">
          Please select the symptom:
          <div v-for="(item, index) in AllSymptom" :key="index" class="main-category">
            <NuxtLink :to="'/questions/answers?symptomSubgroupId=' + item.id"
              class="block text-center items-center font-bold bg-color-sec text-white rounded-custom-10 py-6 px-2 mt-4">
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

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
const items = ref([]);
const activeItems = ref([]);

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

// click On Items
const clickOnItems = (id) => {
  if (activeItems.value.includes(id)) {
    const index = activeItems.value.indexOf(id);
    if (index !== -1) {
      activeItems.value.splice(index, 1);
    }
    const index2 = items.value.indexOf(id);
    if (index2 !== -1) {
      items.value.splice(index2, 1);
    }
  } else {
    activeItems.value.push(id);
    items.value.push(id);
  }
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
          <div class="grid grid-cols-2 gap-4 mt-4 ">
            <div v-for="(item, index) in AllBodyParts" :key="index"
              class="block text-center place-content-center font-bold border border-color-pri rounded-custom-10 py-6 px-2 min-h-[90px] cursor-pointer"
              @click="clickOnItems(item.id)" :class="{ 'active': activeItems.includes(item.id) }">
              {{ item.title }}
            </div>
          </div>
          <div class="">
            <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block cursor-pointer">
              Continue
            </div>
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
<style>
.active {
  background: #2DB284;
  color: #fff;
}
</style>
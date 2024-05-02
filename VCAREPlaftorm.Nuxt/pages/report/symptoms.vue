<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getAllOrganSymptom, addUserReport, setIsDoneReport } = useReport();
const { authUser, authReportDate } = useAuth();
const route = useRoute();
const router = useRouter();

// States
const loading = ref(true);
const loadingForm = ref(false);
const errMessage = ref(null);

const symptomsDescription = ref("");
const selectSymptoms = ref([]);
const sliderValue = ref([]);
const symptomsTimes = ref([]);

const stepTitle = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
const step = 3;

const symptoms = ref();
const symptomsFlag = ref(true);
const finishSymptomsFlag = ref(false);

const symptomsItemFlag = ref(false);
const symptomsItemFlagIndex = ref();

//Logic
// Get all symptoms
getAllOrganSymptom(route.query.organId)
  .then(async (r) => {
    if (r.status === 200) {
      errMessage.value = null;
      symptoms.value = await r.data;
    } else if (r.status != 200) {
      errMessage.value = r.messages[0];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

// select symptoms and Severity and add user report
const handleNextStep4 = (symptomsDescription, selectSymptoms, sliderValue, symptomsTimes) => {
  loadingForm.value = true;
  errMessage.value = null;
  let selectSymptomsNew = selectSymptoms.map(i => {
    var item = {}
    item['organId'] = i.organId,
      item["userDetailsId"] = authUser.id,
      item["reportDate"] = authReportDate.value,
      item['organSymptomId'] = i.id,
      item['symptomTypeCode'] = 'check',
      item['value'] = "1",
      item['reserve1'] = symptomsDescription
    return item
  })

  let selectSymptomsNewOrganSymptomId = selectSymptomsNew.map(i => {
    var item = {}
    item = i.organSymptomId
    return item
  })

  let organId = selectSymptomsNew.map(i => {
    var item = {}
    item = i.organId
    return item
  })

  sliderValue.map((i, index) => {
    if (selectSymptomsNewOrganSymptomId.indexOf(index) > -1) {
      selectSymptomsNew.push({
        organId: organId[0],
        organSymptomId: index,
        userDetailsId: authUser.id,
        reportDate: authReportDate.value,
        value: i,
        symptomTypeCode: 'rate',
        reserve1: symptomsDescription,
      })
    }
  })

  //console.log(symptomsTimes);
  symptomsTimes.map((i, index) => {
    if (selectSymptomsNewOrganSymptomId.indexOf(index) > -1) {
      selectSymptomsNew.push({
        organId: organId[0],
        organSymptomId: index,
        userDetailsId: authUser.id,
        reportDate: authReportDate.value,
        value: i,
        symptomTypeCode: 'quantity',
        reserve1: symptomsDescription,
      })
    }
  })

  // let symptomsTimesNew = symptomsTimes.map((i, index) => {
  //   var item = {}
  //   item['id'] = index,
  //     item['quantity'] = i
  //   return item
  // })
  //let mergedArray = [selectSymptomsNew, sliderValueNew, symptomsTimesNew, symptomsDescription];
  //let mergedArray = [...selectSymptomsNew, ...sliderValueNew];

  addUserReport(selectSymptomsNew)
    .then(async (r) => {
      if (r.status === 200) {
        finishSymptomsFlag.value = true;
      } else if (r.status != 200) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loadingForm.value = false);
};

const changeSelectSymptoms = (check, index) => {
  if (check) {
    symptomsItemFlag.value = true
    symptomsItemFlagIndex.value = index;
  } else {
    symptomsItemFlag.value = false
    symptomsItemFlagIndex.value = null;
  }
}

const handleSetIsDoneReport = () => {
  setIsDoneReport()
    .then(async (r) => {
      if (r.status === 200) {
        router.push("/dashboard");
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

</script>
<template>
  <div class="pb-[90px]">

    <Head>
      <Title>Report</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <div class="text-[17px]">
      <template v-if="symptomsFlag && !finishSymptomsFlag">
        <SharedProgressBar :step=step :titles="stepTitle" />
        <div class="shadow-sm bg-white py-4 px-4 rounded-lg mx-3">
          <div class="text-lg mt-1 leading-7">
            <p>
              Select the symptoms that are related to selected organ.
            </p>
          </div>
          <SharedLoading v-if="loading" />
          <div v-if="!loading" class="grid grid-cols-1 my-2">
            <label v-for="(symptomsItem, index) in symptoms" :key="index" class="">
              <div class="my-3">
                <input type="checkbox" :value="symptomsItem" v-model="selectSymptoms"
                  @change="changeSelectSymptoms($event.target.checked, index)" :id="`checkboxStatus${symptomsItem.id}`"
                  :checked="symptomsItem" class="w-5 h-5" />
                <span class="ml-2">{{ symptomsItem.title }}</span>
              </div>
              <!-- <template v-if="symptomsItemFlagIndex === index">test -->
              <div class="bg-color-body rounded-md" :class="{
                'block': symptomsItemFlagIndex === index,
                'hidden': symptomsItemFlagIndex != index,
              }">
                <div v-for="(item, index) in symptomsItem.symptomTypeCodes" :key="index">
                  <div v-if="item == 'rate'" class="p-4">
                    {{ item.title }} Rate
                    <div class="custom-slider flex items-center justify-center">
                      <input v-model="sliderValue[symptomsItem.id]" type="range" min="0" max="10" class="w-full" />
                      <input v-model="sliderValue[symptomsItem.id]" type="text"
                        class="w-7 text-center ml-2 border rounded-md text-center" />
                    </div>
                  </div>
                  <div v-if="item == 'quantity'" class="p-4">
                    <div class="mb-1">
                      {{ item.title }}
                    </div>
                    <input type="text" class="border rounded-md w-full p-2" v-model="symptomsTimes[symptomsItem.id]"
                      placeholder="Quantity" />

                  </div>
                </div>
                <!-- </template> -->
              </div>

            </label>
          </div>
          <div class="mb-1">
            Description
          </div>
          <input class="border rounded-md w-full h-20 p-2" type="text" v-model="symptomsDescription"
            placeholder="Describe the General pain" />

          <button class="bg-color-sec text-white w-full rounded-lg text-center py-3 mt-4 flex justify-center font-bold"
            @click="handleNextStep4(symptomsDescription, selectSymptoms, sliderValue, symptomsTimes)">
            Add Report
            <SharedLoadingFrom v-if="loadingForm" class="mx-2" />

          </button>
          <div v-if="errMessage"
            class="flex justify-center items-center font-semibold space-x-2 w-full text-center text-xs border p-2 bg-red-100 text-red-400 mt-4">
            <img src="@/assets/icons/error.svg" alt="" />
            <p>{{ errMessage }}</p>
          </div>

        </div>
      </template>
      <template v-else-if="finishSymptomsFlag">
        <SharedProgressBar :step=5 :titles="stepTitle" />
        <div class="shadow-sm bg-white py-4 px-4 rounded-lg mx-3">
          <div class="text-lg mt-1 leading-7">
            <h1>
              You can send the report or select another symptoms:
            </h1>
          </div>

          <div class="flex mt-4 flex-col">
            <NuxtLink to="/report/body" class="border border-color-pri text-color-pri w-full rounded-lg text-center py-3">
              Add other symptoms
            </NuxtLink>
            <button @click="handleSetIsDoneReport()"
              class="bg-color-pri text-white w-full rounded-lg text-center py-3 mt-4">
              Submit my report
            </button>
          </div>

        </div>
      </template>

    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { GetUserReports } = useQuestions();
const { authUser } = useAuth();

const initialValues = reactive({
  startDate: "",
  endtDate: "",
});

// States
const loading = ref(true);
const errMessage = ref();
const errMessage2 = ref();
const allUserReport = ref([]);

// Logics
const handleFormSubmit = (form) => {
  errMessage.value = "";
  errMessage2.value = "";
  if (!form.startDate || !form.startDate) {
    errMessage.value = 'Select date is required.'
    return
  } else if (!form.endtDate || !form.endtDate) {
    errMessage.value = 'Select date is required.'
    return
  } else {
    loading.value = true;
    allUserReport.value = '';
    errMessage.value = "";
    errMessage2.value = "";
    GetUserReports(authUser.value.id, form.startDate.toISOString(), form.endtDate.toISOString())
      .then(async (r) => {
        if (r) {
          allUserReport.value = await r;
          console.log(allUserReport.value.length);
          if (allUserReport.value.length > 0) {
            console.log(1);
            errMessage2.value = "";
          } else {
            console.log(2);
            errMessage2.value = "You dont have any report";
          }
        } else if (r.status == 500) {
          errMessage.value = r.messages[0];
        }
      })
      .catch((err) => (errMessage.value = err.data))
      .finally(() => loading.value = false);
  }
}

// handle Get User Reports
const handleGetUserReports = () => {
  const today = new Date().toISOString();
  const oneWeekAgo = new Date(today);
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  GetUserReports(authUser.value.id, oneWeekAgo.toISOString(), today)
    .then(async (r) => {
      if (r) {
        errMessage.value = null;
        allUserReport.value = await r;
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}
handleGetUserReports();

</script>
<template>
  <div class="pb-[140px]">

    <Head>
      <Title>My report</Title>
    </Head>
    <div class="px-4">
      <div class="pb-5">
        <SharedLoading v-if="loading" />
      </div>
      <div v-if="!loading">
        <VForm :validation-schema="schema1" :initial-values="initialValues" @submit="handleFormSubmit">
          <div class="shadow-md bg-white text-black rounded-custom-10 px-2 pt-2">
            <div class="flex">
              <div class="flex">
                <div>
                  <div class="-mb-2">From</div>
                  <ElementsVDatePickerInput v-model="startDate" name="startDate" :max="new Date()" :autoApply="true" />
                </div>
                <div class="ml-2">
                  <div class="-mb-2">To</div>
                  <ElementsVDatePickerInput v-model="endtDate" name="endtDate" :max="new Date()" :autoApply="true" />
                </div>
              </div>
              <div>
                <button class="bg-color-pri text-white rounded-lg text-center py-2 px-3 mt-5 ml-2 block" type="submit">
                  Search
                </button>
              </div>
            </div>
          </div>
        </VForm>
        <div v-if="errMessage"
          class="flex justify-center items-center font-semibold space-x-2 w-full text-center text-xs border p-2 bg-red-100 text-red-400 mt-4">
          <img src="@/assets/icons/error.svg" alt="" />
          <p>{{ errMessage }}</p>
        </div>
        <div class="">
          <div class="shadow-md bg-color-pri text-[17px] text-center text-white rounded-custom-10 p-5 mt-4">
            My last week report
          </div>
          <div v-if="errMessage2"
            class="flex justify-center items-center font-semibold space-x-2 w-full text-center text-xs border p-2 bg-red-100 text-red-400 mt-4">
            <img src="@/assets/icons/error.svg" alt="" />
            <p>{{ errMessage2 }}</p>
          </div>
          <div v-for="(item, index) in allUserReport" :key="index">
            <!-- <NuxtLink :to="`/report/detail?id=${item.generatedReportCode}`"> -->
            <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 px-2 py-2 mt-4">
              <div class="flex py-3 px-2">
                <div>
                  <NuxtIcon name="build" filled="" class="mr-3 bg-color-body rounded-full w-16 h-16" />
                </div>
                <div>
                  <p class="mt-1 mb-2 font-bold">{{ item.submitDate }}</p>
                  <div class="flex">
                    <p class="font-normal">(4) Symptoms Reported</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- </NuxtLink> -->
          </div>
        </div>
      </div>
    </div>

    <!-- <h1 class="text-center mt-4 mb-2">Fever Chart</h1>
    <div class="shadow-md bg-white font-bold text-[17px] text-black rounded-custom-10 mx-3 px-2 py-2 mt-4">
      <img src="~/assets/images/fever.jpg" />
    </div> -->

  </div>
</template>

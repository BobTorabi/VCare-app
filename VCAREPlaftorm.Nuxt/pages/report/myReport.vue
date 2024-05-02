<script setup>
// Composables
const { getAllUserReportByFilter } = useReport();

const initialValues = reactive({
  startDate: "",
});

// States
const loading = ref(true);
const errMessage = ref();
const allUserReport = ref('');

// Logics
const handleFormSubmit = (form) => {
  errMessage.value = "";
  if (!form.startDate || !form.startDate) {
    errMessage.value = 'Select date is required.'
    return
  } else {
    //console.log(form.startDate);
    cookiestartDate.value = form.startDate;
    authstartDate.value = cookiestartDate.value;
    router.push("/report/body");
  }
}

// Get All User Report
const handleGetAllUserReport = () => {
  getAllUserReportByFilter()
    .then(async (r) => {
      if (r.status === 200) {
        errMessage.value = null;
        allUserReport.value = await r.data;
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}
handleGetAllUserReport();

</script>
<template>
  <div class="pb-[140px]">

    <Head>
      <Title>My report</Title>
    </Head>
    <div class="px-4">
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
    </div>

    <div class="shadow-md bg-white font-bold text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
      <SharedLoading v-if="loading" />
      <div v-if="!loading">
        <div v-for="(item, index) in allUserReport.records" :key="index">
          <NuxtLink :to="`/report/detail?id=${item.generatedReportCode}`">
            <div class="flex justify-between border-b py-3 px-2">
              <p>{{ item.reportDate }}</p>
              <p class="font-normal">({{ item.reports.length }})</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

    <h1 class="text-center mt-4 mb-2">Fever Chart</h1>
    <div class="shadow-md bg-white font-bold text-[17px] text-black rounded-custom-10 mx-3 px-2 py-2 mt-4">
      <img src="~/assets/images/fever.jpg" />
    </div>

  </div>
</template>

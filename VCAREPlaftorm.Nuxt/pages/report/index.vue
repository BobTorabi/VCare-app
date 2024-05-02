<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const router = useRouter();
const cookieReportDate = useCookie("reportDate");
const { authReportDate } = useAuth();

const initialValues = reactive({
  reportDate: "",
});

// States
const loading = ref(false);
const errMessage = ref();

// Logics
const handleFormSubmit = (form) => {
  errMessage.value = "";
  if (!form.reportDate) {
    errMessage.value = 'Report date is required.'
    return
  } else {
    //console.log(form.reportDate);
    cookieReportDate.value = form.reportDate;
    authReportDate.value = cookieReportDate.value;
    router.push("/report/body");
  }
}

// disable date picker
const getLastWeeksDate = () => {
  const now = new Date();

  return new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7,
  );
}
</script>
<template>
  <div class="pb-[90px]">

    <Head>
      <Title>Report</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <div class="text-[17px]">

      <div class="shadow-sm bg-white py-4 px-4 rounded-lg mx-3 min-h-[400px]">
        <div class="text-lg mt-1 leading-7">
          <p>
            Select the date that you want to add symptoms report:
          </p>
        </div>
        <SharedLoading v-if="loading" />
        <div v-if="!loading" class="text-center mt-5 mb-2">
          <VForm :validation-schema="schema1" :initial-values="initialValues" @submit="handleFormSubmit">
            <ElementsVDatePickerInput v-model="reportDate" name="reportDate" label="Report date" :min="getLastWeeksDate()"
              :max="new Date()" :autoApply="true" />
            <button class="bg-color-pri text-white w-full rounded-lg text-center p-3 mt-4 block" type="submit">
              Continue
            </button>
          </VForm>
          <div v-if="errMessage"
            class="flex justify-center items-center font-semibold space-x-2 w-full text-center text-xs border p-2 bg-red-100 text-red-400 mt-4">
            <img src="@/assets/icons/error.svg" alt="" />
            <p>{{ errMessage }}</p>
          </div>
        </div>
        <!-- <button class="bg-color-pri text-white w-full rounded-lg text-center py-3 mt-4">Next Step</button> -->
      </div>

    </div>
  </div>
</template>

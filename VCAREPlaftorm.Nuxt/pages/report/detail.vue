<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getUserReporByGeneratedReportCode } = useReport();
const route = useRoute()

// States
const loading = ref(true);
const errMessage = ref();
const posts = ref('');

// Logics
// get User Report By Generated Report Code
const handleGetUserReporByGeneratedReportCode = () => {
  getUserReporByGeneratedReportCode(route.query.id)
    .then(async (r) => {
      if (r.status === 200) {
        errMessage.value = null;
        posts.value = await r.data;
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}
handleGetUserReporByGeneratedReportCode();

</script>
<template>
  <div class="pb-[90px]">

    <Head>
      <Title>Report</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <div class="text-[17px]">
      <SharedLoading v-if="loading" />
      <div v-if="!loading">
        <div v-if="posts && posts.reports && posts.reports.length > 0">
          <div class="shadow-md text-color-green bg-white font-medium rounded-custom-10 mx-3 px-5 py-4 mt-4">
            <p class="text-base flex leading-7 items-center justify-center">
              <NuxtIcon name="reader-outline-blue" filled="" class="mr-2" />
              Date: {{ posts.reportDate }}
            </p>
          </div>
          <div v-for="post in posts.reports" :key="index"
            class="shadow-md bg-white font-bold text-[17px] text-black rounded-custom-10 mx-3 px-2 py-2 mt-4">
            <div class="border-b py-3 leading-7 bg-color-pri text-white rounded-custom-10 px-2">
              <p class="text-center">
                {{ post.organName }}
              </p>
            </div>
            <div v-for="item in post.organSymptoms" :key="index" class="border-b py-3 px-2">
              <div class="flex justify-between items-center">
                <div>{{ item.organSymptomName }}</div>
                <div class="font-normal">
                  <NuxtIcon name="check-mark" filled="" class="ml-2 bg-color-yellow rounded-full w-8 h-8" />
                </div>
              </div>
              <div class="font-normal flex">
                <div v-for="organSymptomType in item.organSymptomTypeReoprts" :key="index">
                  <div v-if="organSymptomType.symptomTypeCode != 'check'" class="pt-1 mr-5">
                    {{ organSymptomType.symptomTypeCode }} ({{ organSymptomType.value }})
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

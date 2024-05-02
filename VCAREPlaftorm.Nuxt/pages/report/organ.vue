<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getAllOrgan } = useReport();
const { authUser } = useAuth();
const route = useRoute()

// States
const loading = ref(true);
const organs = ref();
const stepTitle = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
const step = 2;
const errMessage = ref(null);
const genderFlag = ref(true);

//Logic
// Get all organ
getAllOrgan(route.query.bodyPartId)
  .then(async (r) => {
    if (r.status === 200) {
      errMessage.value = null;
      organs.value = await r.data;
    } else if (r.status == 500) {
      errMessage.value = r.messages[0];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

onMounted(() => {
  if (authUser.value.gender != null) {
    genderFlag.value = authUser.value.gender;
  }
});

</script>
<template>
  <div class="pb-[90px]">

    <Head>
      <Title>Report</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <div class="text-[17px]">
      <SharedProgressBar :step=step :titles="stepTitle" />
      <div class="shadow-sm bg-white py-4 px-4 rounded-lg mx-3">
        <div class="text-lg mt-1 leading-7">
          <p>
            Select the organ that are related to the image below
          </p>
        </div>
        <div class="text-center mt-5 mb-4 relative">
          <template v-if="route.query.bodyPartId == '1'">
            <template v-if="genderFlag == true">
              <img src="~/assets/images/man-detail-1.png" class="mx-auto mb-1 w-40" alt="" />
            </template>
            <template v-else>
              <img src="~/assets/images/man-detail-1-woman.png" class="mx-auto mb-1 w-40" alt="" />
            </template>
          </template>
          <template v-else-if="route.query.bodyPartId == '5'">
            <img src="~/assets/images/man-detail-4.png" class="mx-auto mb-1 w-40" alt="" />
          </template>
          <template v-else-if="route.query.bodyPartId == '4'">
            <img src="~/assets/images/man-detail-3.png" class="mx-auto mb-1 w-40" alt="" />
          </template>
          <template v-else-if="route.query.bodyPartId == '2'">
            <template v-if="genderFlag == true">
              <img src="~/assets/images/man-detail-2-1.png" class="mx-auto mb-1 w-48" alt="" />
            </template>
            <template v-else>
              <img src="~/assets/images/man-detail-2-1-women.png" class="mx-auto mb-1 w-48" alt="" />
            </template>
          </template>
          <template v-else-if="route.query.bodyPartId == '3'">
            <img src="~/assets/images/man-detail-5.png" class="mx-auto mb-1 w-48" alt="" />
          </template>
          <template v-else-if="route.query.bodyPartId == '6'">
            <img src="~/assets/images/man-detail-6.png" class="mx-auto mb-1 h-[200px]" alt="" />
          </template>
          <template v-else-if="route.query.bodyPartId == '7'">
            <img src="~/assets/images/man-detail-7.png" class="mx-auto mb-1 h-[200px]" alt="" />
          </template>
          <template v-else-if="route.query.bodyPartId == '8'">
            <img src="~/assets/images/man-detail-2-2.png" class="mx-auto mb-1 w-48" alt="" />
          </template>
        </div>

        <SharedLoading v-if="loading" />
        <div v-if="!loading" class="grid grid-cols-2 gap-2">
          <NuxtLink v-for="(organsItem, index) in organs" :key="index" :to="`/report/symptoms?organId=${organsItem.id}`"
            class="bg-color-pri text-white w-full rounded-lg text-center py-3">
            {{ organsItem.title }}
          </NuxtLink>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getAllBodyPart } = useReport();
const { authUser } = useAuth();

// States
const loading = ref(true);
const errMessage = ref();
const stepTitle = ['Step 1', 'Step 2', 'Step 3', 'Step 4'];
const step = 1;
const records = reactive({
  head: '',
  rightHand: '',
  leftHand: '',
  upperBody: '',
  lowerBody: '',
  leftLeg: '',
  rightLeg: '',
});
const genderFlag = ref(true);

// Logics
// get all Body Part
getAllBodyPart()
  .then(async (r) => {
    if (r.status === 200) {
      errMessage.value = null;
      //posts.value = await r.data;
      //console.log(records);
      records.head = r.data.filter(
        (item) => item.code === 'Head',
      )
      records.rightHand = r.data.filter(
        (item) => item.code === 'Right_Hand',
      )
      records.leftHand = r.data.filter(
        (item) => item.code === 'Left_Hand',
      )
      records.upperBody = r.data.filter(
        (item) => item.code === 'Upper_Body',
      )
      records.lowerBody = r.data.filter(
        (item) => item.code === 'Lower_Body',
      )
      records.leftLeg = r.data.filter(
        (item) => item.code === 'Left_Foot',
      )
      records.rightLeg = r.data.filter(
        (item) => item.code === 'Right_Leg',
      )
      records.middelBody = r.data.filter(
        (item) => item.code === 'Middel_Body',
      )
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
            Click On the parts of your body that have
            symptoms in the image below
          </p>
          <!-- <p>
            click on the icon
            <img src="~/assets/images/sync.png" class="mx-2 inline" alt="" />
            to change to back or
            front view of the body
          </p> -->
        </div>
        <SharedLoading v-if="loading" />
        <div v-if="!loading" class="text-center mt-5 mb-2 relative min-h-[450px]">

          <template v-if="records && records.head.length">
            <NuxtLink :to="`/report/organ?bodyPartId=${records.head[0].id}`">
              <template v-if="genderFlag == true">
                <img src="~/assets/images/man-head.png" class="mx-auto mb-1" alt="" />
              </template>
              <template v-else>
                <img src="~/assets/images/man-head-woman.png" class="mx-auto mb-1" alt="" />
              </template>

            </NuxtLink>
          </template>
          <div class="flex justify-center">
            <template v-if="records && records.leftHand.length">
              <NuxtLink :to="`/report/organ?bodyPartId=${records.leftHand[0].id}`">
                <template v-if="genderFlag == true">
                  <img src="~/assets/images/man-left-hand.png" class="mt-3" alt="" />
                </template>
                <template v-else>
                  <img src="~/assets/images/man-left-hand-woman.png" class="mt-3" alt="" />
                </template>
              </NuxtLink>
            </template>
            <div>
              <template v-if="records && records.upperBody.length">
                <NuxtLink :to="`/report/organ?bodyPartId=${records.upperBody[0].id}`">
                  <template v-if="genderFlag == true">
                    <img src="~/assets/images/man-body-top-1.png" class="mb-1" alt="" />
                  </template>
                  <template v-else>
                    <img src="~/assets/images/man-body-top-1-woman.png" class="mb-1" alt="" />
                  </template>
                </NuxtLink>
              </template>
              <template v-if="records && records.middelBody.length">
                <NuxtLink :to="`/report/organ?bodyPartId=${records.middelBody[0].id}`">
                  <template v-if="genderFlag == true">
                    <img src="~/assets/images/man-body-top-2.png" class="" alt="" />
                  </template>
                  <template v-else>
                    <img src="~/assets/images/man-body-top-2-woman.png" class="" alt="" />
                  </template>
                </NuxtLink>
              </template>
            </div>
            <template v-if="records && records.rightHand.length">
              <NuxtLink :to="`/report/organ?bodyPartId=${records.rightHand[0].id}`">
                <template v-if="genderFlag == true">
                  <img src="~/assets/images/man-right-hand.png" class="mt-3" alt="" />
                </template>
                <template v-else>
                  <img src="~/assets/images/man-right-hand-woman.png" class="mt-3" alt="" />
                </template>
              </NuxtLink>
            </template>
          </div>
          <div class="absolute inset-0 mx-auto my-auto w-24" :class="{
            'top-[195px]': genderFlag == true,
            'top-[203px]': genderFlag == false,
          }">
            <template v-if="records && records.lowerBody.length">
              <NuxtLink :to="`/report/organ?bodyPartId=${records.lowerBody[0].id}`">
                <img src="~/assets/images/man-body-bottom.png" class="mx-auto" alt="" />
              </NuxtLink>
            </template>
            <div class="flex justify-center">
              <template v-if="records && records.leftLeg.length">
                <NuxtLink :to="`/report/organ?bodyPartId=${records.leftLeg[0].id}`">
                  <img src="~/assets/images/man-left-leg.png" class="mt-1" alt="" />
                </NuxtLink>
              </template>
              <template v-if="records && records.rightLeg.length">
                <NuxtLink :to="`/report/organ?bodyPartId=${records.rightLeg[0].id}`">
                  <img src="~/assets/images/man-right-leg.png" class="mt-1" alt="" />
                </NuxtLink>
              </template>
            </div>
          </div>
          <!-- <div v-if="posts && posts.reports.length > 0">
            <h1 class="mt-52 mb-2 font-bold">Today User Report</h1>
            <div class="bg-gray-100 rounded-lg px-1 pt-2 pb-1 text-sm">
              <div class="flex mb-2">
                <div class="bg-gray-300 p-2 mx-1 flex-1">Organ</div>
                <div class="bg-gray-300 p-2 mx-1 flex-1">Symptom</div>
                <div class="bg-gray-300 p-2 mx-1 flex-1">Severity</div>
              </div>
              <div v-for="(post, index) in posts.reports" :key="index">
                <div class="flex mb-2">
                  <div class="bg-white p-2 mx-1 flex-1 flex justify-center items-center">{{ post.organName }}</div>
                  <div class="bg-white p-2 mx-1 flex-1 flex justify-center items-center">{{ post.organSymptomName }}</div>
                  <div class="bg-white p-2 mx-1 flex-1 flex justify-center items-center">
                    <template v-if="post.value == 1">
                      <img src="~/assets/images/true.png" class="mx-auto" alt="" />
                    </template>
                    <template v-else>
                      {{ post.value }}
                    </template>
                  </div>
                </div>
              </div>
            </div>
          </div> -->

        </div>
        <!-- <button class="bg-color-pri text-white w-full rounded-lg text-center py-3 mt-4">Next Step</button> -->
      </div>
      <div v-if="!loading">
        <ReportTodayUserReport />
      </div>
    </div>
  </div>
</template>

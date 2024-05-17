<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const route = useRoute();

// States
const loading = ref(false);

// Logics

</script>
<template>
  <div class="pb-[100px]">

    <Head>
      <Title>Result</Title>
    </Head>

    <div class="shadow-md bg-white text-[17px] text-black rounded-custom-10 mx-4 px-2 py-2 mt-4">
      <SharedLoading v-if="loading" class="mb-6" />
      <div v-if="!loading" class="p-4">
        <div class="text-lg mt-1 leading-7">
          <h1>
            Your report has been received, You can select another symptoms:
          </h1>
        </div>

        <div class="flex mt-4 flex-col">
          <NuxtLink to="/questions" class="border border-color-pri text-color-pri w-full rounded-lg text-center py-3">
            Add other symptoms
          </NuxtLink>
          <NuxtLink :to="`/`">
            <div class="bg-color-pri text-white w-full rounded-lg text-center p-3 pb-4 mt-4 block">
              Home page
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
  middleware: "logged-in",
});

// States
const tab = ref(0);
const tabs = [
  'فروشگاه لوازم خودرویی',
]

</script>
<template>
  <div class="w-full farsi-num">

    <Head>
      <Title>سفارشات من</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <div class="flex flex-col gap-2 w-full">

      <!-- Banner -->
      <!-- <ProfileBanner class="hidden lg:flex" /> -->

      <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold ">
        <img src="/icons/arrow-right.svg" alt="">
        <p>بازگشت</p>
      </NuxtLink>

      <!-- Tabs -->
      <ProfileTabs v-model="tab" :titles="tabs" />

      <!-- Fines Details -->
      <div v-if="tab == 0" class="w-full flex justify-center border rounded-md p-5">
        <div class="flex flex-col gap-8 items-center justify-center h-96">
          <NuxtIcon class="w-96 text-gray-100" name="under-develop" />
          <div class="flex flex-col items-center gap-3">
            <h5 class="font-bold">
              این صفحه در حال توسعه است...
            </h5>
            <h5 class="font-bold">
              از صبر و شکیبایی شما سپاسگزاریم.
            </h5>
          </div>
          <NuxtLink to="/profile" class="bg-brand-blue text-white py-3 px-8 rounded-md">
            بازگشت به داشبورد
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

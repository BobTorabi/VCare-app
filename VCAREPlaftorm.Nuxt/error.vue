<script setup>
const router = useRouter();

const props = defineProps({
  error: Object,
});

const handleError = () => clearError({ redirect: "/" });
const handleHistoryBack = () => {
  router.go(-1);
};
</script>

<template>
  <NuxtLayout>

    <Head>
      <Title>404</Title>
      <Meta name="description" content="خطای 404" />
    </Head>

    <!-- 400 -->
    <div class="container mx-auto py-10 mb-10 lg:mb-0">
      <div class="w-full rounded-md">
        <div class="container mx-auto flex flex-col pt-8 pb-16 md:pb-2 justify-center items-center py-24">
          <img src="/images/error404.png" class="object-contain relative my-5" alt="" />
          <div class="flex flex-row gap-2 justify-center items-center">
            <button @click="handleError"
              class="bg-color-green w-2/4 shadow-md hidden md:block text-white px-4 rounded-md py-2 my-3">
              Home page
            </button>
            <button @click="handleHistoryBack"
              class="flex border border-color-green w-2/4 shadow-md text-color-green px-4 rounded-md py-2 my-3">
              Previous page
              <nuxt-icon class="self-center text-color-green mx-2 w-2" name="arrow-right" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 500 -->
    <!-- <div class="xl:container mx-auto py-10 mb-10 lg:mb-0 ">
      <div class="border w-full rounded-md shadow-md mx-3 md:mx-10">
        <div 
          class="container mx-auto flex flex-col pt-8 pb-16 md:pb-2 justify-center items-center py-24"
        >
          <h1 class="text-lg font-bold my-2">صفحه مورد نظر شما پیدا نشد!</h1>
          <img src="/images/error500.png" class="object-contain relative my-5" alt="" />
          <div class="flex flex-row gap-2 justify-center items-center">
            <button
              @click="handleError"
              class="bg-color-green w-2/4 shadow-md hidden md:block text-white px-4 rounded-md py-2 my-3"
            >
              صفحه اصلی
            </button>
            <button
              @click="handleHistoryBack"
              class="flex border border-color-green w-2/4 shadow-md text-color-green px-4 rounded-md py-2 my-3"
            >
              صفحه قبلی 
              <nuxt-icon
                class=" self-center text-color-green mr-2 w-2"
                name="arrow-left"
              />
            </button>
          </div>
        </div>
      </div>
    </div> -->
  </NuxtLayout>
</template>

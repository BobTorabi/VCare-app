<script setup>
definePageMeta({
  middleware: "logged-in",
});

// Composables
const { getLastArticle } = useLibrary();
const cookieStep = useCookie("userStep");

// States
const loading = ref(false);
const errMessage = ref();
const posts = ref();
cookieStep.value = 0;

// Logics
getLastArticle()
  .then(async (r) => {
    if (r.status === 200) {
      errMessage.value = null;
      posts.value = await r.data.records;
      //console.log(posts);
    } else if (r.status == 500) {
      errMessage.value = r.messages[0];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

</script>
<!-- <script setup>
// States
const currentSlide = ref(1);
const slides = [
  {
    Image: "/images/buy-sell-car.png",
    h1: "سریع و به قیمت",
    h2: "ماشینت رو بفروش",
    p: "فروش بی دغدغه خودرو را با ایرانی کار تجربه کنید",
  },
  {
    Image: "/images/mainSlider-inspection.gif",
    h1: "کارشناسی خودرو تخصصی ایرانی کار",
    h2: "قبل از خرید ماشین، یه زنگ به ما بزن",
    p: "کارشناسی رنگ و بدنه، کارشناسی فنی و آپشن ها، تنظیم قولنامه قانونی، مشاوره و قیمت گذاری",
  },
];
</script> -->

<template>
  <div class="pb-[140px]">

    <Head>
      <Title>Home</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>

    <DashboardDate />

    <NuxtLink to="/message">
      <div
        class="shadow-md bg-white text-color-green rounded-custom-10 mx-3 px-5 py-7 mt-4 bg-[url('~/assets/images/message.png')] bg-no-repeat bg-center">
        <p class="text-xl font-bold">Message</p>
        <p class="text-base">Welcome to Vcare !</p>
      </div>
    </NuxtLink>

    <!-- <div class="shadow-md bg-white text-color-green rounded-custom-10 mx-3 px-5 py-4 mt-4">
      <p class="text-base flex leading-6">
        <NuxtIcon name="play-circle-outline" filled="" class="mr-2" />
        Replay the Intro
      </p>
    </div> -->

    <!-- <div v-if="posts"
      class="shadow-md bg-white text-color-green rounded-custom-10 mx-3 px-5 py-7 mt-4 bg-[url('~/assets/images/article.png')] bg-no-repeat bg-right">
      <template v-for="(post, index) in posts" :key="index">
        <NuxtLink :to="'/library/details?id=' + post.id">
          <p class="text-xl font-bold">Today's Article</p>
          <p class="text-base">
            {{ post.title }}
          </p>
        </NuxtLink>

      </template>
</div> -->

    <NuxtLink to="/report">
      <div class="shadow-md bg-color-aux text-white rounded-custom-10 mx-3 px-5 py-4 mt-4">
        <p class="text-base flex leading-7">
          <NuxtIcon name="reader-outline" filled="" class="mr-2" />
          Take your today's report
        </p>
      </div>
    </NuxtLink>

    <!-- Main Carousel -->
    <!-- <SharedCarousel
      v-model="currentSlide"
      :slidesNo="slides.length"
      :height="'h-96'"
      :autoPlay="true"
      class="px-5"
    >
      <SharedSlide v-for="(slide, index) in slides" :key="index" name="fade">
        <div v-if="currentSlide === index + 1">
          <div class="flex justify-center" v-if="currentSlide === 3">
            <div class="relative md:hidden">
              <img class="object-cover" :src="slide.Image2" :alt="slide.h1" />
              <NuxtLink
                to="https://ehsan.charity/?utm_source=IraneCarV2.com&utm_medium=TopBannerCharity"
                target="_blank"
                class="absolute left-20 bottom-0 sm:bottom-3 py-2 px-8 shadow w-auto rounded-custom-10 text-white bg-color-green z-20"
              >
                <p>همراه شو عزیز</p>
              </NuxtLink>
            </div>
            <div class="hidden relative md:block md:h-96 xl:hidden">
              <img
                class="object-cover h-full"
                :src="slide.Image1"
                :alt="slide.h1"
              />
              <NuxtLink
                to="https://ehsan.charity/?utm_source=IraneCarV2.com&utm_medium=TopBannerCharity"
                target="_blank"
                class="absolute left-24 bottom-16 py-2 px-8 shadow w-auto rounded-custom-10 text-white bg-color-green z-50"
              >
                <p>همراه شو عزیز</p>
              </NuxtLink>
            </div>
            <div class="relative hidden xl:block md:h-96">
              <img
                class="object-cover h-full"
                :src="slide.Image3"
                :alt="slide.h1"
              />
              <NuxtLink
                to="https://ehsan.charity/?utm_source=IraneCarV2.com&utm_medium=TopBannerCharity"
                target="_blank"
                class="absolute left-56 bottom-5 py-2 px-16 text-xl shadow w-auto rounded-custom-10 text-white bg-color-green z-50"
              >
                <p>همراه شو عزیز</p>
              </NuxtLink>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col md:flex-row justify-center items-center gap-5"
          >
            <div class="md:w-1/2 flex justify-center items-center max-h-96">
              <img
                class="object-cover h-56 md:h-64 lg:h-96"
                :src="slide.Image"
                :alt="slide.h1"
              />
            </div>
            <div
              class="md:w-1/2 flex flex-col space-y-3 pl-0 md:pl-10 text-center md:text-right"
            >
              <h1 class="text-lg md:text-2xl font-extrabold">{{ slide.h1 }}</h1>
              <h2 class="text-md md:text-2xl font-extrabold">
                <span class="text-color-green">{{ slide.h2 }}</span>
              </h2>
              <p class="hidden md:block leading-8">{{ slide.p }}</p>

              <div
                v-if="index === 0"
                class="flex gap-3 z-20 justify-center text-left"
              >
                <NuxtLink
                  to="https://carinfo.sapoco.com/VehiclePrice/Transaction"
                  target="_blank"
                  class="py-2 px-8 shadow w-auto rounded-custom-10 text-white bg-color-green"
                >
                  <p>ثبت درخواست</p>
                </NuxtLink>
              </div>
              <div
                v-if="index === 1"
                class="flex gap-3 z-20 justify-center text-left"
              >
                <NuxtLink
                  to="/inspection"
                  class="py-2 px-3 shadow w-auto rounded-custom-10 text-white bg-color-green"
                >
                  <p>درخواست کارشناسی</p>
                </NuxtLink>
              </div>
              <div v-if="index === 3" class="flex gap-3 z-20">
                <NuxtLink
                  to="https://apppwa.sapoco.com/Home"
                  target="_blank"
                  class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-custom-10 bg-white"
                >
                  <img class="w-8" src="/images/bxl_apple.png" alt="" />
                  <p>وب اپ</p>
                </NuxtLink>
                <NuxtLink
                  to="https://cafebazaar.ir/app/com.iranecar.club"
                  target="_blank"
                  class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-custom-10 bg-white"
                >
                  <img class="w-8" src="/images/cafe-bazar.png" alt="" />
                  <p>بازار</p>
                </NuxtLink>
                <NuxtLink
                  to="https://myket.ir/app/com.iranecar.club"
                  target="_blank"
                  class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-custom-10 bg-white"
                >
                  <img class="w-8" src="/images/myket.png" alt="" />
                  <p>مایکت</p>
                </NuxtLink>
              </div>
              <div
                v-if="index === 4"
                class="flex gap-3 z-20 justify-center text-left"
              >
                <NuxtLink
                  to="/inquiry"
                  class="py-2 px-3 shadow w-auto rounded-custom-10 text-white bg-brand-blue-light"
                >
                  <p>استعلامات خودروی من</p>
                </NuxtLink>
              </div>
              <div
                v-if="index === 5"
                class="flex gap-3 z-20 justify-center text-left"
              >
                <NuxtLink
                  to="https://club.sapoco.com/"
                  class="py-2 px-3 shadow w-auto rounded-custom-10 text-black bg-yellow-400"
                >
                  <p>ورود به باشگاه مشتریان</p>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </SharedSlide>
    </SharedCarousel> -->

    <!-- Grid FastLink Boxes -->
    <!-- <SharedFastLinkBoxes /> -->

    <!-- Payment Services -->
    <!-- <SharedPaymentServices /> -->

    <!-- Shop Services -->
    <!-- <SharedShopServices /> -->

    <!-- Sale Car Services -->
    <!-- <SharedCarServices /> -->

    <!-- App Install CTA -->
    <!-- <SharedAppCta /> -->

    <!-- blog -->
    <!-- <SharedBlog /> -->

    <!-- Customer Club -->
    <!-- <SharedCustomerClub /> -->

    <!-- User comments -->
    <!-- <SharedComments /> -->
  </div>
</template>

<script setup>
const data = [
  {
    linkTo: "/inquiry/fines-details",
    svgName: "fines-details",
    h1: "خلافی خودرو",
    p: "برای استعلام و پرداخت آسان، سریع و ایمن خلافی خودرو از این بخش اقدام کنید.",
  },
  {
    linkTo: "/inquiry/fines-accumulation",
    svgName: "fines-accumulation",
    h1: "تجمیع خلافی خودرو",
    p: "برای صرفه جویی در زمان، نسبت به تسویه تخلفات خودروی‌تان به صورت یکجا اقدام کنید.",
  },
  {
    linkTo: "/inquiry/negative-score",
    svgName: "negative-score",
    h1: "نمره منفی گواهینامه",
    p: "با ورود به این بخش می‌توانید نمره منفی گواهی نامه خود را استعلام کنید.",
  },
  {
    linkTo: "/inquiry/pelak-status",
    svgName: "pelak-status",
    h1: "وضعیت پلاک‌ها",
    p: "برای اطلاع از آخرین وضعیت پلاک‌های فعال یا فک شده خود از طریق ثبت کد ملی اقدام کنید.",
  },
  {
    linkTo: "/inquiry/licence-status",
    svgName: "licence-status",
    h1: "وضعیت گواهینامه",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
];
</script>

<template>
  <div class="xl:container mx-auto px-5 leading-7">
    <div
      class="flex flex-col-reverse gap-5 lg:flex-row md:justify-between md:items-center py-10"
    >
      <div class="lg:w-1/2 grid md:grid-cols-3 gap-5">
        <NuxtLink
          v-for="(item, index) in data"
          :key="index"
          :to="item.linkTo"
          class="flex md:flex-col justify-between space-y-2 bg-white hover:bg-blue-50 border rounded-md p-4 shadow-md md:hover:-translate-y-3 transition ease-in-out duration-150"
        >
          <div class="flex items-center gap-2">
            <div class="w-9 p-2 bg-blue-200 rounded-full">
              <img :src ='`/icons/${item.svgName}.svg`' alt="" />
            </div>
            <h3 class="font-semibold">{{ item.h1 }}</h3>
          </div>
          <p class="hidden md:block text-justify">
            {{ item.p }}
          </p>
          <nuxt-icon class="w-4 md:self-end text-blue-500" name="arrow-left" />
        </NuxtLink>
        <NuxtLink
          to="/inquiry"
          class="text-brand-red md:text-black flex flex-col justify-between space-y-3 bg-white hover:bg-blue-50 border rounded-md p-4 shadow-md hover:-translate-y-3 transition ease-in-out duration-150"
        >
          <div></div>
          <h3 class="font-semibold self-center">مشاهده همه</h3>
          <img
            class="w-4 hidden md:flex self-end"
            src="/icons/arrow-left.svg"
            alt=""
          />
        </NuxtLink>
      </div>
      <NuxtLink
        to="/inquiry"
        class="lg:w-1/2 flex flex-col md:items-center text-blue-700 text-xl md:text-2xl font-extrabold"
      >
        <h2>سرویس های استعلام و پرداخت</h2>
        <img class="hidden md:block w-80" src="/images/first.png" alt="" />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const data = [
  {
    active: true,
    linkTo: "/inquiry/fines-details",
    svgName: "fines-details",
    h1: "خلافی خودرو",
    p: "برای استعلام و پرداخت آسان، سریع و ایمن خلافی خودرو از این بخش اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/fines-accumulation",
    svgName: "fines-accumulation",
    h1: "تجمیع خلافی خودرو",
    p: "برای صرفه جویی در زمان، نسبت به تسویه تخلفات خودروی‌تان به صورت یکجا اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/negative-score",
    svgName: "negative-score",
    h1: "نمره منفی گواهینامه",
    p: "با ورود به این بخش می‌توانید نمره منفی گواهی نامه خود را استعلام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/pelak-status",
    svgName: "pelak-status",
    h1: "وضعیت پلاک‌ها",
    p: "برای اطلاع از آخرین وضعیت پلاک‌های فعال یا فک شده خود از طریق ثبت کد ملی اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/licence-status",
    svgName: "licence-status",
    h1: "وضعیت گواهینامه",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/card-sanad",
    svgName: "card-sanad",
    h1: "کارت و سند مالکیت خودرو",
    p: "برای استعلام کارت و سند مالکیت خودرو خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "side-park",
    h1: "پارک حاشیه‌ای",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "traffic-plan",
    h1: "طرح ترافیک",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "annual-toll",
    h1: "عوارض سالیانه خودرو",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "highway-toll",
    h1: "عوارض آزادراهی",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
];
</script>

<template>
  <div
    class="flex flex-col space-y-10 w-full xl:container mx-auto mt-14 leading-7 print:hidden"
  >
    <h1 class="text-2xl font-extrabold text-brand-blue">سایر استعلام‌ها</h1>
    <div class="grid md:grid-cols-3 lg:grid-cols-5 gap-5 md:px-16">
      <NuxtLink
        v-for="(item, index) in data"
        :key="index"
        :to="item.linkTo"
        class="flex md:flex-col justify-between space-y-2 bg-white border rounded-md p-4 shadow-md" :class="item.active? '  hover:bg-blue-50 md:hover:-translate-y-3 transition ease-in-out duration-150' : '' "
      >
        <div class="flex items-center gap-2">
          <div class="w-9 p-2 rounded-full" :class="item.active? 'bg-blue-100': 'bg-gray-100'">
            <img :src ='`/icons/${item.svgName}.svg`' alt="" />
          </div>
          <h3 class="font-semibold" :class="!item.active ? 'text-gray-400' : ''">{{ item.h1 }}</h3>
        </div>
        <p class="hidden md:block text-justify" :class="!item.active ? 'text-gray-400' : ''">
          {{ item.p }}
        </p>
        <nuxt-icon v-if="item.active" class="w-4 md:self-end text-blue-500" name="arrow-left" />
        <p v-else class="md:self-end text-red-700">به زودی</p>
      </NuxtLink>
    </div>
  </div>
</template>
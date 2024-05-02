<script setup>
const data = [
  {
    // linkTo: "https://iranecar.com/icar/sell-car-order",
    linkTo: "https://iranecar.com/#",
    svgName: "car-inspection",
    h1: "فروش خودرو",
    p: "برای فروش خودروی خود کافیست آگهی آن را در نمایشگاه ایرانی‌ کار قرار دهید، تا بهترین خریدار را پیدا کنید.",
  },
  {
    // linkTo: "https://iranecar.com/icar/buy-car-order",
    linkTo: "https://iranecar.com/#",
    svgName: "sale-car",
    h1: "خرید خودرو",
    p: "با ثبت سفارش خرید خودرو در بازار ایرانی‌کار، در کمترین زمان، صاحب خودرو شوید.",
  },
  {
    // linkTo: "https://iranecar.com/icar/filters",
    linkTo: "https://iranecar.com/#",
    svgName: "car-advert",
    h1: "آگهی های خودرو",
    p: "خودروی دلخواهتان را از میان آگهی‌های بازار خودرو ایرانی‌ کار پیدا کنید.",
  },
  {
    linkTo: "/inspection",
    svgName: "car-inspection-new",
    h1: "کارشناسی خودرو",
    p: "ایرانی‌کار با ارائه گواهینامه معتبر کارشناسی، وضعیت سلامت خودرو شمار ا بررسی می‌کند.",
  },
  {
    linkTo: "https://carinfo.iranecar.com/VehiclePrice/Index",
    svgName: "car-price",
    h1: "قیمت روز خودرو",
    p: "روزانه در جریان آخرین قیمت‌های بازار خودرو قرار بگیرید.",
  },
  {
    linkTo: "https://carinfo.iranecar.com/",
    svgName: "car-info",
    h1: "اطلاعات خودرو",
    p: "اطلاعات به‌روز و جذاب خودروهای دنیا را در بانک اطلاعات خودروی ایرانی ‌کار ببینید.",
  },
];
</script>

<template>
  <div class="xl:container mx-auto px-5">
    <div
      class="flex flex-col-reverse gap-5 lg:flex-row md:justify-between md:items-center py-10 leading-7"
    >
      <div class="lg:w-1/2 grid md:grid-cols-3 gap-3 gap-y-4">
        <NuxtLink
          v-for="(item, index) in data"
          :key="index"
          :to="item.linkTo"
          target="_blank"
          class="flex md:flex-col justify-between space-y-3 bg-white hover:bg-red-50 border rounded-md p-4 shadow-md hover:-translate-y-3 transition ease-in-out duration-150"
        >
          <div class="flex items-center gap-2">
            <div class="w-9 p-2 bg-gray-200 rounded-full">
              <img :src="`/icons/${item.svgName}.svg`" alt="" />
            </div>
            <h3 class="font-semibold">{{ item.h1 }}</h3>
          </div>
          <p class="hidden md:block text-justify">
            {{ item.p }}
          </p>
          <nuxt-icon class="w-4 md:self-end text-red-600" name="arrow-left" />
        </NuxtLink>
      </div>
      <NuxtLink
            to="https://iranecar.com/icar/"
        class="lg:w-1/2 flex flex-col gap-5 md:items-center text-xl md:text-2xl font-extrabold"
      >
        <h2 class="">بازار خودرو ایرانی کار</h2>
        <img class="hidden md:block w-80" src="/images/third.png" alt="" />
      </NuxtLink>
    </div>
  </div>
</template>

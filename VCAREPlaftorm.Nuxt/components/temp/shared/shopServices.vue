<script setup>
const data = [
  {
    linkTo: "https://shop.iranecar.com/category/3",
    svgName: "oil",
    h1: "روغن موتور",
    p: "مقایسه برندهای خارجی و داخلی روغن موتور از نظر قیمت و کیفیت و تجربه یک خرید بهتر.",
  },
  {
    linkTo: "https://shop.iranecar.com/category/5",
    svgName: "tire",
    h1: "لاستیک خودرو",
    p: "خرید لاستیک باکیفیت و قیمت مناسب برای خودرو با مقایسه برندهای داخلی و خارجی.",
  },
  {
    linkTo: "https://shop.iranecar.com/category/4",
    svgName: "battery",
    h1: "باتری خودرو",
    p: "انتخاب باتری مناسب خودرو با طول عمر بالا و بدون ایجاد رسوب از برندهای معتبر.",
  },
];
</script>
<template>
  <div class="bg-gray-100 py-10">
    <div
      class="flex flex-col gap-5 lg:flex-row md:justify-between md:items-center md:py-10 xl:container mx-auto px-5 leading-7"
    >
      <NuxtLink
        to="https://shop.iranecar.com"
        target="_blank"
        class="lg:w-1/2 flex flex-col space-y-5 md:items-center text-purple-800 text-xl md:text-2xl font-extrabold"
      >
        <h2 class="">فروشگاه لوازم یدکی و جانبی</h2>
        <img class="hidden md:block w-80" src="/images/second.png" alt="" />
      </NuxtLink>
      <div class="lg:w-1/2 grid md:grid-cols-3 gap-3 gap-y-4">
        <NuxtLink
          v-for="(item, index) in data"
          :key="index"
          :to="item.linkTo"
          target="_blank"
          class="flex md:flex-col justify-between space-y-3 bg-white hover:bg-purple-50 border rounded-md p-4 shadow-md hover:-translate-y-3 transition ease-in-out duration-150"
        >
          <div class="flex items-center gap-2">
            <div class="w-9 p-2 bg-purple-200 rounded-full">
              <img :src="`/icons/${item.svgName}.svg`" alt="" />
            </div>
            <h3 class="font-semibold">{{ item.h1 }}</h3>
          </div>
          <p class="hidden md:block text-justify">
            {{ item.p }}
          </p>
          <nuxt-icon
            class="w-4 md:self-end text-purple-500"
            name="arrow-left"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

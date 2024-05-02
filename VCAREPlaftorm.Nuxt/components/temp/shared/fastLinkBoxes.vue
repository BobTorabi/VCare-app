<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
// const props = defineProps({
//   faqData: Object,
// })
const boxesData = [
  {
    id: 1,
    iconUrl: "/icons/icar.svg",
    iconBg: 'linear-gradient(90deg, rgba(91, 180, 246, 0.1) 0%, rgba(33, 145, 229, 0.1) 61%, rgba(0, 126, 219, 0.1) 100%)',
    borderColor: '#000',
    title: "بازار خودرو",
    subTitle: "خرید و فروش خودرو  ...",
    endPointUrl: 'https://iranecar.com'
  },
  {
    id: 2,
    iconUrl: "/icons/inquiryIcon.png",
    iconBg: 'linear-gradient(90deg, rgba(91, 180, 246, 0.1) 0%, rgba(33, 145, 229, 0.1) 61%, rgba(0, 126, 219, 0.1) 100%)',
    borderColor: '#2766c5',
    title: "سرویس‌های استعلام",
    subTitle: "خلافی خودرو، پلاک‌های فعال و ...",
    endPointUrl: '/inquiry'
  },
  {
    id: 3,
    iconUrl: "/icons/inspectionIcon.png",
    iconBg: 'linear-gradient(90deg, rgba(221, 43, 89, 0.1) 0%, rgba(159, 27, 61, 0.1) 61%, rgba(187, 19, 62, 0.1) 100%)',
    borderColor: '#bb133e',
    title: "کارشناسی خودرو",
    subTitle: "تضمین یک خرید مطمئن",
    endPointUrl: '/inspection'
  },
  {
    id: 4,
    iconUrl: "/icons/shopIcon.png",
    iconBg: 'linear-gradient(90deg, rgba(101, 52, 148, 0.02) 0%, rgba(90, 24, 154, 0.1) 61%, rgba(90, 24, 154, 0.1) 100%)',
    borderColor: '#5a189a',
    title: "فروشگاه لوازم خودرویی",
    subTitle: "بهترین قیمت و کیفیت",
    endPointUrl: 'https://shop.iranecar.com'
  },
  {
    id: 5,
    iconUrl: "/icons/clubIcon.png",
    iconBg: 'linear-gradient(90deg, rgba(255, 210, 96, 0.1) 0%, rgba(255, 213, 105, 0.1) 61%, rgba(252, 195, 49, 0.1) 100%)',
    borderColor: '#fcc331',
    title: "باشگاه مشتریان",
    subTitle: "سبقت بگیر",
    endPointUrl: 'https://club.iranecar.com'
  },
];

</script>

<template>
  <div
    class="w-full grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-center gap-3 p-5 md:px-5 lg:px-48 sm:px-5 md:py-12 bg-gray-100 mt-10">
    <NuxtLink v-for="box in boxesData" :key="box.id" :to="box.endPointUrl"
      class="flex flex-row bg-white w-full xl:w-64  gap-2 rounded-md p-2 shadow-md md:hover:-translate-y-1 transition ease-in-out duration-150 whitespace-nowrap"
      :class="`bg-${box.id}`" :style="`border-left: 20px solid ${box.borderColor};`">
      <span class="flex self-center justify-center w-12 h-max rounded-full"
        :style="`background:${box.iconBg};box-shadow: inset 9.53333px -9.53333px 9.53333px rgba(31, 114, 176, 0.1), inset -9.53333px 9.53333px 9.53333px rgba(255, 255, 255, 0.1)`">
        <img :src="box.iconUrl" class="self-center w-10 p-2" :alt="box.title" />
      </span>
      <div class="flex flex-col w-full items-start justify-center gap-1">
        <h2 class="text-md font-bold text-right">{{ box.title }}</h2>
        <h3 class="text-xs text-right text-gray-500">{{ box.subTitle }}</h3>
      </div>
    </NuxtLink>
  </div>
</template>

<style scoped>
.bg-1:hover {
  background: #5e687720;
}

.bg-2:hover {
  background: #2b70d620;
}

.bg-3:hover {
  background: #d31c4a20;
}

.bg-4:hover {
  background: #7c27d120;
}

.bg-5:hover {
  background: #d9a31b20;
}
</style>
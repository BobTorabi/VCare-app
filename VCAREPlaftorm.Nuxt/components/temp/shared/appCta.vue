<template>
  <div class="flex flex-col items-center bg-gray-100 py-10">
    <div
      class="flex flex-col items-center md:flex-row gap-5 justify-between xl:container mx-auto pb-10 px-5"
    >
      <div>
        <img class="hidden md:flex" src="/images/promotion.png" alt="" />
        <img class="md:hidden" src="/images/small-pro.png" alt="" />
      </div>
      <div class="flex flex-col space-y-3 md:w-1/2">
        <h3 class="font-bold text-base md:text-2xl text-brand-blue">
          اپلیکیشن ایرانی‌کار، همراه همیشگی خودرو شما!
        </h3>
        <p class="leading-8">
          با دانلود اپلیکیشن ایرانی کار به خدمات جامع خودرویی دسترسی داشته
          باشید:
        </p>
        <ul class="list-disc list-inside leading-8 font-semibold">
          <li>استعلام خلافی خودرو</li>
          <li>تجمیع خلافی خودرو</li>
          <li>پارک حاشیه‌ای</li>
          <li>پرداخت عوارض سالیانه خودرو</li>
          <li>اطلاع از قیمت روز خودورها</li>
          <li>استعلام وضعیت پلاک خودرو</li>
          <li>استعلام کارت سند و مالکیت خودرو</li>
        </ul>
        <div class="flex gap-3 z-20">
          <NuxtLink
            to="https://apppwa.iranecar.com/Home"
            target="_blank"
            class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-md bg-white"
          >
            <img class="w-8" src="/images/bxl_apple.png" alt="" />
            <p>وب اپ</p>
          </NuxtLink>
          <!-- <NuxtLink
            to="https://play.google.com/store/apps/details?id=com.iranecar.club"
            target="_blank"
            class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-md bg-white"
          >
            <img class="w-8" src="/images/google-play.png" alt="" />
            <p>پلی استور</p>
          </NuxtLink> -->
          <NuxtLink
            to="https://cafebazaar.ir/app/com.iranecar.club"
            target="_blank"
            class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-md bg-white"
          >
            <img class="w-8" src="/images/cafe-bazar.png" alt="" />
            <p>بازار</p>
          </NuxtLink>
          <NuxtLink
            to="https://myket.ir/app/com.iranecar.club"
            target="_blank"
            class="flex flex-col items-center space-y-1 p-3 shadow w-24 h-20 rounded-md bg-white"
          >
            <img class="w-8" src="/images/myket.png" alt="" />
            <p>مایکت</p>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="flex flex-col justify-center space-y-6 items-center">
      <div class="flex items-center gap-6">
        <NuxtLink
          to="https://www.linkedin.com/company/iranecar"
          target="_blank"
          class="flex items-center gap-2"
        >
          <img class="w-8" src="/images/linkedin.png" alt="" />
        </NuxtLink>
        <NuxtLink
          to="https://www.instagram.com/iranecar"
          target="_blank"
          class="flex items-center gap-2"
        >
          <img class="w-8" src="/images/insta.png" alt="" />
        </NuxtLink>
        <NuxtLink
          to="https://www.aparat.com/iranecar"
          target="_blank"
          class="flex items-center gap-2"
        >
          <img class="w-8" src="/images/aparat.png" alt="" />
        </NuxtLink>
      </div>
      <p class="tracking-[1.4em] -mr-4">iranecar</p>
    </div>
  </div>
</template>

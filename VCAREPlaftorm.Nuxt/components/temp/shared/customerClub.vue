<template>
  <div
    class="flex flex-col space-y-10 py-10 items-center xl:container mx-auto px-5 print:hidden"
  >
    <h4 class="font-semibold text-2xl text-brand-red">
      خودروتو پارک کن جایزه بگیر!
    </h4>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <div
        class="flex flex-col justify-center items-center space-y-2 border shadow-md rounded-md p-4"
      >
        <img class="w-40" src="/images/price.png" alt="" />
        <h5 class="font-semibold text-lg">قرعه کشی فصلی</h5>
        <p class="leading-8 text-justify">
          با حداقل 500 امتیاز در قرعه کشی ایرانی‌کار شرکت و شانس خود را برای
          برنده شدن امتحان کنید. برای اطلاع از جوایز خودرو خود را پارک کنید.
        </p>
      </div>
      <div
        class="flex flex-col justify-center items-center space-y-2 border shadow-md rounded-md p-4"
      >
        <img class="w-20" src="/images/percent.png" alt="" />
        <h5 class="font-semibold text-lg">تخفیف های ویژه</h5>
        <p class="leading-8 text-justify">
          با عضویت در باشگاه مشتریان ایرانی کار از تخفیفات خدمات ایرانی کار بهره
          مند شوید.
        </p>
      </div>
      <div
        class="flex flex-col justify-center items-center space-y-2 border shadow-md rounded-md p-4"
      >
        <img class="w-40" src="/images/basket.png" alt="" />
        <h5 class="font-semibold text-lg">دعوت کن، جایزه بگیر</h5>
        <p class="leading-8 text-justify">
          با معرفی ایرانی کار و دعوت دوستانت کسب امتیاز کن و شانس برنده شدن در
          قرعه کشی ها را افزایش بده.
        </p>
      </div>
      <div
        class="flex flex-col justify-between items-center space-y-2 rounded-md p-4"
      >
        <p class="leading-8 text-justify">
          باشگاه مشتریان ایرانی کار برای تشکر از خانواده ایرانی کار و با هدف
          ارائه خدمات متفاوت به کاربران وفادارش راه‌اندازی شده است. شما
          می‌توانید با عضویت در باشگاه مشتریان ایرانی کار از مزایایی چون
          تخفیفات، شرکت در قرعه کشی‌ها و جوایز ویژه اعضاء باشگاه، اطلاع از
          تخفیف‌ها و جشنواره‌های فروش بهره مند شوید.
        </p>
        <NuxtLink
          class="bg-yellow-400 font-bold w-full rounded-md py-3 text-center"
          to="https://club.iranecar.com"
          target="_blank"
          >باشگاه مشتریان ایرانی‌کار</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup>
const currentComment = ref(1);
const comments = [
  [
    {
      Image: "/images/user.png",
      name: "علی رسولی",
      comment:
        "با سلام و خسته نباشید، من فروشگاه اینترنتی ایرانی کار را بابت قیمت مناسب، کیفیت و پیگیری و سرعت ارسالشون پیشنهاد میدم",
    },
    {
      Image: "/images/user.png",
      name: "حمید مرتضایی",
      comment:
        "توی حوزه قطعات یدکی و روغن موتور فروشگاه ایرانی کار قیمت هاش نسبت به سایت‌های دیگه مناسب تر هست",
    },
    {
      Image: "/images/user.png",
      name: "قاسم رمضانی",
      comment:
        "از فروشگاه ایرانی کار باتری خودرو خریدم، واقعا هم قیمتش نسبت به بازار بهتر بود و هم از سرعت ارسالشون راضی ام",
    },
  ],
  [
    {
      Image: "/images/user.png",
      name: "سهیل فراستی",
      comment:
        "من از فروشگاه ایرانی کار روغن موتور خریدم، پشتیبانی، ارسال و تخفیفشون واقعا خوب بود از این سایت راضی هستم",
    },
    {
      Image: "/images/user.png",
      name: "محسن حدادی",
      comment:
        "سلام ، واقعا خسته نباشید بابت طراحی اپ ایرانی کار، ی پکیج کامله، دیروز تو جاده بنزین ماشینم داشت تموم می‌شد، مسافت نزدیک ترین پمپ بنزین را بهم نشون داد",
    },
    {
      Image: "/images/user.png",
      name: "محمد کاظمی",
      comment:
        "واقعا قیمت‌هایی که توی ایرانی کار اعلام شده نسبت به بازار و ی سری فروشگاه اینترنتی دیگه معقول و منطقی و بهتر هست، از خریدم راضی ام",
    },
  ],
  [
    {
      Image: "/images/user.png",
      name: "امیرعلی محبی",
      comment:
        "سلام، من تو مراحل خرید از فروشگاه ایرانی کار دچار مشکل شده بودم، با پشتیبانی سایتتتون تماس گرفتم، خواستم تشکر کنم که انقدر خوب راهنمایی کردن و با خوش اخلاقی توضیح دادن",
    },
    {
      Image: "/images/user.png",
      name: "مریم کبیری",
      comment:
        "قیمت های سایت ایرانی کار با مقایسه با سایت های دیگه خیلی خوبه تخفیفای خوبی هم توی باشگاه مشتریانش داره، من کاملا راضی هستم و حتما پیشنهاد می‌دم",
    },
    {
      Image: "/images/user.png",
      name: "محمد علی عباسی",
      comment:
        "سلام، لطفا اگه امکان داره خرید اقساطی محصولات سایتتون رو فراهم کنید",
    },
  ],
];
</script>

<template>
  <div class="flex flex-col items-center space-y-10 py-10 px-5">
    <div class="flex">
      <h4 class="font-semibold text-2xl text-brand-red h5">نظرات کاربران</h4>
    </div>
    <!-- Comment Carousel -->
    <SharedCarousel
      v-model="currentComment"
      :slidesNo="comments.length"
      class="flex w-full px-5"
      height="h-56"
      :navigation="false"
    >
      <SharedSlide
        v-for="(comment, index) in comments"
        :key="index"
        name="slide-fade"
      >
        <div
          v-if="currentComment === index + 1"
          class="grid md:grid-cols-3 gap-3"
        >
          <div
            v-for="(item, index) in comment"
            :key="index"
            class="flex flex-col h-60 justify-center items-center space-y-2 border shadow-md rounded-md p-4"
          >
            <div class="w-full flex justify-between items-center">
              <div class="flex gap-3 items-center">
                <img src="/icons/comment.svg" alt="" />
                <p>{{ item.name }}</p>
              </div>
              <img class="w-10" :src="item.Image" alt="" />
            </div>
            <p class="leading-8 text-justify">
              {{ item.comment }}
            </p>
          </div>
        </div>
      </SharedSlide>
    </SharedCarousel>
  </div>
</template>

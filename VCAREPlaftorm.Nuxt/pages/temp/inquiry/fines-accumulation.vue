<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
const faqData = [
  {
    id: 1,
    active: true,
    title: 'آیا امکان مشاهده تجمیع خلافی وجود دارد؟',
    details: `بله، با استفاده از سرویس تجمیع خلافی، شما می توانید کل مبلغ خلافی خود به همراه شما پلاک مرتبط را استعلام نموده و در خصوص پرداخت مبلغ از همان محل اقدام نمائید.`
  },
  {
    id: 2,
    active: false,
    title: 'برای استعلام و پرداخت جرائم رانندگی، چه روش‌هایی وجود داد؟',
    details: `برای استعلام و پرداخت خلافی دو راه وجود دارد، اول: استعلام و پرداخت تجمیعی خلافی خودرو و دوم: استعلام جزئیات تخلفات خودرو با امکان پرداخت موردی`
  },
  {
    id: 3,
    active: false,
    title: `آیا اطلاعات وارد شده باید مربوط به مالک خودرو باشد؟`,
    details: `بله، شماره پلاک، کد ملی و شماره موبایل وارد شده باید متعلق به مالک اصلی خودرو باشد.`
  },
  {
    id: 4,
    active: false,
    title: `آیا امکان گرفتن تجمیع خلافی برای دیگری (غیر) وجود دارد؟`,
    details: `بله، شما می توانید با وارد کردن شماره پلاک، کد ملی و شماره موبایل دیگری و پس از وارد نمودن کد دریافتی توسط ایشان در محل مربوطه، نسبت به دریافت استعلام تجمیع خلافی برای وی اقدام نمائید.`
  },
  {
    id: 5,
    active: false,
    title: `آیا امکان دسترسی به سوابق مربوط به استعلام تجمیع جریمه خودرو وجود دارد؟`,
    details: `بله؛ نتایج کلیه استعلام‌های انجام شده در بخش ایرانی کار من ذخیره می‌شوند و به راحتی می‌توانید به سابقه استعلام‌های قبلی خود به صورت رایگان دسترسی داشته باشید.`
  },
]
</script>

<template>
  <div class="flex flex-col space-y-36 py-8 md:py-14 px-5 lg:px-0 farsi-num">

    <Head>
      <Title>تجمیع خلافی خودرو</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <div class="lg:bg-[url('/icons/city-background.svg')] bg-repeat-x bg-bottom">
      <div class="flex gap-16 xl:container mx-auto justify-between items-end">
        <img class="hidden lg:block lg:w-64" src="/images/car-right.png" alt="" />
        <div class="flex flex-col w-full space-y-3 -mb-12">
          <h1 class="text-2xl font-bold text-brand-blue-light">
            استعلام تجمیع خلافی خودرو
          </h1>
          <p class="leading-8">
            با استعلام تجمیع خلافی خودرو می‌توانید مجموع هزینه خلافی خودرو را
            یکجا مشاهده کنید. برای استفاده از این سرویس کافی است شماره پلاک،
            تلفن همراه مالک و کد ملی مالک خودرو را وارد کنید. هزینه استعلام
            خلافی 5,200 تومان است.
          </p>

          <inquiryFinesAccumulationForm />
        </div>
        <img class="hidden lg:block lg:w-64" src="/images/car-left.png" alt="" />
      </div>
    </div>

    <SharedOtherInquiries />

    <!-- سوالات متداول  FAQ -->
    <SharedFaq class="w-full" :faqData="faqData" />

    <SharedCustomerClub />
  </div>
</template>

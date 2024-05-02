<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
const faqData = [
  {
    id: 1,
    active: true,
    title: 'سرویس استعلام سند و کارت مالکیت چه جزئیاتی را نمایش می‌دهد؟',
    details: `با استفاده از این سرویس می‌توانید برای کارت خودرو جزئیاتی مانند وضعیت کارت (صدور و ...)، تاریخ چاپ کارت و بارکد پستی کارت را استعلام نموده و برای سند خودرو نیز جزئیاتی مانند وضعیت سند (تحويل شده به پست و ...) و تاریخ چاپ سند را مشاهده کنید.`
  },
  {
    id: 2,
    active: true,
    title: 'آیا اطلاعات وارد شده برای استعلام سند و کارت مالکیت، باید مربوط به مالک خودرو باشد؟',
    details: `بله، پلاک خودرو، کد ملی و شماره موبایل وارد شده باید متعلق به مالک اصلی خودرو باشد.`
  },
  {
    id: 3,
    active: true,
    title: `آیا امکان دسترسی به سوابق مربوط به پیگیری کارت خودرو و سند خودرو وجود دارد؟`,
    details: `بله؛ نتایج کلیه استعلام‌های انجام شده در بخش ایرانی کار من ذخیره می‌شوند و به راحتی می‌توانید به استعلام‌های قبلی خود به صورت رایگان دسترسی داشته باشید.`
  },
  {
    id: 4,
    active: true,
    title: `استعلام سرویس سند و کارت مالکیت چگونه انجام می گردد؟`,
    details: `استعلام وضعیت سند و کارت مالکیت خودرو با ورود پلاک خودرو، کد ملی و تلفن همراه مالک خودرو، با مراجعه به سرویس های استعلام و پرداخت، امکان پذیر می باشد.`
  },
  {
    id: 5,
    active: true,
    title: `آیا امکان گرفتن استعلام سند و کارت مالکیت خودور برای دیگری (غیر) وجود دارد؟`,
    details: `بله، شما می توانید با وارد کردن پلاک خودرو، کد ملی و شماره تلفن همراه دیگری و پس از وارد نمودن کد دریافتی توسط ایشان در محل مربوطه، نسبت به دریافت استعلام سند و کارت مالکیت برای وی اقدام نمائید`
  }
]
</script>

<template>
  <Head>
    <Title>وضعیت کارت و سند خودرو</Title>
    <Meta name="description" content="متا دیسکریپشن صفحه اول" />
  </Head>

  <div class="flex flex-col space-y-36 py-8 md:py-14 px-5 md:px-0 farsi-num">
    <div class="lg:bg-[url('/icons/city-background.svg')] bg-repeat-x bg-bottom">
      <div class="flex gap-16 xl:container mx-auto justify-between items-end">
        <img class="hidden lg:block lg:w-64" src="/images/car-right.png" alt="" />
        <div class="flex flex-col space-y-3 -mb-12">
          <h1 class="text-2xl font-bold text-brand-blue-light">
            استعلام وضعیت کارت و سند خودرو
          </h1>
          <p class="leading-8">
            با استعلام وضعیت کارت و سند خودرو می‌توانید جزئیات مربوط به اسناد
            خودرو خود را دریافت کنید. برای استفاده از این سرویس کافی است اطلاعات
            زیر را وارد کنید. هزینه استعلام خلافی 5200 تومان است.
          </p>
          <InquiryCardSanadForm />
        </div>
        <NuxtImg class="hidden lg:block lg:w-64" format="webp" src="/images/car-left-card.png" alt="car inquiry card" />
      </div>
    </div>

    <SharedOtherInquiries />

    <!-- سوالات متداول  FAQ -->
    <SharedFaq class="w-full" :faqData="faqData" />

    <SharedCustomerClub />
  </div>
</template>

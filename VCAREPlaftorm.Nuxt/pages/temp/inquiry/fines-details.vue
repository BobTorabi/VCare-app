<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
const faqData = [
  {
    id: 1,
    active: true,
    title: 'آیاامکان مشاهده جزئیات هر خلافی به‌صورت جداگانه وجود دارد؟',
    details: `بله، جزئیات خلافی اعم از علت خلافی، محل وقوع تخلف، مبلغ خلافی، تاریخ خلافی، ساعت خلافی و تصویر خلافی خودرو از طریق سرویس استعلام خلافی با جزئیات قابل مشاهده است.
`
  },
  {
    id: 2,
    active: false,
    title: 'برای استعلام و پرداخت جرائم رانندگی، چه روش‌هایی وجود داد؟',
    details: `برای استعلام و پرداخت خلافی دو راه وجود دارد، اول: استعلام جزئیات تخلفات خودرو با امکان پرداخت موردی و دوم: استعلام و پرداخت تجمیعی خلافی خودرو`
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
    title: `آیا امکان گرفتن جزئیات خلافی برای دیگری (غیر) وجود دارد؟`,
    details: `بله، شما می توانید با وارد کردن شماره پلاک، کد ملی و شماره موبایل دیگری و پس از وارد نمودن کد دریافتی توسط ایشان در محل مربوطه، نسبت به دریافت استعلام خلافی برای وی اقدام نمائید.`
  },
  {
    id: 5,
    active: false,
    title: `آیا امکان دسترسی به سوابق مربوط به استعلام جزئیات جریمه خودرو وجود دارد؟`,
    details: `بله؛ نتایج کلیه استعلام‌های انجام شده در بخش ایرانی کار من ذخیره می‌شوند و به راحتی می‌توانید به استعلام‌های قبلی خود به صورت رایگان دسترسی داشته باشید.`
  },
]
</script>

<template>
  <div class="flex flex-col space-y-36 py-8 md:py-14 px-5 lg:px-0 farsi-num">

    <Head>
      <Title>جزئیات خلافی خودرو</Title>
      <Meta name="description" content="خلافی، استعلام آنلاین خلافی خودرو، دریافت ریز خلافی خودرو به همراه لیست کامل جرایم رانندگی راهور، مشاهده مبلغ خلافی و تعداد جرایم ماشین و چاپ خلافی آنلاین." />
    </Head>

    <div class="lg:bg-[url('/icons/city-background.svg')] bg-repeat-x bg-bottom">
      <div class="flex gap-16 xl:container mx-auto justify-between items-end">
        <img class="hidden lg:block lg:w-64" src="/images/car-right.png" alt="" />
        <div class="flex flex-col space-y-3 -mb-12">
          <h1 class="text-2xl font-bold text-brand-blue-light print:hidden">
            استعلام خلافی خودرو
          </h1>
          <p class="leading-8 print:hidden">
            با استعلام جزئیات خلافی خودرو می‌توانید از محل و تاریخ وقوع خلافی مطلع شده و نسبت به پرداخت هر کدام اقدام
            نمائید. برای استفاده از این سرویس کافی است شماره پلاک،
            کد ملی و تلفن همراه مالک خودرو را وارد کنید. هزینه استعلام
            خلافی 5,200 تومان است.
          </p>
          <InquiryFinesDetailsForm />
        </div>
        <img class="hidden lg:block lg:w-64" src="/images/car-left.png" alt="" />
      </div>
    </div>
    <!-- Other Inquireis -->
    <SharedOtherInquiries />

    <!-- سوالات متداول  FAQ -->
    <SharedFaq class="w-full" :faqData="faqData" />

    <!-- Customer Club -->
    <SharedCustomerClub />
  </div>
</template>

<script setup>
// Composables
const { authUser, authWallet } = useAuth();
const cookieWallet = useCookie("wallet", { domain: "iranecar.com" });
const { inquiryDrivinglicence, sendInquiryOTP } = useInquiry();
const { getTotalAmount } = useWallet();

// States
const loginModal = ref(false);
const loading = ref(false);
const sendOTP = ref(false);
const errMessage = ref();
const licenceStatus = ref();
const form = reactive({
  mobile: "",
  nationalCode: "",
});
const fakeData = {
  status: 200,
  messages: [],
  data: [
    {
      nationalNo: "2649943149",
      firstName: "محسن",
      lastName: "نبي زاده زاويه",
      title: "پايه سوم",
      rahvarStatus: "اسکن شده ناجي پاس",
      barcode: "20472000017075609385",
      printDate: "1400/08/23",
      printNum: "9801473080",
      validYears: "10",
    },
  ],
};
const faqData = [
  {
    id: 1,
    active: true,
    title: 'سرویس استعلام وضعیت گواهینامه چه جزئیاتی را نمایش می‌دهد؟',
    details: `با استفاده از این سرویس می‌توانید از آخرین وضعیت گواهینامه خود شامل نام صاحب گواهینامه، نوع گواهینامه، (پايه سوم و ...)، شماره ملی، تاریخ صدور، مدت اعتبار، آخرین وضعیت گواهینامه (اسکن شده ناجي پاس و ...) و بارکد پستی گواهینامه را استعلام و نتیجه را مشاهده کنید.`
  },
  {
    id: 2,
    active: true,
    title: 'آیا امکان دسترسی به سوابق مربوط به وضعیت گواهینامه وجود دارد؟',
    details: `بله؛ نتایج کلیه استعلام‌های انجام شده در بخش ایرانی کار من ذخیره می‌شوند و به راحتی می‌توانید به استعلام‌های قبلی خود شامل وضعیت گواهینامه، به صورت رایگان دسترسی داشته باشید.`
  },
  {
    id: 3,
    active: true,
    title: `استعلام وضعیت گواهینامه چگونه انجام می گردد؟`,
    details: `استعلام وضعیت گواهینامه، با ورود کد ملی و تلفن همراه دارنده گواهینامه، با مراجعه به سرویس های استعلام و پرداخت، امکان پذیر می باشد.`
  },
  {
    id: 4,
    active: true,
    title: `آیا اطلاعات وارد شده باید مربوط به دارنده گواهینامه باشد؟`,
    details: `بله، کد ملی و شماره موبایل وارد شده باید متعلق به دارنده گواهینامه باشد.`
  },
  {
    id: 5,
    active: true,
    title: `آیا امکان گرفتن استعلام وضعیت گواهینامه برای دیگری (غیر) وجود دارد؟`,
    details: `بله، شما می توانید با وارد کردن کد ملی و شماره موبایل دیگری و پس از وارد نمودن کد دریافتی توسط ایشان در محل مربوطه، نسبت به دریافت استعلام وضعیت گواهینامه برای وی اقدام نمائید.`
  }
]


// Logics
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
// const newInquiry = () => (fines.value = {});
const inquiry = () => {
  if (!authUser.value) {
    loginModal.value = true;
  } else if (
    authUser.value.mobile != form.mobile &&
    form.mobile &&
    !form.code
  ) {
    sendOTP.value = true;
    sendInquiryOTP(form.mobile)
      .then((r) => {
        if (r.status == 500) {
          errMessage.value = r.messages[0];
        }
      })
      .catch((err) => (errMessage.value = err.data.messages[0]))
      .finally((loading.value = false));
  } else if (authUser.value.mobile != form.mobile && form.code) {
    inquiryDrivinglicence(form)
      .then((r) => {
        if (r.status == 200) {
          licenceStatus.value = r.data[0];
          getTotalAmount()
            .then((r) => {
              cookieWallet.value = r;
              authWallet.value = cookieWallet.value;
            })
            .catch((err) => (errMessage.value = err.data.messages[0]));
        }
        if (r.status == 500) {
          cookieWallet.value = getTotalAmount().catch(
            (err) => (errMessage.value = err.data.messages[0])
          );
          errMessage.value = r.messages[0];
        }
      })
      .catch((err) => (errMessage.value = err.data.messages[0]))
      .finally((loading.value = false));
  } else {
    inquiryDrivinglicence(form)
      .then((r) => {
        if (r.status == 200) {
          licenceStatus.value = r.data[0];
          getTotalAmount()
            .then((r) => {
              cookieWallet.value = r;
              authWallet.value = cookieWallet.value;
            })
            .catch((err) => (errMessage.value = err.data.messages[0]));
        }
        if (r.status == 500) {
          errMessage.value = r.messages[0];
        }
      })
      .catch((err) => (errMessage.value = err.data.messages[0]))
      .finally((loading.value = false));
  }
};
</script>

<template>
  <div class="flex flex-col space-y-36 py-8 md:py-14 px-5 md:px-0 farsi-num">

    <Head>
      <Title>وضعیت گواهینامه</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>


    <div class="lg:bg-[url('/icons/city-background.svg')] bg-repeat-x bg-bottom">
      <div class="flex gap-20 xl:container mx-auto justify-between items-end">
        <img class="hidden lg:block lg:w-64" src="/images/car-right.png" alt="" />
        <div class="flex flex-col space-y-3 -mb-12">
          <h1 class="text-2xl font-extrabold text-brand-blue-light">
            استعلام وضعیت گواهینامه
          </h1>
          <p class="leading-8">
            برای استعلام وضعیت گواهینامه کافی است، کد ملی و تلفن همراه خود را در فرم زیر وارد نماید. با پرداخت 5200 تومان
            به عنوان هزینه استعلام، اعتبار و وضعیت گواهینامه تازه یا المثنی خود را پیگیری کنید.
          </p>
          <InquiryLicenceStatusForm />
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

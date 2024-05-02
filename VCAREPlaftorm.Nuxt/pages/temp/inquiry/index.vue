<script setup>
// Composables
const { authUser } = useAuth();
const { getAllUserCars } = useGarage();

// States
const errMessage = ref();
const currentSlide = ref(1);
const loading = ref(false);
const cars = ref();
const data = [
  {
    active: true,
    linkTo: "/inquiry/fines-details",
    svgName: "fines-details",
    h1: "خلافی خودرو",
    p: "برای استعلام و پرداخت آسان، سریع و ایمن خلافی خودرو از این بخش اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/fines-accumulation",
    svgName: "fines-accumulation",
    h1: "تجمیع خلافی",
    p: "برای صرفه جویی در زمان، نسبت به تسویه تخلفات خودروی‌تان به صورت یکجا اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/negative-score",
    svgName: "negative-score",
    h1: "نمره منفی گواهینامه",
    p: "با ورود به این بخش می‌توانید نمره منفی گواهی نامه خود را استعلام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/pelak-status",
    svgName: "pelak-status",
    h1: "وضعیت پلاک‌ها",
    p: "برای اطلاع از آخرین وضعیت پلاک‌های فعال یا فک شده خود از طریق ثبت کد ملی اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/licence-status",
    svgName: "licence-status",
    h1: "وضعیت گواهینامه",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: true,
    linkTo: "/inquiry/card-sanad",
    svgName: "card-sanad",
    h1: "کارت و سند مالکیت",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "side-park",
    h1: "پارک حاشیه‌ای",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "traffic-plan",
    h1: "طرح ترافیک",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
  {
    active: false,
    linkTo: "#",
    svgName: "annual-toll",
    h1: "عوارض سالیانه",
    p: "برای استعلام اعتبار زمانی و پیگیری گواهینامه تازه یا المثنی خود می‌توانید از این بخش اقدام کنید.",
  },
];
const faqData = [
  {
    id: 1,
    active: true,
    title: 'آیا برای پلاک خودرویی که مالکیت آن را ندارم، امکان استعلام و پرداخت جریمه وجود دارد؟',
    details: `بله، با آگاهی از کد ملی و شماره موبایل مالک خودرو و همچنین ثبت پلاک خودرو مورد نظر، این امکان وجود دارد.`
  },
  {
    id: 2,
    active: false,
    title: 'بعد از پرداخت خلافی با اپلیکیشن ایرانی  کار، چقدر طول می‌کشد تا جریمه از لیست خلافی‌ پاک شود؟',
    details: `جریمه‌ی شما بلافاصله بعد از پرداخت جریمه خودرو صفر می‌شود؛ اما به دلیل آفلاین بودن سیستم پلیس راهور، به‌روز شدن لیست خلافی بین ۲ الی ۳ هفته زمان می‌برد.`
  },
  {
    id: 3,
    active: false,
    title: `آیا امکان پرداخت خلافی خودرو به صورت اقساطی وجود دارد؟`,
    details: `در سامانه، امکان مشاهده‌ی هر قبض جریمه به صورت جداگانه و همراه با جزئیات و همچنین امکان پرداخت تک‌به‌تک قبض‌های خلافی وجود دارد.`
  },
  {
    id: 4,
    active: false,
    title: `آیا امکان دسترسی مجدد به نتایج استعلام‌های انجام شده بدون پرداخت هزینه وجود دارد؟`,
    details: `بله، نتیجه‌ی کلیه‌ی استعلام‌های انجام شده در سرویس‌های 6 گانه، در بخش ایرانی کار من در نسخه‌ی وب قابل مشاهده است و در منوی پشتیبانی، بخش تاریخچه‌ی استعلامات در اپلیکیشن ایرانی کار ذخیره می‌شود و امکان دسترسی به این اطلاعات در هر زمان وجود دارد. `
  },
  {
    id: 5,
    active: false,
    title: `کدام جرائم خودرو، و در چه شرایطی، دو برابر می‌شوند؟`,
    details: `احتمالا برای شما این موضوع پیش آمده که پس از استعلام خلافی خودرو از طریق اینترنت یا پلیس +10 بعد از چند ماه با دو برابر شدن برخی جرائم مواجه شده‌اید. طبق قوانین پلیس راهور، اگر از صادر شدن خلافی تسلیمی، الصاقی و خودداری دو ماه (60 روز) بگذرد و راننده نسبت به پرداخت خلافی اقدام نکند یا به مبلغ خلافی اعتراضی نکند، مبلغ خلافی دو برابر خواهد شد. خلافی‌ دوربینی و دوبرگی شامل این قانون نیست و مبلغ جریمه دو برابر نخواهد شد.`
  },
  {
    id: 6,
    active: false,
    title: `سقف مجاز خلافی خودرو برای توقیف چقدر است؟`,
    details: `براساس مصاحبه‌ی منتشر شده با سردار هادیانفر در تاریخ 12 اسفند 1399 در ایسنا، اعلام گردید که سقف مجاز برای توقیف خودرو از 1 میلیون تومان به 3 میلیون تومان افزایش پیدا کرده است و دیگر خودروهایی با جریمه‌ی بالای 1 میلیون تومان مشمول توقیف نمی‌شوند.`
  },
]

// Logics
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
if (authUser.value) {
  getAllUserCars()
    .then((r) => {
      if (r.status == 200) {
        cars.value = r;
      }
    })
    .catch((err) => (errMessage.value = err.data.messages[0]))
    .finally((loading.value = false));
}
</script>

<template>
  <div>

    <Head>
    <Title>سرویس‌های استعلام و پرداخت</Title>
    <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <div class="relative bg-gradient-to-tr from-sky-200 via-white to-white">
      <img class="absolute hidden bottom-0 z-0 md:block" src="/images/tire.png" alt="" />
      <div class="flex flex-col space-y-5 xl:container mx-auto px-5 py-8 lg:py-16">
        <h1 class="text-xl  md:text-2xl font-extrabold text-brand-blue">
          سرویس‌های استعلام و پرداخت
        </h1>
        <div class="flex flex-col-reverse lg:flex-row gap-10 justify-between">
          <div class="flex flex-col space-y-10 lg:w-1/2 text-justify">
            <p class="leading-8 hidden lg:block">
              در این قسمت با دریافت خدماتی چون استعلام خلافی خودرو، استعلام نمره منفی گواهینامه، پیگیری آخرین وضعیت پلاک،
              گواهینامه، کارت و سند مالکیت خودرو خود می‌توانید نسبت به پرداخت موردی یا کلی خلافی خودروتان برنامه ریزی یا اقدام نمائید.
              شما می‌توانید با واردکردن شماره تلفن همراه، شماره پلاک خودرو، کد ملی یا شماره گواهی‌نامه از
              خدمات و سرویس‌های متنوع ایرانی کار استفاد کنید.
            </p>
            <div class="flex flex-col space-y-6 w-full">
              <h1 v-if="cars" class="text-2xl font-extrabold text-brand-red">
                خودروهای من
              </h1>
              <div v-else class="flex flex-col space-y-6 leading-8">
                <h1 class="text-2xl font-extrabold text-brand-red">
                  خودروی شما
                </h1>
                <p>
                  شما با پارک خودروهایتان در پارکینگ ایرانی کار می‌توانید علاوه
                  بر سهولت دسترسی به قسمت‌های مختلف خدمات این مجموعه، از
                  پیشنهادات و تخفیفات مختص خودرو خود بهره‌مند شوید. همچنین
                  پارکینگ ایرانی کار با ذخیره‌سازی ایمن سوابق استعلام و
                  پرداختی‌های شما، این امکان را برایتان به وجود می‌آورد تا خدمات
                  بعدی را در کمترین زمان و راحت‌ترین حالت ممکن دریافت کنید.
                </p>
              </div>
              <div class="flex flex-col z-10">
                <div
                  v-if="cars"
                  class="flex items-center justify-between md:px-16 -mb-2"
                >
                  <p class="text-sm">با یک کلیک استعلام بگیر!</p>
                  <NuxtLink
                    to="/profile/park-car"
                    class="text-brand-red font-bold"
                    >+ افزودن خودرو</NuxtLink
                  >
                </div>
                <SharedCarousel
                  v-if="cars"
                  v-model="currentSlide"
                  :slidesNo="cars.data.length"
                  :height="'h-60'"
                  class="md:px-5 z-10"
                  :navigation="false"
                  ><SharedSlide
                    v-for="(car, index) in cars.data"
                    :key="index"
                    name="fade"
                    class="md:px-10"
                  >
                    <div
                      v-if="currentSlide === index + 1"
                      class="flex flex-col w-full border shadow bg-white rounded-md justify-center self-center"
                    >
                      <div
                        class="flex justify-between py-5 px-1 items-center border-b mx-4"
                      >
                        <div class="flex items-center gap-4">
                          <div class="border border-brand-red rounded-md p-5">
                            <img src="/icons/red-car.svg" alt="خودروی شما" />
                          </div>
                          <div class="flex flex-col space-y-3 farsi-num">
                            <h2 class="text-lg font-bold text-brand-blue-light">
                              {{ car.carGroupTitle }} {{ car.carModelTitle }}
                            </h2>
                            <p class="text-gray-400">
                              {{ car.licensePlateIranDigits }}
                              {{ car.licensePlateThreeDigits }}
                              {{ car.licensePlateAlphabet }}
                              {{ car.licensePlateFirstTwoDigits }}
                            </p>
                          </div>
                        </div>
                        <div class="self-start">
                          <img src="/icons/vertical-dots.svg" alt="" />
                        </div>
                      </div>
                      <div
                        class="w-full flex justify-evenly items-center gap-2 p-4"
                      >
                        <div
                          class="flex flex-col text-center justify-center space-y-2 items-center text-xs border rounded-md w-24 h-24 px-2"
                        >
                          <img class="w-8" src="/icons/high-way.svg" alt="" />
                          <p>خلافی خودرو</p>
                        </div>
                        <div
                          class="flex flex-col text-center justify-center space-y-2 items-center text-xs border rounded-md w-24 h-24 px-2"
                        >
                          <img class="w-8" src="/icons/document.svg" alt="" />
                          <p>تجمیع خلافی</p>
                        </div>
                        <div
                          class="flex flex-col text-center justify-center space-y-2 items-center text-xs border rounded-md w-24 h-24 px-2"
                        >
                          <img class="w-8" src="/icons/camera.svg" alt="" />
                          <p>طرح ترافیک</p>
                        </div>
                        <div
                          class="flex flex-col text-center justify-center space-y-2 items-center text-xs border rounded-md w-24 h-24 px-2"
                        >
                          <img class="w-5" src="/icons/park.svg" alt="" />
                          <p>پارک حاشیه‌ای</p>
                        </div>
                      </div>
                    </div>
                  </SharedSlide>
                </SharedCarousel>
                <div
                  v-else
                  class="flex flex-col space-y-5 font-semibold items-center py-5 z-10"
                >
                  <NuxtLink
                    to="/profile/park-car"
                    class="bg-brand-red flex justify-center gap-3 items-center px-6 py-2 rounded-md text-white"
                  >
                    <img src="/icons/car.svg" alt="" />
                    <p>پارک خودرو</p>
                    <img src="/icons/plus.svg" alt="" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-3 md:gap-5 lg:w-1/2">
            <NuxtLink
              v-for="(item, index) in data"
              :key="index"
              :to="item.linkTo"
              :class="
                item.active
                  ? 'hover:bg-blue-50 md:hover:-translate-y-3 transition ease-in-out duration-150 bg-white'
                  : ' bg-white/25'
              "
              class="flex flex-col justify-between space-y-2 md:space-y-5 border rounded-md items-center farsi-num p-1 md:p-4 shadow-md"
            >
              <div
                class="p-2 rounded-full"
                :class="item.active ? 'bg-blue-100' : 'bg-gray-100/75'"
              >
                <img class="w-8 h-8 md:w-full"
                :src ='`/icons/${item.svgName}.svg`'
                  alt=""
                />
              </div>
              <div class="flex flex-col items-center justify-center gap-2">
                <h3 class="font-semibold text-[11px] md:text-base" :class="!item.active ? 'text-gray-400' : ''">{{ item.h1 }}</h3>
                <p class="text-gray-400">
                  (<span class="text-brand-red text-xs md:text-base">5,200</span> تومان)
                </p>
              </div>
              <nuxt-icon
                v-if="item.active"
                class="hidden md:block md:w-4 md:self-end text-red-700"
                name="arrow-left"
              />
              <p v-else class="hidden md:block md:self-end text-red-700">به زودی</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
    <div class="xl:container mx-auto py-20 px-5">
      <div class="flex flex-col bg-gray-50 md:flex-row gap-10 items-center">
        <div class="flex flex-col gap-10">
          <h1 class="text-2xl font-extrabold text-brand-blue">
            ویژگی‌های استعلام با ایرانی کار :
          </h1>
          <div class="flex flex-col space-y-5">
            <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <img src="/images/car2.png" alt="" />
              <div
                class="flex flex-col space-y-2 leading-8 text-center md:text-right"
              >
                <h3 class="font-semibold text-brand-blue-light">خدمات متنوع</h3>
                <p>
                  ایرانی کار متولی خدمات جامع خودروداری در ایران است که شامل
                  سرویس‌های مختلفی مانند استعلام، تجمیع و پرداخت جرایم رانندگی،
                  مشاهده عکس، محل، ساعت و دلیل خلافی، بررسی وضعیت گواهی‌نامه،
                  پلاک و کارت سند خودرو، پرداخت عوارض آزادراهی، طرح ترافیک، پارک
                  حاشیه‌ای و پرداخت عوارض سالیانه خودرو می‌شود.
                </p>
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <img src="/images/camera.png" alt="" />
              <div
                class="flex flex-col space-y-2 leading-8 text-center md:text-right"
              >
                <h3 class="font-semibold text-brand-blue-light">
                  مزایای فراوان
                </h3>
                <p>
                  ایرانی کار یک سوپراپ کامل خودروداری است که جایگزین چندین
                  اپلیکیشن در گوشی موبایل شما خواهد شد. بهر‌ه‌مندی از تخفیف‌های
                  مناسبتی و کمپین‌های دوره‌ای از مزایای عضویت در باشگاه مشتریان
                  ایرانی کار است. همچنین سهولت کار و پرداخت‌های ایمن از مزایای
                  عضویت در خانواده بزرگ ایرانی کار است.
                </p>
              </div>
            </div>
            <div class="flex flex-col md:flex-row items-center gap-3 md:gap-6">
              <img src="/images/booking.png" alt="" />
              <div
                class="flex flex-col space-y-2 leading-8 text-center md:text-right"
              >
                <h3 class="font-semibold text-brand-blue-light">
                  پرداخت با کیف پول
                </h3>
                <p>
                  ساده سازی خدمات پرداخت یکی از ویژگی‌های اپلیکیشن ایرانی کار
                  است. کاربران ایرانی کار برای صرفه‌جویی در زمان خود می‌توانند
                  برای پرداخت قبوض و جرایم از کیف پول اختصاصی خود استفاده کنند.
                  کافی است ایرانی کارلیکیشن ایرانی کار را دانلود کرده و با ثبت
                  نام در آن، از خدمات متنوع پرداخت الکترونیک ما بهره‌مند شوید.
                </p>
              </div>
            </div>
          </div>
        </div>
        <!-- <img class="w-40 md:w-96" src="/images/hand.png" alt="" /> -->
        <NuxtImg class="w-40 md:w-96" src="/images/hand.png" format="webp" alt="hand image for inquiry" />
      </div>

      <!-- سوالات متداول  FAQ -->
      <SharedFaq class="w-full" :faqData="faqData"/>

      <!-- Customer Club -->
      <SharedCustomerClub />
    </div>
  </div>
</template>

<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";

// Composables
const { authUser, authWallet } = useAuth();
const cookieWallet = useCookie("wallet", { domain: "iranecar.com" });
const { inquiryFineDetails, sendInquiryOTP } =
  useInquiry();
const { getTotalAmount } = useWallet();
const { getAllUserCars } = useGarage();

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema = object({
  firstTwoDigits: string().min(2, "حداقل 2 شماره").required("پلاک الزامی است"),
  plateAlphabet: string().required("پلاک الزامی است"),
  threeDigits: string().required("پلاک الزامی است").min(3, "حداقل 3 شماره"),
  iranDigits: string().required("پلاک الزامی است").min(2, "حداقل 2 شماره"),
  nationalCode: string()
    .test("کد ملی معتبر نیست", "کد ملی معتبر نیست", (value) =>
      isNationalIdValid(value)
    )
    .required("کد ملی الزامی است"),
  mobile: string()
    .matches(mobileRegex, "تلفن همراه معتبر نیست")
    .required("تلفن همراه الزامی است"),
  // code: string().when('mobile', {
  //   is: (mobile) =>  authUser.value.mobile != mobile,
  //   then: string()
  //     .min(5, "کد تائید حداقل 5 رقم می‌باشد")
  //     .required("کد تائید الزامی است"),
  // }),
});
const initialValues = reactive({
  firstTwoDigits: "",
  plateAlphabet: "",
  threeDigits: "",
  iranDigits: "",
  nationalCode: "",
  mobile: "",
  code: "",
  client: 2, // WebSite client is 2
});

// States
const loginModal = ref(false);
const carsModal = ref(false);
const cars = ref();
const errMessage = ref(null);
const sendOTP = ref(false);
const otpMobile = ref();
const fines = ref();
const loading = ref(false);
const initialMobile = ref()
const info = reactive({
  firstTwoDigits: "",
  plateAlphabet: "",
  threeDigits: "",
  iranDigits: "",
  nationalCode: "",
  mobile: "",
  code: "",
});
const fakeData = {
  warningDTOs: [
    {
      serialNo: "1215440675",
      violationOccureDate: "1396/10/02 - 16:30",
      violationOccureTime: "16:30",
      violatoinAddress: "تبريز اتوبان کسايي",
      finalPrice: "1200000",
      paperId: "1544067500290",
      paymentId: "420028875",
      violationDeliveryType: "تسليمي",
      violationTypeId: "2056",
      violationType: "تجاوز از سرعت مجاز (تا سي كيلومتر در ساعت)",
      hasImage: "0",
    },
    {
      serialNo: "1215440675",
      violationOccureDate: "1396/10/02 - 16:30",
      violationOccureTime: "16:30",
      violatoinAddress: "تبريز اتوبان کسايي",
      finalPrice: "3000000",
      paperId: "1544067500290",
      paymentId: "420028875",
      violationDeliveryType: "تسليمي",
      violationTypeId: "2005",
      violationType: "حركت به طور مارپيچ",
      hasImage: "0",
    },
    {
      serialNo: "8227816261",
      violationOccureDate: "1397/01/19 - 20:45",
      violationOccureTime: "20:45",
      violatoinAddress: "اردبيل محوراردبيل سراب",
      finalPrice: "1200000",
      paperId: "2781626100294",
      paymentId: "120002600",
      violationDeliveryType: "تسليمي",
      violationTypeId: "2093",
      violationType:
        "عدم استفاده از كمربند ايمني توسط راننده يا سرنشينان وسيله نقليه در حال حركت (غير از استثنائات قانوني) در آزاد راه‌ها، بزرگرراه‌ها و جاده‌ها",
      hasImage: "0",
    },
    {
      serialNo: "2239796786",
      violationOccureDate: "1397/06/25 - 10:40",
      violationOccureTime: "10:40",
      violatoinAddress: "ماکو ج ماکو",
      finalPrice: "600000",
      paperId: "3979678600293",
      paymentId: "60018746",
      violationDeliveryType: "تسليمي",
      violationTypeId: "2116",
      violationType:
        "نداشتن يا نقص چراغ‌هاي جلو، عقب، ترمز يا راهنماي وسيله نقليه و يا تغيير رنگ چراغ‌ها",
      hasImage: "0",
    },
    {
      serialNo: "7851438651",
      violationOccureDate: "1397/09/14 - 18:36",
      violationOccureTime: "18:36",
      violatoinAddress: "تبريز م استاد شهريار",
      finalPrice: "600000",
      paperId: "5143865100292",
      paymentId: "60026337",
      violationDeliveryType: "دوربين",
      violationTypeId: "2056",
      violationType: "تجاوز از سرعت مجاز (تا سي كيلومتر در ساعت)",
      hasImage: "1",
    },
    {
      serialNo: "7852884449",
      violationOccureDate: "1397/09/20 - 21:44",
      violationOccureTime: "21:44",
      violatoinAddress: "تهران آزادگان تهران كرج ش ب ج",
      finalPrice: "600000",
      paperId: "5288444900298",
      paymentId: "60027140",
      violationDeliveryType: "دوربين",
      violationTypeId: "2056",
      violationType: "تجاوز از سرعت مجاز (تا سي كيلومتر در ساعت)",
      hasImage: "1",
    },
    {
      serialNo: "0852197477",
      violationOccureDate: "1397/09/20 - 21:47",
      violationOccureTime: "21:47",
      violatoinAddress: "تهران ازادگان شهد ش به ج",
      finalPrice: "600000",
      paperId: "5219747700290",
      paymentId: "60027061",
      violationDeliveryType: "دوربين",
      violationTypeId: "2056",
      violationType: "تجاوز از سرعت مجاز (تا سي كيلومتر در ساعت)",
      hasImage: "1",
    },
  ],
  priceStatus: "1",
  parmDate: "1401/08/17",
  totalPrice: "29272000",
  totalPaperId: "6891350400196",
  totalPaymentId: "0002927223380",
};

// Logics
const isNationalIdValid = (nationalId) => {
  if (nationalId.length < 8 || 10 < nationalId.length) {
    return false;
  }
  if (
    nationalId == "0000000000" ||
    nationalId == "1111111111" ||
    nationalId == "2222222222" ||
    nationalId == "3333333333" ||
    nationalId == "4444444444" ||
    nationalId == "5555555555" ||
    nationalId == "6666666666" ||
    nationalId == "7777777777" ||
    nationalId == "8888888888" ||
    nationalId == "9999999999"
  ) {
    return false;
  }
  if (nationalId.length < 10) {
    let zeroNeeded = 10 - nationalId.length;
    let zeroString = "";
    if (zeroNeeded == 2) {
      zeroString = "00";
    } else {
      zeroString = "0";
    }
    nationalId = zeroString.concat(nationalId);
  }
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += nationalId.toString().charAt(i) * (10 - i);
  }
  let mod = sum % 11;
  let finalValue;
  if (mod >= 2) {
    finalValue = 11 - mod;
  } else {
    finalValue = mod;
  }
  if (finalValue == nationalId.toString().charAt(9)) {
    return true;
  } else {
    return false;
  }
};

const isMyNumber = (mobile) => {
  if (
    authUser.value &&
    authUser.value.mobile != mobile) {
    return false;
  } else if (
    authUser.value &&
    authUser.value.mobile == mobile) {
    return true;
  }
};

const openCarModal = async () => {
  getAllUserCars()
    .then((r) => {
      if (r.status == 200) {
        cars.value = r;
        carsModal.value = true;
      }
    })
    .catch((err) => (errMessage.value = err.data.messages[0]))
    .finally((loading.value = false));
};

const selectCar = (id) => {
  const selectedCar = cars.value.data.find((item) => item.id == id);
  (initialValues.firstTwoDigits = selectedCar.licensePlateFirstTwoDigits),
    (initialValues.plateAlphabet = selectedCar.licensePlateAlphabet),
    (initialValues.threeDigits = selectedCar.licensePlateThreeDigits),
    (initialValues.iranDigits = selectedCar.licensePlateIranDigits);
};

const handleSubmit = (form) => {
  info.firstTwoDigits = form.firstTwoDigits;
  info.plateAlphabet = form.plateAlphabet;
  info.threeDigits = form.threeDigits;
  info.iranDigits = form.iranDigits;
  info.nationalCode = form.nationalCode;
  info.mobile = form.mobile;
  info.code = form.code;
  if (!authUser.value) {
    loginModal.value = true;
    initialMobile.value = form.mobile
  } else if (form.mobile !== authUser.value.mobile && sendOTP.value === false) {
    errMessage.value = null;
    loading.value = true;
    sendInquiryOTP(form.mobile)
      .then((r) => {
        if (r.status == 200) {
          sendOTP.value = true;
          otpMobile.value = form.mobile;
          loading.value = false;
        } else if (r.status == 500) {
          errMessage.value = r.messages[0];
          loading.value = false;
        }
      })
      .catch((err) => {
        errMessage.value = err.data.messages[0];
        loading.value = false;
      });
  } else if (
    form.mobile !== authUser.value.mobile &&
    sendOTP.value === true &&
    form.code !== null
  ) {
    errMessage.value = null;
    loading.value = true;
    inquiryFineDetails(form)
      .then((r) => {
        if (r.status == 200) {
          fines.value = r.data;
          initialValues.firstTwoDigits = form.firstTwoDigits;
          initialValues.plateAlphabet = form.plateAlphabet;
          initialValues.threeDigits = form.threeDigits;
          initialValues.iranDigits = form.iranDigits;
          getTotalAmount()
            .then((r) => {
              cookieWallet.value = r;
              authWallet.value = cookieWallet.value;
              loading.value = false;
            })
            .catch((err) => (errMessage.value = err.data.messages[0]));

          // Tracking spend_wallet_credit event + parameter through Google Tag Manager
          window.dataLayer.push({ 'event': 'spend_wallet_credit', 'currency': "USD", 'value': 52000, 'source': 'fines-details-desktop' })
        }
        if (r.status == 500) {
          errMessage.value = r.messages[0];
          loading.value = false;
          sendOTP.value = false;
        }
      })
      .catch((err) => {
        errMessage.value = err.data.messages[0];
        loading.value = false;
      });
  } else {
    loading.value = true;
    inquiryFineDetails(form)
      .then((r) => {
        if (r.status == 200) {
          // Tracking spend_wallet_credit event + parameter through Google Tag Manager
          window.dataLayer.push({
            'event': 'spend_wallet_credit',
            currency: 'USD',
            value: 52000,
            // transaction_id: route.query.TransId,
            source: 'fines-details-desktop'
          })
          fines.value = r.data;
          initialValues.firstTwoDigits = form.firstTwoDigits;
          initialValues.plateAlphabet = form.plateAlphabet;
          initialValues.threeDigits = form.threeDigits;
          initialValues.iranDigits = form.iranDigits;
          getTotalAmount()
            .then((r) => {
              cookieWallet.value = r;
              authWallet.value = cookieWallet.value;
              loading.value = false;
            })
            .catch((err) => (errMessage.value = err.data.messages[0]));
        }
        if (r.status == 500) {
          errMessage.value = r.messages[0];
          loading.value = false;
        }
      })
      .catch((err) => {
        errMessage.value = err.data.messages[0];
        loading.value = false;
      });
  }
};
const newInquiry = () => {
  sendOTP.value = false;
  fines.value = null;
  errMessage.value = null;
  initialValues.firstTwoDigits = "";
  initialValues.plateAlphabet = "";
  initialValues.threeDigits = "";
  initialValues.iranDigits = "";
};
const reset = () => {
  sendOTP.value = false;
  fines.value = null;
  errMessage.value = null;
  initialValues.firstTwoDigits = "";
  initialValues.plateAlphabet = "";
  initialValues.threeDigits = "";
  initialValues.iranDigits = "";
};
</script>

<template>
  <div>
    <SharedLoginModal v-if="loginModal" @close="loginModal = false" :initial-mobile="initialMobile" />
    <SharedCarsModal v-if="carsModal" @close="carsModal = false" :cars="cars.data" @selectCarID="selectCar" />
    <div v-if="fines" class="flex flex-col space-y-3">
      <button @click="newInquiry"
        class="flex items-center gap-5 bg-blue-50 font-semibold text-brand-blue px-4 py-2 rounded-full w-fit print:hidden">
        <p>استعلام جدید</p>
        <NuxtIcon name="arrow-left" />
      </button>

      <!-- fines report used from "InquiryFinesDetailsResponse" Component, and old code be comment -->
      <InquiryFinesDetailsResponse :info="info" :data="fines" />

      <!-- <div class="flex flex-col space-y-3 max-h-96 overflow-y-auto px-2">
                    <div
                      class="flex justify-between gap-10 items-center farsi-num border py-3 border-blue-500 rounded-md px-4"
                    >
                      <p class="flex h-full">
                        {{ initialValues.iranDigits }}
                        {{ initialValues.threeDigits }}
                        {{ initialValues.plateAlphabet }}
                        {{ initialValues.firstTwoDigits }}
                      </p>
                      <p>مجموع مبلغ خلافی: {{ fines.totalPrice }} ریال</p>
                      <p>تعداد تخلفات:: {{ fines.warningDTOs.length }} عدد</p>
                    </div>
                    <div
                      class="flex flex-col space-y-4"
                      v-for="(item, index) in fines.warningDTOs"
                      :key="index"
                    >
                      <div
                        class="flex flex-col items-center farsi-num border bg-white border-blue-500 rounded-md overflow-x-auto"
                      >
                        <div
                          class="flex items-center justify-between w-full bg-blue-200 p-3 font-semibold"
                        >
                          <p class="w-16 text-center">مبلغ</p>
                          <p class="w-40 text-center">شرح تخلف</p>
                          <p class="w-16 text-center">تحویل</p>
                          <p class="w-40 text-center">محل تخلف</p>
                          <p class="w-24 text-center">شناسه قبض</p>
                          <p class="w-20 text-center">تاریخ و ساعت</p>
                        </div>
                        <div class="flex justify-between w-full px-3 py-5 text-center">
                          <p class="w-16 text-center">
                            {{ $seperator(item.finalPrice) }}
                          </p>
                          <p class="w-40 text-center">{{ item.violationType }}</p>
                          <p class="w-16 text-center">
                            {{ item.violationDeliveryType }}
                          </p>
                          <p class="w-40 text-center">
                            {{ item.violatoinAddress }}
                          </p>
                          <p class="w-24 text-center">{{ item.paperId }}</p>
                          <p class="w-20 text-center">
                            {{ item.violationOccureDate }}
                          </p>
                        </div>
                        <div
                          v-if="item.hasImage === '1'"
                          class="flex items-center self-end gap-3 m-5"
                        >
                          <button
                            @click="ImageInquiry(item.serialNo)"
                            class="flex items-center gap-2 bg-blue-200 border border-blue-500 rounded-md py-3 px-5"
                          >
                            <p>تصویر خودرو</p>
                            <nuxt-icon class="text-brand-blue-light" name="camera" />
                            <SharedLoading v-if="loading" />
                          </button>
                        </div>
                      </div>
                      <button
                        v-if="fines.totalPrice !== '0'"
                        @click="pay(item.finalPrice, item.paperId, item.paymentId)"
                        class="flex bg-brand-blue-light self-end text-white rounded-md py-3 px-12"
                      >
                        پرداخت
                      </button>
                    </div>
                  </div> -->
    </div>
    <VForm v-else class="flex flex-col gap-1" :validation-schema="schema" :initial-values="initialValues"
      v-slot="{ meta: formMeta, errors: formErrors, values }" @submit="handleSubmit">
      <div class="flex items-center justify-between">
        <div></div>
        <!-- <button @click="openCarModal"
                                class="flex items-center gap-5 bg-blue-50 font-semibold text-brand-blue px-4 py-2 rounded-full w-fit">
                                <p>انتخاب خودرو</p>
                                <NuxtIcon name="arrow-left" />
                            </button> -->
        <button @click="reset" type="reset" class="flex items-center gap-5 text-brand-blue px-4 py-2 w-fit">
          <p>پاک کردن فرم</p>
        </button>
      </div>
      <div>
        <div
          class="w-full flex flex-col sm:flex-row-reverse items-center justify-between gap-2 my-3 bg-blue-50 border border-blue-500 rounded-md px-4 py-1 font-bold"
          dir="ltr">
          <div class="flex shrink-0 flex-col text-right">
            <label class="font-bold">پلاک خودرو</label>
            <VErrorMessage name="FirstTwoDigits" class="text-xs font-normal text-red-500 mt-1 farsi-num" />
          </div>
          <div class="flex items-center gap-2 md:w-4/6">
            <InquiryFirstTwoDigits name="firstTwoDigits" />
            <InquiryAlphabet name="plateAlphabet" />
            <InquiryThreeDigits name="threeDigits" />
            <InquiryIranDigits name="iranDigits" />
          </div>
        </div>
        <InquiryInput type="tel" autocomplete="off" name="nationalCode" maxlength="10" label="کد ملی مالک خودرو"
          dir="ltr" />
        <InquiryInput type="tel" autocomplete="off" name="mobile" maxlength="11" label="تلفن همراه مالک خودرو"
          dir="ltr" />
        <InquiryInput v-if="sendOTP" type="tel" autocomplete="off" name="code" maxlength="5"
          :label="'کد ارسال شده به شماره ' + otpMobile" dir="ltr" />
      </div>
      <div class="border flex items-center gap-4 text-xs px-4 py-2 rounded-md" :class="
        errMessage
          ? 'bg-red-50 text-red-500 border-red-500'
          : 'bg-blue-50 text-blue-500 border-blue-500'
      ">
        <div v-if="errMessage" class="flex gap-4 items-center">
          <nuxt-icon name="cross" />
          <p class="font-bold" v-html="errMessage"></p>
        </div>
        <div v-else class="flex gap-4 items-center">
          <img src="/icons/tajob-blue.svg" alt="" />
          <p>
            پلاک خودرو، کد ملی و شماره موبایل می‌بایست متعلق به یک فرد (مالک
            خودرو) باشد.
          </p>
        </div>
      </div>
      <button
          :disabled="!formMeta.valid || loading"
          type="submit"
          class="flex justify-center gap-3 md:self-end text-white rounded-md py-3 px-20 outline-1 outline-brand-blue-dark farsi-num"
          :class="formMeta.valid ? 'bg-brand-blue-light' : 'bg-gray-400'"
        >
          <p>
            استعلام
            <span class="text-xs">( 5200 تومان )</span>
          </p>
          <SharedLoading v-if="loading" />
        </button>
    </VForm>
  </div>
</template>

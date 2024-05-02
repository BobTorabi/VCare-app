<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";

// Composables
const { authUser, authWallet } = useAuth();
const cookieWallet = useCookie("wallet", { domain: "iranecar.com" });
const { getTotalAmount } = useWallet();
const { inquiryActivePelak, sendInquiryOTP } = useInquiry();

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema = object({
  nationalCode: string()
    .test("کد ملی معتبر نیست", "کد ملی معتبر نیست", (value) =>
      isNationalIdValid(value)
    )
    .required("کد ملی الزامی است"),
  mobile: string()
    .matches(mobileRegex, "تلفن همراه معتبر نیست")
    .required("تلفن همراه الزامی است"),
  // code: string().when("mobile", {
  //   is: (mobile) => isNotMyNumber(mobile),
  //   then: string()
  //     .min(5, "کد تائید حداقل 5 رقم می‌باشد")
  //     .required("کد تائید الزامی است"),
  // }),
});
const initialValues = reactive({
  nationalCode: "",
  mobile: "",
  code: "",
  client: 2, // WebSite client is 2
});

// States
const loginModal = ref(false);
const errMessage = ref(null);
const sendOTP = ref(false);
const otpMobile = ref();
const loading = ref(false);
const initialMobile = ref()
const pelaks = ref();
const fakeData = {
  plaks: [
    {
      plak: "پلاک موجود نمی باشد",
    },
  ],
};
const fakeData3 = {
  status: 200,
  messages: [],
  data: {
    plaques: [
      {
        plaque: "پلاک موجود نمی باشد",
      },
    ],
  },
};
const fakeData2 = {
  plaks: [
    {
      plakNumber: "331259767",
      plak: "ایران ۳۳ - ۷۶۷ م  ۵۹",
      secInSerial: "1010123603963",
      socialNo: "4650435366",
      is_Fak: "0",
    },
    {
      plakNumber: "810241793",
      plak: "ایران ۸۱ - ۷۹۳ ب  ۴۱",
      secInSerial: "10100413325749",
      socialNo: "4650435366",
      mnfk_SHDN_DATE: "2009-10-26 07:24:50",
      is_Fak: "1",
      description: "شماره گذاري بروجن",
    },
    {
      plakNumber: "880869157",
      plak: "ایران ۸۸ - ۱۵۷ ط  ۶۹",
      secInSerial: "10101441204343",
      socialNo: "4650435366",
      is_Fak: "0",
    },
    {
      plakNumber: "880869157",
      plak: "ایران ۸۸ - ۱۵۷ ط  ۶۹",
      secInSerial: "1010233263988",
      socialNo: "4650435366",
      mnfk_SHDN_DATE: "2019-04-07 12:06:23",
      is_Fak: "1",
      description: "شماره گذاري شهرکرد",
    },
    {
      plakNumber: "101518327",
      plak: "ایران ۱۰ - ۳۲۷ ﻫ  ۱۸",
      secInSerial: "10100436653307",
      socialNo: "4650435366",
      mnfk_SHDN_DATE: "2019-03-31 11:18:10",
      is_Fak: "1",
      description: "شماره گذاري شهرکرد",
    },
  ],
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

const isNotMyNumber = (mobile) => {
  if (
    authUser.value &&
    authUser.value.mobile != mobile &&
    sendOTP.value === false
  ) {
    return false;
  } else if (
    authUser.value &&
    authUser.value.mobile != mobile &&
    sendOTP.value === true
  ) {
    return true;
  } else {
    return false;
  }
};

const handleSubmit = (form) => {
  if (!authUser.value) {
    initialMobile.value = form.mobile
    loginModal.value = true;
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
    form.code
  ) {
    errMessage.value = null;
    loading.value = true;
    inquiryActivePelak(form)
      .then((r) => {
        if (r.status == 200) {
          // Tracking spend_wallet_credit event + parameter through Google Tag Manager
          window.dataLayer.push({
            'event': 'spend_wallet_credit',
            currency: 'USD',
            value: 52000,
            // transaction_id: route.query.TransId,
            source: 'pelak-status-desktop'
          })
          pelaks.value = r.data.plaques;
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
          sendOTP.value = false;
        }
      })
      .catch((err) => {
        errMessage.value = err.data.messages[0];
        loading.value = false;
      });
  } else {
    loading.value = true;
    inquiryActivePelak(form)
      .then((r) => {
        if (r.status == 200) {
          // Tracking spend_wallet_credit event + parameter through Google Tag Manager
          window.dataLayer.push({
            'event': 'spend_wallet_credit',
            currency: 'USD',
            value: 52000,
            // transaction_id: route.query.TransId,
            source: 'pelak-status-desktop'
          })
          pelaks.value = r.data.plaques;
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
          sendOTP.value = false;
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
  pelaks.value = null;
  errMessage.value = null;
};
const reset = () => {
  sendOTP.value = false;
  negativeScore.value = null;
  errMessage.value = null;
};
</script>

<template>
  <div>
    <SharedLoginModal v-if="loginModal" @close="loginModal = false" :initial-mobile="initialMobile" />
    <div v-if="pelaks" class="flex flex-col space-y-3">
      <button @click="newInquiry"
        class="flex items-center gap-5 bg-blue-50 font-semibold text-brand-blue px-4 py-2 rounded-full w-fit">
        <p>استعلام جدید</p>
        <NuxtIcon name="arrow-left" />
      </button>

      <div class="flex flex-col space-y-3 max-h-96 overflow-y-auto px-2">
        <!-- <div class="flex justify-between gap-10 items-center farsi-num border py-3 border-blue-500 rounded-md px-4">
              <p>کد ملی مالک پلاک:</p>
              <p>{{ form.nationalCode }}</p>
            </div> -->
        <div class="flex flex-col space-y-4" v-for="(pelak, index) in pelaks" :key="index">
          <div class="flex flex-col items-center farsi-num border bg-white border-blue-500 rounded-md overflow-x-auto">
            <div class="flex items-center justify-between w-full bg-blue-200 p-3 font-semibold">
              <p class="text-center">شماره پلاک</p>
              <p class="text-center">شماره سریال</p>
              <p class="text-center">تاریخ فک پلاک</p>
              <p class="text-center">محل فک پلاک</p>
            </div>
            <div class="flex justify-between w-full px-3 py-5 text-center">
              <p class="text-center">
                {{ pelak.plaque }}
              </p>
              <p class="text-center">
                {{ pelak.secInSerial }}
              </p>
              <p v-if="pelak.mnfk_SHDN_DATE" class="text-center">
                {{ pelak.mnfk_SHDN_DATE }}
              </p>
              <p v-else class="text-center">
                -
              </p>
              <p v-if="pelak.description" class="text-center">
                {{ pelak.description }}
              </p>
              <p v-else class="text-center">
                پلاک فعال است
              </p>
            </div>
          </div>
        </div>
      </div>
      >
    </div>
    <VForm v-else class="flex flex-col gap-1" :validation-schema="schema" :initial-values="initialValues"
      v-slot="{ meta: formMeta, errors: formErrors }" @submit="handleSubmit">
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
            کد ملی و شماره موبایل می‌بایست متعلق به یک فرد (مالک خودرو) باشد.
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

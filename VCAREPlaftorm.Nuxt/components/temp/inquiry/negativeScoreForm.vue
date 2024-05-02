<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";

// Composables
const { authUser, authWallet } = useAuth();
const cookieWallet = useCookie("wallet", { domain: "iranecar.com" });
const { getTotalAmount } = useWallet();
const { inquiryNegativeScore, sendInquiryOTP } = useInquiry();

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema = object({
  licenceNo: string()
    .min(10, "شماره گواهینامه 10 رقم می باشد")
    .required("شماره گواهینامه الزامی است"),
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
  licenceNo: "",
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
const negativeScore = ref();
const licenceNo = ref()
const fakeData = {
  negPoint: "0",
  ruleId: "0",
  allowable: "1",
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
  licenceNo.value = form.licenceNo
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
    inquiryNegativeScore(form)
      .then((r) => {
        if (r.status == 200) {
          // Tracking spend_wallet_credit event + parameter through Google Tag Manager
          window.dataLayer.push({
            'event': 'spend_wallet_credit',
            currency: 'USD',
            value: 52000,
            // transaction_id: route.query.TransId,
            source: 'negative-score-desktop'
          })
          negativeScore.value = r.data;
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
          sendOTP.value = false;
        }
      })
      .catch((err) => {
        errMessage.value = err.data.messages[0];
        loading.value = false;
      });
  } else {
    loading.value = true;
    inquiryNegativeScore(form)
      .then((r) => {
        if (r.status == 200) {
          // Tracking spend_wallet_credit event + parameter through Google Tag Manager
          window.dataLayer.push({
            'event': 'spend_wallet_credit',
            currency: 'USD',
            value: 52000,
            // transaction_id: route.query.TransId,
            source: 'negative-score-desktop'
          })
          negativeScore.value = r.data;
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
  negativeScore.value = null;
  errMessage.value = null;
  initialValues.firstTwoDigits = "";
  initialValues.plateAlphabet = "";
  initialValues.threeDigits = "";
  initialValues.iranDigits = "";
};
const reset = () => {
  sendOTP.value = false;
  negativeScore.value = null;
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
    <div v-if="negativeScore" class="flex flex-col space-y-3">
      <button
        @click="newInquiry"
        class="flex items-center gap-5 bg-blue-50 font-semibold text-brand-blue px-4 py-2 rounded-full w-fit"
      >
        <p>استعلام جدید</p>
        <NuxtIcon name="arrow-left" />
      </button>

      <div class="flex flex-col space-y-3 max-h-96 bg-white">
        <div class="flex flex-col space-y-4">
          <div
            class="flex flex-col items-center farsi-num border border-blue-500 rounded-md overflow-x-auto"
          >
            <div
              class="flex items-center justify-between w-full bg-blue-200 p-3 font-semibold"
            >
              <p>شماره گواهینامه:</p>
              <p>
                {{ licenseNo }}
              </p>
            </div>
            <div
              class="flex items-center justify-center w-full px-3 py-12 text-center"
            >
              <p>
                نمره منفی گواهینامه شما: {{ negativeScore.negPoint }} می باشد.
              </p>
            </div>
          </div>
        </div>
      </div>
      >
    </div>
    <VForm
      v-else
      class="flex flex-col gap-1"
      :validation-schema="schema"
      :initial-values="initialValues"
      v-slot="{ meta: formMeta, errors: formErrors }"
      @submit="handleSubmit"
    >
      <div class="flex items-center justify-between">
        <div></div>
        <!-- <button @click="openCarModal"
                    class="flex items-center gap-5 bg-blue-50 font-semibold text-brand-blue px-4 py-2 rounded-full w-fit">
                    <p>انتخاب خودرو</p>
                    <NuxtIcon name="arrow-left" />
                </button> -->
        <button
          @click="reset"
          type="reset"
          class="flex items-center gap-5 text-brand-blue px-4 py-2 w-fit"
        >
          <p>پاک کردن فرم</p>
        </button>
      </div>
      <div>
        <InquiryInput
          type="tel"
          autocomplete="off"
          name="licenceNo"
          maxlength="10"
          label="شماره گواهینامه"
          dir="ltr"
        />
        <InquiryInput
          type="tel"
          autocomplete="off"
          name="nationalCode"
          maxlength="10"
          label="کد ملی دارنده گواهینامه"
          dir="ltr"
        />
        <InquiryInput
          type="text"
          name="mobile"
          maxlength="11"
          label="تلفن همراه دارنده گواهینامه"
          dir="ltr"
        />
        <InquiryInput
          v-if="sendOTP"
          type="tel"
          autocomplete="off"
          name="code"
          maxlength="5"
          :label="'کد ارسال شده به شماره ' + otpMobile"
          dir="ltr"
        />
      </div>
      <div
        class="border flex items-center gap-4 text-xs px-4 py-2 rounded-md"
        :class="
          errMessage
            ? 'bg-red-50 text-red-500 border-red-500'
            : 'bg-blue-50 text-blue-500 border-blue-500'
        "
      >
        <div v-if="errMessage" class="flex gap-4 items-center">
          <nuxt-icon name="cross" />
          <p class="font-bold" v-html="errMessage"></p>
        </div>
        <div v-else class="flex gap-4 items-center">
          <img src="/icons/tajob-blue.svg" alt="" />
          <p>
            شماره گواهینامه، کد ملی و شماره موبایل می‌بایست متعلق به یک فرد
            باشد.
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

<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";
const emit = defineEmits(["close", "confirm"]);
const props = defineProps({
  initialMobile: {
    type: String
  },
})

// Composables
const { generateOTP, verifyOTP, getUserInfo } = useIdentity();
const { getTotalAmount } = useWallet()
const { authToken, authUser, authWallet } = useAuth();
const cookieToken = useCookie('token', { domain: "iranecar.com" });
const cookieUser = useCookie('user', { domain: "iranecar.com" });
const cookieWallet = useCookie('wallet', { domain: "iranecar.com" });
const cookieOtp = useCookie("otp", { maxAge: 120, domain: "iranecar.com" });

// States
const loading = ref(false);
const errMessage = ref(null);
const otpValue = ref();
const timer = ref(null);
const interval = ref()

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: false,
  validateOnModelUpdate: true,
});
const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema1 = object({
  mobile: string()
    .matches(mobileRegex, "تلفن همراه معتبر نیست")
    .required("تلفن همراه الزامی است"),
});
const schema2 = object({
  code: string()
    .min(5, "کد تائید حداقل 5 رقم می‌باشد")
    .required("کد تائید الزامی است"),
});
const initialValues = reactive({
  mobile: props.initialMobile,
  code: "",
});


// Logics
// Send OTP SMS + Set OTP cookie to handle resend countdown
const handleRegister = (form) => {
  loading.value = true;
  cookieOtp.value = null
  generateOTP(form.mobile)
    .then(async (r) => {
      if (r.status === 200) {
        // Google Tag Manager 
        window.dataLayer.push({ 'event': 'OTPGenerated', 'otpGenerated': true })
        errMessage.value = null;
        const otpExpireDate = new Date(Date.now() + 120 * 1000).toUTCString();
        cookieOtp.value = await [otpExpireDate, form.mobile];
        loading.value = false;
        countDown();
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
        loading.value = false;
      }
    })
    .catch((err) => {
      errMessage.value = err.data[0].errorDescription;
      loading.value = false;
    });
};


// Verify OTP
const handleVerify = async (form) => {
  errMessage.value = null;
  loading.value = true;
  form.mobile = cookieOtp.value[1];
  form.code = otpValue.value
  verifyOTP(form)
    .then(async (r) => {
      if (r.status === 200) {
        errMessage.value = null;
        cookieOtp.value = await null;
        cookieToken.value = await r.data.token;
        authToken.value = await cookieToken.value;
        await getUserInfo().then(async (r) => {
          if (r.status === 200) {
            cookieUser.value = await r.data;
            authUser.value = await cookieUser.value;

            // Tracking User by UserId through Google Tag Manager
            const userId = await authUser.value.userId
            await window.dataLayer.push({ 'event': 'login', 'method': 'OTP', 'userId': userId })
          }
        });
        await getTotalAmount()
          .then(async (r) => {
            cookieWallet.value = await r;
            authWallet.value = await cookieWallet.value;
            loading.value = false;
          })
          .catch((err) => {
            errMessage.value = r.messages[0];
            loading.value = false;
          });
        cookieOtp.value = await null;
        await emit('close');
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
        loading.value = false;
      }
    })
    .catch((err) => {
      errMessage.value = err.data[0].errorDescription;
      loading.value = false;
    });
};

// Countdown based on cookieOTP
const countDown = () => {
  if (!cookieOtp.value || cookieOtp.value == null) {
    return (timer.value = null);
  } else {
    const expireTime = new Date(cookieOtp.value[0]).getTime();
    interval.value = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDifference = expireTime - currentTime;
      const remainingMinutes = Math.floor(
        (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
      );
      const remainingSeconds = Math.floor(
        (timeDifference % (60 * 1000)) / 1000
      );
      if (timeDifference <= 0) {
        cookieOtp.value == null
        clearInterval(interval.value);
        return (timer.value = null);
      } else {
        return (timer.value = `${remainingMinutes}:${remainingSeconds}`);
      }
    }, 1000)
  };
};

// reset Otp for edit phonenumber
const resetOTP = async () => {
  await clearInterval(interval.value);
  cookieOtp.value = await null;
  timer.value = await null;
}
</script>

<template>
  <div @keyup.esc="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-slate-800/50 z-50">
    <form v-if="cookieOtp || timer !== null" @submit.prevent="handleVerify"
      class="relative flex flex-col w-[300px] md:w-[450px] h-96 bg-slate-50 px-8 md:px-14 pt-2 pb-5 items-center justify-evenly">
      <button class="absolute top-0 left-0 p-3 hover:bg-slate-200" @click="$emit('close')">
        <img class="w-6" src="/icons/cross.svg" />
      </button>
      <LogoIranecar />
      <div class="flex flex-col items-center gap-3 w-full farsi-num">
        <h1 class="font-bold self-start">کد تائید را وارد کنید.</h1>

        <p class="self-start text-xs">
          کد تائید به شماره همراه
          <span class="font-semibold leading-5 tracking-wide">{{ cookieOtp[1] }}</span>
          ارسال شد.
        </p>
        <!-- <div class="flex justify-between w-full">
              <button :disabled="timer" :class="timer ? 'text-gray-400' : 'text-blue-400'">
                {{ timer }} ارسال مجدد
              </button>
              <button @click="resetOTP">تغییر شماره همراه</button>
            </div> -->

        <SharedOtp :digit-count="5" @update:otp="otpValue = $event">
        </SharedOtp>

        <div class="flex justify-between w-full text-xs mt-2">
          <button :disabled="timer" :class="timer ? 'text-gray-400' : 'text-blue-400'">
            {{ timer }} ارسال مجدد
          </button>
          <button @click="resetOTP()">
            تغییر شماره همراه
          </button>
        </div>
      </div>
      <div v-if="errMessage"
        class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400">
        <img src="@/assets/icons/error.svg" alt="" />
        <p>{{ errMessage }}</p>
      </div>
      <button :disabled="!otpValue || loading" type="submit"
        class="flex gap-3 items-center justify-center rounded-md font-semibold w-full text-white py-2 px-6 text-sm outline-1 outline-offset-4 outline-blue-500"
        :class="otpValue ? 'bg-brand-red' : 'bg-gray-400'">
        ادامه
        <SharedLoading v-if="loading" />
      </button>
    </form>

    <VForm v-else :validation-schema="schema1" :initial-values="initialValues" v-slot="{ meta: formMeta }"
      @submit="handleRegister"
      class="relative flex flex-col w-[300px] md:w-[450px] h-96 bg-slate-50 px-8 md:px-14 pt-2 pb-5 items-center justify-evenly">
      <button class="absolute top-0 left-0 p-3 hover:bg-slate-200" @click="$emit('close')">
        <img class="w-6" src="/icons/cross.svg" />
      </button>
      <LogoIranecar />
      <h1 class="font-bold self-start">ورود | ثبت نام</h1>
      <p class="text-sm">برای ورود به سامانه شماره موبایل خود را وارد کنید.</p>
      <ElementsVTextInput :autofocus="true" type="text" name="mobile" maxlength="11" placeholder="09" dir="ltr" />
      <div class="flex items-center text-xs gap-2">
        <img src="@/assets/icons/exclamation.svg" alt="" />
        <p class="leading-6">
          در صورتی که حساب کاربری ندارید با وارد کردن شماره موبایل خود ثبت
          نام خواهید شد.
        </p>
      </div>
      <button :disabled="!formMeta.valid || loading" type="submit"
        class="flex gap-3 items-center justify-center rounded-md font-semibold w-full text-white py-2 px-6 text-sm outline-1 outline-offset-4 outline-blue-500"
        :class="formMeta.valid ? 'bg-brand-red' : 'bg-gray-400'">
        ورود / ثبت نام
        <SharedLoading v-if="loading" />
      </button>
      <div v-if="errMessage"
        class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400">
        <img src="@/assets/icons/error.svg" alt="" />
        <p>{{ errMessage }}</p>
      </div>
      <p class="text-xs leading-6 self-start">
        ورود شما به منزله‌ی پذیرش
        <NuxtLink class="text-brand-purple font-semibold" to="/conditions-rules" target="_blank">
          قوانین و مقررات
        </NuxtLink>
        ایرانی کار است.
      </p>
    </VForm>
  </div>
</template>

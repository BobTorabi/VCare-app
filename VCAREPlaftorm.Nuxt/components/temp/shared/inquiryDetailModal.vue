<script setup>
const emit = defineEmits(["close", "confirm"]);
const cookieToken = useCookie("token", { domain: "iranecar.com" });
const cookieUser = useCookie("user", { domain: "iranecar.com" });
const cookieWallet = useCookie("wallet", { domain: "iranecar.com" });
const cookieOtp = useCookie("otp", { maxAge: 120, domain: "iranecar.com" });
const config = useRuntimeConfig();
const router = useRouter();
const loading = ref(false);
const mobile = ref();
const otpCode = ref();
const errMessage = ref(null);
if (cookieOtp.value) {
  mobile.value = cookieOtp.value[1];
}

// Generate OTP
const generateOTP = async () => {
  loading.value = true;
  const data = await $fetch(`/User/GenerateOTP`, {
    baseURL: config.SERVER_URL,
    method: "POST",
    body: { mobile: mobile.value },
  }).catch((err) => (errMessage.value = err.data.messages[0]));
  loading.value = false;
  if (data.status === 200) {
    errMessage.value = null;
    const otpExpireDate = new Date(Date.now() + 120 * 1000).toUTCString();
    cookieOtp.value = [otpExpireDate, mobile.value];
  }
};

// Verify
const verifyOTP = async () => {
  if (cookieOtp.value) {
    mobile.value = cookieOtp.value[1];
  }
  loading.value = true;
  const data = await $fetch(`/User/Verify`, {
    baseURL: config.SERVER_URL,
    method: "POST",
    body: { mobile: mobile.value, code: otpCode.value },
  }).catch((err) => (errMessage.value = err.data.messages[0]));
  loading.value = false;
  if (data.status === 200) {
    cookieToken.value = data.data.token;
    const user = await $fetch(`/User/GetUserInfo`, {
      baseURL: config.SERVER_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + cookieToken.value,
        "Content-Type": "application/json",
      },
    }).catch((err) => (errMessage.value = err.data.messages[0]));
    if (user.status === 200) {
      cookieUser.value = await user.data;
    }
    cookieWallet.value = await $fetch(`/Wallet/TotalAmount`, {
      baseURL: config.SERVER_WALLET_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + cookieToken.value,
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
    await router.go();
  } else {
    errMessage.value = data.messages[0];
  }
  cookieOtp.value = await null;
};

const timer = ref();
const countDown = computed(() => {
  setInterval(() => {
    const time = new Date(cookieOtp.value[0]).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = time - currentTime;
    const remainingMinutes = Math.floor(
      (timeDifference % (60 * 60 * 1000)) / (60 * 1000)
    );
    const remainingSeconds = Math.floor((timeDifference % (60 * 1000)) / 1000);
    if (timeDifference <= 0) {
      clearInterval();
      return (timer.value = null);
    } else {
      return (timer.value = `${remainingMinutes}:${remainingSeconds}`);
    }
  }, 1000);
});
</script>

<template>
  <div
    @keyup.esc="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-slate-800/50 z-50"
  >
    <div
      v-if="cookieOtp && Date.now() < new Date(cookieOtp)"
      class="relative flex flex-col w-[300px] md:w-[450px] h-96 bg-slate-50 px-8 md:px-14 pt-2 pb-5 items-center justify-evenly"
    >
      <button
        class="absolute top-0 left-0 p-3 hover:bg-slate-200"
        @click="$emit('close')"
      >
        <img class="w-6" src="/icons/cross.svg" />
      </button>
      <h1 class="font-bold self-start">کد تائید را وارد کنید.</h1>
      <p class="text-sm farsi-num">
        کد تائید به شماره همراه {{ mobile }} ارسال شد.
      </p>
      <input
        @keyup.enter="verifyOTP"
        v-model="otpCode"
        dir="ltr"
        class="w-full border py-2 farsi-num px-4 text-sm"
      />
      <p class="text-xs text-blue-400 farsi-num">
        دریافت مجدد کد {{ countDown }}{{ timer }}
      </p>
      <div
        v-if="errMessage"
        class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 15C10.2333 15 10.4292 14.9208 10.5875 14.7625C10.7458 14.6042 10.825 14.4083 10.825 14.175C10.825 13.9417 10.7458 13.7458 10.5875 13.5875C10.4292 13.4292 10.2333 13.35 10 13.35C9.76667 13.35 9.57083 13.4292 9.4125 13.5875C9.25417 13.7458 9.175 13.9417 9.175 14.175C9.175 14.4083 9.25417 14.6042 9.4125 14.7625C9.57083 14.9208 9.76667 15 10 15ZM9.325 11.175H10.825V4.85H9.325V11.175ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3583 0 9.975C0 8.60833 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.02917 3.825 2.9375 2.925C3.84583 2.025 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.64167 0 10.025 0C11.3917 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.975 16.1542 17.075 17.0625C16.175 17.9708 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10.025 18.5C12.375 18.5 14.375 17.6708 16.025 16.0125C17.675 14.3542 18.5 12.3417 18.5 9.975C18.5 7.625 17.675 5.625 16.025 3.975C14.375 2.325 12.3667 1.5 10 1.5C7.65 1.5 5.64583 2.325 3.9875 3.975C2.32917 5.625 1.5 7.63333 1.5 10C1.5 12.35 2.32917 14.3542 3.9875 16.0125C5.64583 17.6708 7.65833 18.5 10.025 18.5Z"
            fill="#FF0036"
          />
        </svg>
        <p>{{ errMessage }}</p>
      </div>
      <button
        @click="verifyOTP"
        class="flex items-center justify-center bg-brand-red w-full text-white py-2 px-6 text-sm"
      >
        ادامه
        <SharedLoading v-if="loading" />
      </button>
    </div>

    <div
      v-else
      class="relative flex flex-col w-[300px] md:w-[450px] h-96 bg-slate-50 px-8 md:px-14 pt-2 pb-5 items-center justify-evenly"
    >
      <button
        class="absolute top-0 left-0 p-3 hover:bg-slate-200"
        @click="$emit('close')"
      >
        <img class="w-6" src="/icons/cross.svg" />
      </button>
      <img src="/icons/logo.svg" alt="Iranecar" />
      <h1 class="font-bold self-start">ورود | ثبت نام</h1>
      <p class="text-sm">برای ورود به سامانه شماره موبایل خود را وارد کنید.</p>
      <input
        @keyup.enter="generateOTP"
        v-model="mobile"
        placeholder="09"
        dir="ltr"
        class="w-full border py-2 farsi-num px-4 text-sm"
      />
      <div
        v-if="errMessage"
        class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10 15C10.2333 15 10.4292 14.9208 10.5875 14.7625C10.7458 14.6042 10.825 14.4083 10.825 14.175C10.825 13.9417 10.7458 13.7458 10.5875 13.5875C10.4292 13.4292 10.2333 13.35 10 13.35C9.76667 13.35 9.57083 13.4292 9.4125 13.5875C9.25417 13.7458 9.175 13.9417 9.175 14.175C9.175 14.4083 9.25417 14.6042 9.4125 14.7625C9.57083 14.9208 9.76667 15 10 15ZM9.325 11.175H10.825V4.85H9.325V11.175ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3583 0 9.975C0 8.60833 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.02917 3.825 2.9375 2.925C3.84583 2.025 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.64167 0 10.025 0C11.3917 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.975 16.1542 17.075 17.0625C16.175 17.9708 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10.025 18.5C12.375 18.5 14.375 17.6708 16.025 16.0125C17.675 14.3542 18.5 12.3417 18.5 9.975C18.5 7.625 17.675 5.625 16.025 3.975C14.375 2.325 12.3667 1.5 10 1.5C7.65 1.5 5.64583 2.325 3.9875 3.975C2.32917 5.625 1.5 7.63333 1.5 10C1.5 12.35 2.32917 14.3542 3.9875 16.0125C5.64583 17.6708 7.65833 18.5 10.025 18.5Z"
            fill="#FF0036"
          />
        </svg>
        <p>{{ errMessage }}</p>
      </div>
      <div class="flex text-xs space-x-2 space-x-reverse mt-5">
        <svg
          width="21"
          height="20"
          viewBox="0 0 21 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M10.3618 20C8.98795 20 7.71108 19.7458 6.53119 19.2375C5.3513 18.7292 4.32496 18.025 3.45216 17.125C2.57937 16.225 1.89648 15.1667 1.40351 13.95C0.910547 12.7333 0.664062 11.4167 0.664062 10C0.664062 8.6 0.910547 7.29167 1.40351 6.075C1.89648 4.85833 2.57937 3.8 3.45216 2.9C4.32496 2 5.3513 1.29167 6.53119 0.775C7.71108 0.258333 8.98795 0 10.3618 0C11.7195 0 12.9883 0.258333 14.1682 0.775C15.348 1.29167 16.3744 2 17.2472 2.9C18.12 3.8 18.8069 4.85833 19.308 6.075C19.809 7.29167 20.0595 8.6 20.0595 10C20.0595 11.4167 19.809 12.7333 19.308 13.95C18.8069 15.1667 18.12 16.225 17.2472 17.125C16.3744 18.025 15.348 18.7292 14.1682 19.2375C12.9883 19.7458 11.7195 20 10.3618 20ZM10.3618 7.15C10.5881 7.15 10.778 7.075 10.9315 6.925C11.0851 6.775 11.1619 6.58333 11.1619 6.35C11.1619 6.11667 11.0851 5.91667 10.9315 5.75C10.778 5.58333 10.5881 5.5 10.3618 5.5C10.1355 5.5 9.9456 5.58333 9.79206 5.75C9.63851 5.91667 9.56173 6.11667 9.56173 6.35C9.56173 6.58333 9.63851 6.775 9.79206 6.925C9.9456 7.075 10.1355 7.15 10.3618 7.15ZM9.7072 15H11.1619V9H9.7072V15Z"
            fill="#5A189A"
          />
        </svg>
        <p>
          در صورتی که حساب کاربری ندارید با وارد کردن شماره موبایل خود ثبت نام
          خواهید شد.
        </p>
      </div>
      <button
        @click="generateOTP"
        class="flex items-center justify-center bg-brand-red w-full text-white py-2 px-6 text-sm"
      >
        ورود / ثبت نام
        <SharedLoading v-if="loading" />
      </button>
      <p class="text-xs">
        ورود شما به منزله‌ی پذیرش
        <NuxtLink
          class="text-brand-purple font-semibold"
          to="/conditions-rules"
          target="_blank"
        >
          شرایط و قوانین
        </NuxtLink>
        و
        <NuxtLink
          class="text-brand-purple font-semibold"
          to="/privacy-policy"
          target="_blank"
        >
          حریم خصوصی
        </NuxtLink>
        می‌باشد.
      </p>
    </div>
  </div>
</template>

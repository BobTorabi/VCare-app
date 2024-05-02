<script setup>
const emit = defineEmits(["close", "confirm"]);
const config = useRuntimeConfig();
const { authUser, authToken, authWallet } = useAuth();
const { increaseWalletByGiftCode , getTotalAmount } = useWallet();
const cookieWallet = useCookie("wallet");
const loading = ref(false);
const balance = ref();
const giftCode = ref();
const errMessage = ref(null);
const success = ref(false)
const form = reactive({
  userId: authUser.value.userId,
  giftCode: '',

})

// Increase Wallet
const IncreaseWallet = async () => {
  loading.value = true;
  const data = await $fetch(`/Payment/PrepareIncreaseWallet`, {
    baseURL: config.SERVER_WALLET_URL,
    method: "POST",
    body: { amount: balance.value, callbackUrl: config.CALLBACK_URL },
    headers: {
      Authorization: "Bearer " + authToken.value,
      "Content-Type": "application/json",
    },
  }).catch((err) => (errMessage.value = err.data.messages[0]));
  loading.value = false;
  if (data.success === true) {
    window.location.href = data.data.url;
  }
};


const isNumber = (event) => {
  if (!/\d/.test(event.key)) {
    return event.preventDefault();
  } else {
    balance.value = (event.target.value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }
}
const useGiftCode = () => {
  success.value = false
  increaseWalletByGiftCode(form)
    .then((r) => {
      if (r.success == true) {
        errMessage.value = null
        getTotalAmount()
          .then((r) => {
            cookieWallet.value = r;
            authWallet.value = cookieWallet.value;
          })
          .catch((err) => (errMessage.value = err.data.messages[0]));
        success.value = true
      } else if (r.success == false) {
        (errMessage.value = r.responseMessages[0].message)
      }
    })
    .catch((err) => (errMessage.value = err.data[0].message));
}

</script>

<template>
  <div @keyup.esc="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-slate-800/50 z-50">
    <div
      class="relative flex flex-col gap-4 w-[300px] md:w-[450px] h-[400] bg-slate-50 px-3 md:px-8 pt-8 pb-5 items-center  farsi-num">
      <button class="absolute top-0 left-0 p-3 hover:bg-slate-200" @click="$emit('close')">
        <nuxt-icon class="w-6" name="cross" />
      </button>
      <h1 class="font-bold self-start">افزایش اعتبار کیف پول با کد هدیه</h1>

      <div class="flex items-center gap-3 w-full">
        <input @keyup.enter="useGiftCode" v-model="form.giftCode" type="text" placeholder="کد هدیه"
          class="w-full border py-2 px-4 text-sm" />
        <button @click="useGiftCode"
          class="flex items-center justify-center bg-brand-red text-white py-2 px-6 text-sm rounded-md whitespace-nowrap">
          دریافت هدیه
        </button>
      </div>

      <h1 class="font-bold self-start">افزایش اعتبار کیف پول از طریق درگاه بانکی</h1>
      <div class="flex flex-wrap gap-2 justify-center items-center text-brand-red text-xs">
        <button @click="balance = '500,000'" class="border border-brand-red py-1 px-2 rounded-md"
          :class="balance === '500,000' ? 'bg-brand-red text-white' : ''">
          500,000 ریال
        </button>
        <button @click="balance = '1,000,000'" class="border border-brand-red py-1 px-2 rounded-md"
          :class="balance === '1,000,000' ? 'bg-brand-red text-white' : ''">
          1,000,000 ریال
        </button>
        <button @click="balance = '1,500,000'" class="border border-brand-red py-1 px-2 rounded-md"
          :class="balance === '1,500,000' ? 'bg-brand-red text-white' : ''">
          1,500,000 ریال
        </button>
        <button @click="balance = '2,000,000'" class="hidden md:block border border-brand-red py-1 px-2 rounded-md"
          :class="balance === '2,000,000' ? 'bg-brand-red text-white' : ''">
          2,000,000 ریال
        </button>
      </div>

      <div class="flex items-center gap-3 w-full">

        <input @keyup.enter="IncreaseWallet" @keyup="isNumber($event)" v-model="balance" type="tel"
          placeholder="رقم‌های دیگر (حداقل 500,000 ریال)" class="w-full border py-2 px-4 text-sm" />
        <p>
          ریال
        </p>
      </div>


      <button @click="IncreaseWallet"
        class="flex items-center justify-center bg-brand-blue text-white py-2 px-6 text-sm rounded-md">
        رفتن به درگاه بانکی
        <SharedLoading v-if="loading" />
      </button>

      <div v-if="errMessage"
        class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M10 15C10.2333 15 10.4292 14.9208 10.5875 14.7625C10.7458 14.6042 10.825 14.4083 10.825 14.175C10.825 13.9417 10.7458 13.7458 10.5875 13.5875C10.4292 13.4292 10.2333 13.35 10 13.35C9.76667 13.35 9.57083 13.4292 9.4125 13.5875C9.25417 13.7458 9.175 13.9417 9.175 14.175C9.175 14.4083 9.25417 14.6042 9.4125 14.7625C9.57083 14.9208 9.76667 15 10 15ZM9.325 11.175H10.825V4.85H9.325V11.175ZM10 20C8.63333 20 7.34167 19.7375 6.125 19.2125C4.90833 18.6875 3.84583 17.9708 2.9375 17.0625C2.02917 16.1542 1.3125 15.0917 0.7875 13.875C0.2625 12.6583 0 11.3583 0 9.975C0 8.60833 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.02917 3.825 2.9375 2.925C3.84583 2.025 4.90833 1.3125 6.125 0.7875C7.34167 0.2625 8.64167 0 10.025 0C11.3917 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3667 19.7375 12.6583 19.2125 13.875C18.6875 15.0917 17.975 16.1542 17.075 17.0625C16.175 17.9708 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10.025 18.5C12.375 18.5 14.375 17.6708 16.025 16.0125C17.675 14.3542 18.5 12.3417 18.5 9.975C18.5 7.625 17.675 5.625 16.025 3.975C14.375 2.325 12.3667 1.5 10 1.5C7.65 1.5 5.64583 2.325 3.9875 3.975C2.32917 5.625 1.5 7.63333 1.5 10C1.5 12.35 2.32917 14.3542 3.9875 16.0125C5.64583 17.6708 7.65833 18.5 10.025 18.5Z"
            fill="#FF0036" />
        </svg>
        <p>{{ errMessage }}</p>
      </div>
      <div v-if="success"
        class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-3 bg-green-100 text-green-700">
        <img src="@/assets/icons/check.svg" class="w-5" alt="" />
        <p>کیف پول شما با موفقیت شارژ شد</p>
      </div>

      <p class="text-xs leading-7">
        افزایش اعتبار کیف پول صرفا جهت پرداخت هزینه استعلام می‌باشد.
        پرداخت جریمه خودرو، پس از استعلام از
        طریق درگاه پرداخت بانکی صورت خواهد گرفت.
      </p>
      <p class="text-sm leading-7">

      </p>
    </div>
  </div>
</template>

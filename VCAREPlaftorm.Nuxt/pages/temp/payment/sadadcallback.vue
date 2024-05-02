<script setup>
const route = useRoute()
const config = useRuntimeConfig();
const cookieWallet = useCookie('wallet', { domain: "iranecar.com" })
const {authToken, authWallet } = useAuth()

if (route.query.status === '1') {
  cookieWallet.value = await $fetch(`/Wallet/TotalAmount`, {
    baseURL: config.SERVER_WALLET_URL,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + authToken.value,
      'Content-Type': 'application/json',
    },
  }).catch((err) => console.log(err))
  authWallet.value = cookieWallet.value
}
// Tracking purchase event + parameter through Google Tag Manager
onMounted(() => {
  if (route.query.status === '1') {
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      'event': 'purchase',
      ecommerce: {
        currency: 'USD', transaction_id: route.query.TransId, value: parseInt(route.query.Amount),
        items: [{
          item_id: "WALLET-02",
          item_name: "WALLET-DESKTOP",
        }]
      },
    })
  } 
});
</script>
<template>
  <div class="flex container mx-auto py-40 items-center justify-center h-full">

    <Head>
      <Title>وضعیت پرداخت</Title>
      <Meta name="description" content="وضعیت پرداخت" />
    </Head>

    <div class="flex flex-col space-y-8 items-center farsi-num" v-if="route.query.status === '0'">
      <h2 class="text-brand-red font-bold text-xl md:text-4xl">
        پرداخت شما ناموفق بود!
      </h2>
      <nuxt-icon class="text-brand-red w-10" name="success" />
      <p class="text-center">
        در صورت کسر وجه از حساب شما، تا 72 ساعت دیگر هزینه بازگشت داده خواهد شد.
      </p>
      <NuxtLink to="/profile/my-wallet" class="bg-brand-blue text-white py-2 px-10 text-sm w-fit" v-bind="$attrs">
        کیف پول
      </NuxtLink>
    </div>
    <div v-else class="flex flex-col space-y-8 items-center farsi-num font-bold">
      <h2 class="text-green-600 text-xl md:text-4xl">پرداخت شما موفق بود!</h2>
      <nuxt-icon class="text-green-600 w-10" name="success" />
      <h3>کد رهگیری : {{ route.query.TransId }}</h3>
      <h3>مبلغ تراکنش : {{ $seperator(route.query.Amount) }} ریال</h3>
      <NuxtLink to="/profile/my-wallet" class="bg-green-600 font-normal text-white py-2 px-10 text-sm w-fit"
        v-bind="$attrs">
        کیف پول
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
// Composables
const { authUser, authWallet } = useAuth();
</script>
<template>
  <div class="bg-gray-100 flex flex-col space-y-4 border rounded-md shadow-inner w-full px-2 py-3 whitespace-nowrap">
    <div class="flex justify-between gap-2">
      <div class="flex items-center gap-2">
        <img class="w-16" src="/images/user.png" alt="" />
        <div class="flex flex-col space-y-3 farsi-num">
          <p class="font-bold">
            {{ authUser.firstName }} {{ authUser.lastName }}
          </p>
          <p>{{ authUser.mobile }}</p>
        </div>
      </div>
      <NuxtLink to="/profile/my-info">
        <img src="/icons/pencil.svg" alt="">
      </NuxtLink>
    </div>
    <div class="flex items-center gap-3">
      <NuxtLink to="/profile/park-car"
        class="bg-brand-red w-1/2 flex justify-center gap-3 items-center px-3 py-2 rounded-md text-white">
        <img src="/icons/car.svg" alt="" />
        <p>پارک خودرو</p>
        <img src="/icons/plus.svg" alt="" />
      </NuxtLink>
      <NuxtLink to="/profile/my-wallet"
        class="bg-brand-blue w-1/2 flex justify-center gap-3 items-center px-3 py-2 rounded-md text-white farsi-num">
        <img src="/icons/wallet.svg" alt="" />
        <p>{{ $seperator(authWallet.data) }} <span class="text-xs">ریال</span></p>
      </NuxtLink>
    </div>
  </div>
</template>

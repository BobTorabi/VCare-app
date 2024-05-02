<script setup>
const { authUser } = useAuth();
</script>
<template>
  <div
    class="bg-gray-100 flex flex-col space-y-6 border rounded-md shadow-inner w-full px-2 pt-3 pb-4 whitespace-nowrap"
  >
    <h4 class="text-brand-blue font-bold">سرویس‌های پرکاربرد</h4>
    <div class="flex items-center text-xs gap-2">
      <NuxtLink
        to="https://shop.iranecar.com/category/3"
        class="bg-white h-20 w-1/3 shadow flex flex-col gap-3 items-center py-4 rounded-md hover:bg-purple-50"
      >
        <img class="w-6" src="/icons/oil.svg" alt="" />
        <p>روغن موتور</p>
      </NuxtLink>
      <NuxtLink
        to="/inquiry/fines-details"
        class="bg-white h-20 w-1/3 shadow flex flex-col gap-3 items-center py-4 rounded-md hover:bg-blue-50"
      >
        <img class="w-7" src="/icons/fines-details.svg" alt="" />
        <p>استعلام خلافی</p>
      </NuxtLink>
      <NuxtLink
        to="/profile/inspection"
        class="bg-white h-20 w-1/3 shadow flex flex-col gap-3 items-center py-4 rounded-md hover:bg-gray-50"
      >
        <img  class="w-6" src="/icons/car-simple.svg" alt="" />
        <p>کارشناسی خودرو</p>
      </NuxtLink>
    </div>
  </div>
</template>

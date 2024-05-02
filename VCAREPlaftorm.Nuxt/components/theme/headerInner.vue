<script setup>
const router = useRouter();
const handleHistoryBack = () => {
  router.go(-1);
};
const { authUser } = useAuth();
</script>
<template>
  <div>
    <div class="flex justify-between items-center mx-1 py-[6px]">
      <button @click="handleHistoryBack" class="flex-none">
        <img src="~/assets/images/back-icon.png" class="w-[67px] h-[67px]" alt="" />
      </button>
      <div
        class="flex font-bold text-lg -mt-1 w-full flex-initial shadow-sm bg-white h-[49px] px-2 rounded-md leading-[48px] capitalize">
        <NuxtIcon name="person" filled="" class="mx-2" />
        {{ authUser.firstName }} {{ authUser.lastName }}
      </div>
      <NuxtLink to="/" class="flex-none"><img src="~/assets/images/home-icon.png" class="w-[67px] h-[67px]" alt="" />
      </NuxtLink>
    </div>
  </div>
</template>

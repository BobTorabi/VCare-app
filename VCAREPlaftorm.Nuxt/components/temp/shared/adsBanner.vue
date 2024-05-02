<script  setup>

// **** THIS COMPONENT NOT WORKING BECAUSE MAKE ERROR FOR DEFAULT LAYOUT -- THEN BANNER SET IN HEADER.VUE *****

// const props = defineProps({
//   type: {
//     activeAds: Boolean,
//     default: false,
//   },
// });

</script>
<template>
    <!-- <div v-if="activeAds" -->
    <div
        class="block fixed right-0 top-0 w-full h-8 lg:h-14 m-0 p-0 shadow-md z-50 max-h-14">
    <!-- desktop -->
        <NuxtLink to="https://ehsan.charity/?utm_source=IraneCarV2.com&utm_medium=TopBannerCharity" class="w-full h-14" target="_blank">
            <img 
                class="hidden lg:block w-full h-14 object-cover" 
                src="/images/banner-desktop.png" 
                alt=""
            />
        </NuxtLink>
    <!-- mobile -->
        <NuxtLink to="https://ehsan.charity/?utm_source=IraneCarV2.com&utm_medium=TopBannerCharity" class="w-full h-8" target="_blank">
            <img 
                class="lg:hidden w-full h-8 object-cover" 
                src="/images/banner-mobile.png" 
                alt=""
            />
        </NuxtLink>
    </div>
</template>
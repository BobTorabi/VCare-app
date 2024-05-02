<script setup>
useHead({
  titleTemplate: (title) => `VCare - ${title}`,
  htmlAttrs: {
    lang: "en",
  },
  // meta: [{ name: 'description', content: 'ایرانی کار' }],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
const route = useRoute();
</script>
<template>
  <div dir="ltr" className="text-sm overflow-x-hidden flex flex-col">
    <ThemeHeader class="shrink-0 w-full z-10 print:hidden" />
    <div class="flex gap-3 2xl:container 2xl:mx-auto pt-5 pb-20 px-5">
      <div class="hidden lg:flex flex-col items-center space-y-2 w-80 shrink-0">
        <ProfileInfo />
        <ProfileServices />
        <ProfileLinks />
      </div>
      <slot className="flex-1 z-20" />
    </div>
    <ThemeFooter class="w-full print:hidden" />
  </div>
</template>

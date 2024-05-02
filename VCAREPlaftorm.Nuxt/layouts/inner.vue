<script setup>
useHead({
  titleTemplate: (title) => `VCare -  ${title}`,
  htmlAttrs: {
    lang: "en",
  },
  lang: ["en"],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
<template>
  <div dir="ltr" className="max-w-screen-md mx-auto text-sm overflow-x-hidden flex flex-col">
    <!-- margin top 14 and 10 is for Ads Banner | -->
    <!-- <SharedAdsBanner /> -->
    <ThemeHeaderInner class="shrink-0 w-full" />
    <slot className="flex-auto" />
    <ThemeFooterInner class="w-full" />
  </div>
</template>

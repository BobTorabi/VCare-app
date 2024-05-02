<script setup>
useHead({
  titleTemplate: (title) => `VCare - ${title}`,
  htmlAttrs: {
    lang: "en",
  },
  //   meta: [{ name: "description", content: "ایرانی کار" }],
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
});
</script>
<template>
  <div dir="ltr" className="text-sm overflow-x-hidden h-screen">
    <slot class="h-full" />
  </div>
</template>

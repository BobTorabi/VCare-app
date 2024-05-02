<script setup>
useHead({
  titleTemplate: (title) => `VCare - ${title}`,
  htmlAttrs: {
    lang: 'en'
  },
  lang: ['en'],
  link: [{ rel: 'icon', type: "image/x-icon", href: '/favicon.ico' }]
})
</script>
<template>
  <div dir="ltr" className="text-sm overflow-x-hidden flex flex-col">
    <NavakHeader class="shrink-0 w-full print:hidden" />
    <slot className="flex-auto" />
    <NavakFooter class="w-full print:hidden" />
  </div>
</template>

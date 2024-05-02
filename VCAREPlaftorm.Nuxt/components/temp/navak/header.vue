<script setup>
// States
const menuItems = [
  {
    title: "سرویس‌ها",
    linkTo: "/navak/#services",
  },
  {
    title: "خدمات ناوک",
    linkTo: "/navak/#works",
  },
  {
    title: "ارتباط با ما",
    linkTo: "/navak/contact-us",
  },
  {
    title: "درباره ما",
    linkTo: "/navak/about-us",
  },
];
</script>

<template>
  <!-- Main Top Menu -->
  <div
    class=" h-20 lg:h-fit lg:bg-white flex justify-between items-center border-b-4 border-brand-blue xl:container mx-auto px-5 py-4 lg:shadow-none">

    <!-- Left Section -->
    <div class="flex justify-end lg:gap-6 text-xs z-10 w-1/3 lg:w-auto whitespace-nowrap">
      <LogoNavak />
    </div>

    <!-- Desktop Menu -->
    <ThemeDesktopMenu :menuItems="menuItems" />

  </div>
</template>

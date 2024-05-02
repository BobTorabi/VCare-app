<script setup>
// Composables
const route = useRoute();
</script>

<template>
  <div class="">
    <!-- Mobile Footer -->
    <div
      class="max-w-screen-md mx-auto fixed shadow-lg bottom-0 left-3 right-3 bg-white h-16 flex justify-between items-center px-4 py-2 mb-3 text-xs z-40 rounded-2xl">
      <NuxtLink to="/report/myReport" class="flex flex-col space-y-0.5 items-center">
        <span :class="route.path === '/report/myReport' || route.path === '/report/detail'
          ? 'flex opacity-100'
          : 'flex opacity-40'
          ">
          <NuxtIcon name="pie-chart" filled="" />
        </span>
        <p :class="route.path === '/report/myReport' || route.path === '/report/detail'
          ? 'text-color-neu-dark font-bold'
          : 'text-color-neu font-bold'
          ">
          My reports
        </p>
      </NuxtLink>
      <NuxtLink to="/library" class="flex flex-col space-y-0.5 items-center">
        <span :class="route.path === '/library' || route.path === '/library/list' || route.path === '/library/details' || route.path === '/library/sub-category'
          ? 'flex opacity-100'
          : 'flex opacity-40'
          ">
          <NuxtIcon name="library" filled="" />
        </span>
        <p :class="route.path === '/library' || route.path === '/library/list' || route.path === '/library/details' || route.path === '/library/sub-category'
          ? 'text-color-neu-dark font-bold'
          : 'text-color-neu font-bold'
          ">
          Library
        </p>
      </NuxtLink>
    </div>
  </div>
</template>

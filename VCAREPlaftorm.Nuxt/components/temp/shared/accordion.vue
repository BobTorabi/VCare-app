<script setup>

  const state = reactive({
    isOpen: false
  });

  defineProps({
      title: String
  });

</script>

<template>
  <div class="w-full border shadow rounded-md p-2 my-2">
      <div 
        v-on:click="state.isOpen = !state.isOpen" 
        class="flex rounded-md text-gray-900  font-semibold cursor-pointer justify-between"
      >
        <span class="inline-flex flex-row items-center gap-2">
          <NuxtIcon name="faqIcon" class="w-4 h-4 md:w-5 md:h-5 text-brand-red" />
          {{ title }}
        </span>
        
        <NuxtIcon name="chevron-down" class="w-5 h-5 md:w-6 md:h-6 text-brand-red" :class="state.isOpen ? 'rotate-180' : ''" />
        
      </div>
      <div class="mt-0 p-2 rounded" :class="state.isOpen ? 'block' : 'hidden'">
        <hr class="mb-2"/>
          <slot></slot>
      </div>
  </div>
</template>
<script setup>
  const emit = defineEmits(["close"]);
</script>

<template>
  <div @keyup.esc="$emit('close')"
        @click="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center m-0 h-full w-screen bg-slate-800/50 z-40 rounded">
    <div
      class="relative w-screen md:w-11/12 h-full md:h-5/6  bg-white px-2 md:px-3 z-50 items-center justify-evenly rounded-md overflow-auto">
      <button class="absolute top-0 left-0 p-3 hover:bg-slate-200" @click="$emit('close')">
        <svg viewPort="0 0 12 12" version="1.1" width="15px" height="15px"
            xmlns="http://www.w3.org/2000/svg">
            <line x1="1" y1="11" x2="11" y2="1" stroke="black" stroke-width="2"/>
            <line x1="1" y1="1" x2="11" y2="11" stroke="black" stroke-width="2"/>
        </svg>
      </button>
        <div class="my-10">
            <InspectionTableData/>
        </div>
        <!-- <img 
            src="/images/inspection/inspectionPriceList.jpg" 
            class="h-auto w-full block pb-14 md:"
        /> -->
    </div>
  </div>
</template>

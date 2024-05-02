<script setup>
const props = defineProps({
  selectedCar: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["close", "confirm"]);
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div @keyup.esc="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-slate-800/50 z-50">
    <div v-click-away="closeModal"
      class="relative flex flex-col w-[300px] md:w-[450px] h-64 bg-white px-8 pt-8 pb-5 items-center justify-evenly farsi-num whitespace-nowrap">
      <button class="absolute top-0 left-0 p-3 hover:bg-slate-200" @click="$emit('close')">
        <NuxtIcon class="w-6" name="cross" />
      </button>
      <h5>آیا از حذف خودرو <span class="font-bold">{{ selectedCar[0].carGroupTitle }} {{ selectedCar[0].carModelTitle }}</span> مطمئن هستید؟</h5>
      <div class="flex gap-3 w-full">
        <button @click="$emit('confirm')" class="bg-brand-red w-1/2 flex gap-2 items-center justify-center px-3 py-2 rounded-md text-white" type="submit">
          <p>بله، اطمینان دارم</p>
        </button>
        <button @click="$emit('close')" class="bg-white border w-1/2 flex gap-2 items-center justify-center border-brand-blue text-brand-blue px-3 py-2 rounded-md">
          <p>خیر</p>
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
const props = defineProps({
  cars: {
    type: Object,
    required: true,
  },
});
const carID = ref();
const emit = defineEmits(["close", "confirm", "selectCarID"]);
const selectCar = () => {
  if (!carID.value) {
    return;
  } else {
    emit('close')
    emit("selectCarID", carID.value);
  }
};
</script>

<template>
  <div
    @keyup.esc="$emit('close')"
    class="fixed top-0 left-0 flex justify-center items-center h-screen w-screen bg-slate-800/50 z-50"
  >
    <div
      class="relative flex flex-col w-[300px] md:w-[550px] bg-slate-50 px-8 pt-8 pb-5 farsi-num"
    >
      <button
        class="absolute top-0 left-0 p-3 hover:bg-slate-200"
        @click="$emit('close')"
      >
        <nuxt-icon class="w-6" name="cross" />
      </button>
      <p class="absolute top-0 right-0 p-3 text-brand-blue font-semibold">
        انتخاب خودرو
      </p>
      <div
        v-for="(car, index) in cars"
        :key="index"
        class="flex items-center gap-6 border-b py-5"
      >
        <input
          type="radio"
          name="cars"
          :value="car.id"
          @change="carID = parseInt($event.target.value)"
        />
        <img class="w-20" src="/images/car1.png" alt="" />
        <div class="flex flex-col space-y-2">
          <div
            class="flex items-center gap-2 text-brand-blue font-semibold text-lg"
          >
            <p>{{ car.carGroupTitle }}</p>
            <p>{{ car.carModelTitle }}</p>
          </div>
          <div class="text-gray-400 flex gap-2">
            <span>
              {{ car.licensePlateIranDigits }}
            </span>
            <span>
              {{ car.licensePlateThreeDigits }}
            </span>
            <span>
              {{ car.licensePlateAlphabet }}
            </span>
            <span>
              {{ car.licensePlateFirstTwoDigits }}
            </span>
          </div>
        </div>
      </div>
      <NuxtLink
        to="/profile/park-car"
        class="flex items-center gap-2 py-5 text-brand-blue font-semibold text-lg w-fit"
      >
        پارک خودرو
      </NuxtLink>
      <button
        @click="selectCar"
        class="bg-brand-red w-32 flex justify-center gap-3 items-center px-3 py-2 rounded-md text-white self-end"
      >
        <p>تایید</p>
      </button>
    </div>
  </div>
</template>

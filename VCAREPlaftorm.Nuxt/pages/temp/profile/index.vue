<script setup>
definePageMeta({
  layout: "profile",
  middleware: "logged-in",
});
const cookieUser = useCookie("user", { domain: "iranecar.com" });

//Composables
const { getAllUserCars } = useGarage();


// States
const loading = ref(false)
const errMessage = ref(null);
const tab = ref(0);
const activeItem = ref(null)
const cars = ref([])
const tabs = [
  'خلاصه فعالیت ',
]

//Logics
// Initial User Cars Call
getAllUserCars()
  .then((r) => {
    if (r.status == 200) {
      cars.value = r.data;
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

</script>
<template>
  <div class="w-full">

    <Head>
      <Title>پنل کاربری</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <!-- Mobile Menu hidden on lg -->
    <div class="flex flex-col gap-5 lg:hidden">
      <ProfileInfo />
      <!-- <ProfileBanner /> -->
      <ProfileLinks />
    </div>

    <div class="hidden lg:flex flex-col space-y-2 w-full">
      <!-- Banner -->
      <!-- <ProfileBanner /> -->

      <!-- Tabs -->
      <ProfileTabs v-model="tab" :titles="tabs" />

      <div v-if="tab == 0" class="flex flex-col gap-3">
        <div class="flex-1 flex flex-col space-y-3 justify-center border rounded-md p-5">
          <span class="flex flex-row items-center justify-start gap-2">
            <NuxtIcon name="my-car" class="w-5 h-5 -mt-1 text-brand-blue" />
            <h5 for="inspection" class="font-bold">خودروهای من</h5>
          </span>

          <!-- Cars Component -->
          <div v-if="cars" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <button v-for="(car, index) in cars" :key="index" @click="selectCar(index)"
              class="relative flex items-center h-40 gap-4 rounded-md py-2 px-5 border border-gray-50 hover:bg-gray-100 "
              :class="activeItem == index ? 'text-black shadow-md border-gray-100' : 'text-gray-400 shadow-sm'">
              <div v-if="activeItem == index" class="absolute h-full w-2 bg-brand-red right-0 rounded-r-md"></div>
              <NuxtIcon class="border-2  p-3 rounded-md "
                :class="activeItem == index ? 'text-brand-red border-brand-red' : 'text-gray-400'" name="red-car" />
              <div class="flex flex-col space-y-3 farsi-num">
                <p class="font-bold">
                  {{ car.carGroupTitle }} {{ car.carModelTitle }}
                </p>
                <p>
                  {{ car.licensePlateIranDigits }}
                  {{ car.licensePlateThreeDigits }} {{ car.licensePlateAlphabet }}
                  {{ car.licensePlateFirstTwoDigits }}
                </p>
              </div>
            </button>
          </div>

          <!-- my orders -->
          <!-- <div class="w-full">
            <span class="flex flex-row items-center justify-start gap-2 mb-4">    
              <NuxtIcon name="bag" class="w-5 h-5 text-brand-blue" />
              <h5 for="inspection" class="font-bold">سفارش های من</h5>    
            </span>
            <div class="w-full border rounded-md p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              561116
            </div>
          </div> -->

        </div>
      </div>
      <!-- <div v-if="tab === 3"
        class="flex-1 border rounded-md px-2 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 py-10">
        <div class="flex flex-col space-y-2">
          <p>نام</p>
          <input type="text" class="text-center rounded-md py-3 border" v-model="form.firstName" />
        </div>
        <div class="flex flex-col space-y-2">
          <p>نام خانوادگی</p>
          <input type="text" class="text-center rounded-md py-3 border" v-model="form.lastName" />
        </div>
        <div class="flex flex-col space-y-2">
          <p>کد ملی</p>
          <input type="text" class="text-center rounded-md py-3 border farsi-num" v-model="form.nationalCode" />
        </div>
        <div class="flex flex-col space-y-2">
          <p>شماره گواهینامه</p>
          <input
            type="text"
            class="text-center rounded-md py-3 border farsi-num"
            v-model="form.nationalCode"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <p>شماره همراه</p>
          <input type="text" class="text-center rounded-md py-3 border farsi-num" v-model="form.mobile" />
        </div>
        <div class="flex flex-col space-y-2">
          <p>شماره شبا</p>
          <input
            type="text"
            class="text-center rounded-md py-3 border farsi-num"
            v-model="form.mobile"
          />
        </div>
        <div class="flex flex-col space-y-2">
          <p>پست الکترونیک</p>
          <input type="text" class="text-center rounded-md py-3 border farsi-num" v-model="form.email" />
        </div>
        <div></div>
        <div></div>
        <div></div>
        <div class="flex flex-col space-y-2">
          <button @click="editProfile"
            class="bg-brand-blue w-1/2 flex justify-center gap-3 items-center px-3 py-2 rounded-md text-white self-end">
            <p>ثبت اطلاعات</p>
          </button>
        </div>
      </div> -->

      <div v-if="tab === 1"
        class="flex-1 border rounded-md px-2 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-10">
        آدرس های من
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "profile",
  middleware: "logged-in",
});

//Composables
const { getAllUserCars, removeUserCar } = useGarage();

// States
const loading = ref(false);
const errMessage = ref()
const cars = ref()
const selectedCar = ref()
const toggleItem = ref()
const activeItem = ref(null)
const deleteModal = ref(false)
const tab = ref(0);
const tabs = [
  'خودروهای من',
]
const services = [
  {
    active: true,
    linkTo: "/inquiry/fines-details",
    svgName: "fines-details",
    h1: "خلافی خودرو",
  },
  {
    active: true,
    linkTo: "/inquiry/fines-accumulation",
    svgName: "fines-accumulation",
    h1: "تجمیع خلافی خودرو",
  },
  {
    active: true,
    linkTo: "/inquiry/negative-score",
    svgName: "negative-score",
    h1: "نمره منفی گواهینامه",
  },
  {
    active: true,
    linkTo: "/inquiry/pelak-status",
    svgName: "pelak-status",
    h1: "وضعیت پلاک‌ها",
  },
  {
    active: true,
    linkTo: "/inquiry/licence-status",
    svgName: "licence-status",
    h1: "وضعیت گواهینامه",
  },
  {
    active: true,
    linkTo: "/inquiry/card-sanad",
    svgName: "card-sanad",
    h1: "کارت و سند مالکیت خودرو",
  },
];

// Logics
// Initial User Cars Call
getAllUserCars()
  .then((r) => {
    if (r.status == 200) {
      cars.value = r.data;
    }
  })
  .catch((err) => (errMessage.value = err.data.messages[0]))
  .finally(() => loading.value = false);


const toggleMenu = (index) => {
  if (toggleItem.value === index) {
    toggleItem.value = null
  } else {
    toggleItem.value = index
  }
}

const selectCar = (id) => {
  activeItem.value = id
}

const openDeleteModal = (id) => {
  selectedCar.value = cars.value.filter((item) => item.id == id)
  deleteModal.value = true
}

const deactive = () => {
  activeItem.value = null
}

// When @Click away from toggle edit modal
const closeMenu = () => {
  toggleItem.value = null
};

// Delete a user car
const confirmDelete = () => {
  removeUserCar(selectedCar.value[0].id).then((r) => {
    if (r.status == 200) {
      deleteModal.value = false
      getAllUserCars()
        .then((r) => {
          if (r.status == 200) {
            cars.value = r.data;
          }
        })
        .catch((err) => (errMessage.value = err.data.messages[0]))
        .finally(() => loading.value = false);
    }
  })
    .catch((err) => (errMessage.value = err.data.messages[0]))
    .finally(() => loading.value = false);
}

// convert persian digits to english [۰۱۲۳۴۵۶۷۸۹] 
const toEnglishDigits = (str) => {
  let e = '۰'.charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function (t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}
// calculate estimate days for thirdPartyInsurance
const insuranceDeadLine = (insuranceDate)=>{
  if (insuranceDate && insuranceDate !== null && insuranceDate !== 'undefined'){
    let dateNow = toEnglishDigits(new Date(Date.now()).toLocaleDateString('fa-IR'));
    let dateUntil = insuranceDate;
    let difference = new Date(dateUntil).getTime() - new Date(dateNow).getTime();
    let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
    if(dateUntil >= dateNow){
      return `${TotalDays} روز تا اتمام بیمه شخص ثالث`;
    }else{
      return `بیمه شخص ثالث تمام شده`;
    }
  };
}

</script>
<template>
  <div class="w-full farsi-num">

    <Head>
      <Title>خودروهای من</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <ProfileDeleteModal v-if="deleteModal" @close="deleteModal = false" @confirm="confirmDelete"
      :selectedCar="selectedCar" />
    <div class="flex flex-col gap-2 w-full">

      <!-- Banner -->
      <!-- <ProfileBanner class="hidden lg:flex" /> -->

      <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold print:hidden">
        <img src="/icons/arrow-right.svg" alt="">
        <p>بازگشت</p>
      </NuxtLink>

      <!-- Tabs -->
      <ProfileTabs v-model="tab" :titles="tabs" />

      <div v-if="tab === 0" class="flex-1 flex flex-col space-y-10 bg-gray-50 border rounded-md px-2 md:px-10 py-10">
        <div v-if="cars" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3" v-click-away="deactive">
          <button v-for="(car, index) in cars" :key="index" @click="selectCar(index)"
            class="relative flex items-center h-40 bg-white shadow gap-4 rounded-md py-2 pr-5 border border-gray-200 hover:bg-gray-100 "
            :class="activeItem == index ? 'text-black shadow-md border-gray-100' : 'text-gray-400 shadow-sm'">

            <div v-if="car.thirdPartyInsuranceExpireDate" class="block absolute top-2 right-0 bg-red-50 text-brand-red text-xs py-1 pl-1 pr-3 rounded-tl-full rounded-bl-full">
              {{ insuranceDeadLine(car.thirdPartyInsuranceExpireDate) }}
            </div>

            <button @click="toggleMenu(index)" class="absolute top-0 left-0 p-4">
              <NuxtIcon name="three-dots" />
            </button>
            <div v-if="activeItem == index" class="absolute h-full w-2 bg-brand-red right-0 rounded-r-md"></div>
            <div v-if="toggleItem === index" v-click-away="closeMenu"
              class="absolute bg-white flex flex-col text-xs top-10 left-5 w-28 rounded-md shadow z-10">
              <NuxtLink :to="`/profile/park-car/${car.id}`" class="w-full flex justify-between hover:bg-gray-100 p-2">
                <span>ویرایش</span>
                <NuxtIcon class="w-3 text-gray-500" name="pencil" />
              </NuxtLink>
              <button @click="openDeleteModal(car.id)" class="w-full flex justify-between hover:bg-gray-100 p-2">
                <span>حذف</span>
                <NuxtIcon class="w-3 text-gray-500" name="trash" />
              </button>
            </div>
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

            <div v-if="car.isMyCar == true" class="flex flex-row items-center justify-evenly absolute bottom-2 gradientBorder left-0 py-1 pl-1 pr-2">
              <span class="flex text-[9px] text-gray-700">خودروی خودم</span> 
              <img src="/images/isMyCar.png" class="w-6 h-auto" alt="my car icon" />
            </div>

          </button>
        </div>
        <div v-else class="flex flex-col mx-auto justify-center items-center">
          <img class="w-10" src="/icons/big-car.svg" alt="" />
          <p>در حال حاضر خودرویی ثبت نکرده‌اید. یک خودرو پارک کنید</p>
        </div>
        <div v-if="activeItem !== null" class="flex flex-col space-y-8">
          <p>سرویس‌های ایرانی‌کار برای خودروی انتخاب شده</p>
          <div class="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6 items-center">
            <NuxtLink :to="service.linkTo" v-for="(service, index) in services" :key="index"
              class="flex flex-col items-center justify-between h-full text-xs rounded-md p-1">
              <NuxtIcon class="w-8 text-brand-blue" :name="service.svgName" />
              <p class="text-brand-blue font-semibold whitespace-nowrap">{{ service.h1 }}</p>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gradientBorder{
  border-left: none !important;
  border: 1px solid transparent;
  border-top-right-radius: 100px;
  border-bottom-right-radius: 100px;
  background: 
    -webkit-gradient(linear, left top, right top, from(white), to(white)), 
    -webkit-gradient(linear, left top, left bottom, from(rgba(0,38,100,1)) , to(rgba(187,19,62,1)));
  background: 
    -o-linear-gradient(left, white, white), 
    -o-linear-gradient(top, rgba(0,38,100,1) , rgba(187,19,62,1));
  background: 
    linear-gradient(to right, white, white), 
    linear-gradient(to bottom, rgba(0,38,100,1) , rgba(187,19,62,1)); 
  background-clip: padding-box, border-box;
  background-origin: padding-box, border-box;
}
</style>
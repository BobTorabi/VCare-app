<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";

definePageMeta({
  layout: "profile",
  middleware: "logged-in",
});

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const schema = object({
  inspectionTypeId: string().required("انتخاب نوع کارشناسی ازامی است"),
  provinceId: string().required("انتخاب استان الزامی است"),
  cityId: string().required("انتخاب شهر الزامی است"),
  address: string().required("آدرس محل بازدید الزامی است"),
});
const schema1 = object({
  inspectionTypeId: string().required("انتخاب نوع کارشناسی ازامی است"),
  carGroupId: string().required("برند خودرو الزامی است"),
  carModelId: string().required("مدل خودرو الزامی است"),
  provinceId: string().required("انتخاب استان الزامی است"),
  cityId: string().required("انتخاب شهر الزامی است"),
  address: string().required("آدرس محل بازدید الزامی است"),
  // firstTwoDigits: string().min(2, "حداقل 2 شماره").required("پلاک الزامی است"),
  // plateAlphabet: string().required("پلاک الزامی است"),
  // threeDigits: string().required("پلاک الزامی است").min(3, "حداقل 3 شماره"),
  // iranDigits: string().required("پلاک الزامی است").min(2, "حداقل 2 شماره"),
});
const initialValues = reactive({
  inspectionTypeId: "",
  provinceId: "",
  cityId: "",
  address: ""
});


//Composables
const { authUser } = useAuth();
const { getAllUserCars, getCarGroupWithModels } = useGarage();
const { getProvinceList, getProvinceCities } = useAddress();
const { postInspection, choosePaymentMethod, generatePaymentUrl } = useCarInspection();

//States
const loading = ref(false)
const errMessage = ref(null);
const selectedCar = ref([]);
const cars = ref([])
const tab = ref(0);
const tabs = ['کارشناسی خودرو']
const myCar = ref(true)
const payment = ref('')
const provinces = ref([])
const cities = ref([])
const activeItem = ref(null)
const dateOfinspection = ref('')
const yearOfManufacture = ref('')
const step = ref(1)
const inspectionPrice = ref('')
const inspectionId = ref('')
let carGroupsWithModels = [];
const carBrandas = ref();
const carModels = ref({});
const inspectionType = [
  { id: '01', title: 'کارشناسی فنی و آپشن ها' },
  { id: '02', title: 'کارشناسی رنگ و بدنه' },
  { id: '03', title: 'کارشناسی کل خودرو' },
]
const ifMyCarTitles = ['پارک خودرو', 'فرم درخواست', 'پرداخت هزینه', 'حضور کارشناس در محل', 'صدور و دانلود گواهی']
const ifNotMyCarTitles = ['فرم درخواست', 'پرداخت هزینه', 'حضور کارشناس در محل', 'صدور و دانلود گواهی']

//Logics
// Initial User Cars Call
getAllUserCars()
  .then((r) => {
    if (r.status == 200) {
      if (r.data.length) {
        step.value = 2
        cars.value = r.data;
      } else {
        step.value = 1
      }
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

// select my parked car
const selectCar = (id) => {
  activeItem.value = id
  selectedCar.value = cars.value[id]
};

// Initial all provinces Call
getProvinceList()
  .then((r) => {
    if (r.status == 200) {
      provinces.value = r.data.map((item) => {
        return { id: item.provinceId, title: item.title }
      });
       // sort tehran and alborz on top list
       const getTarget = ref([]);
      const importantProvince = [24, 27];
      importantProvince.forEach(i => getTarget.value.push({ id: provinces.value[i].id, title: provinces.value[i].title} ));
      provinces.value.splice(importantProvince[0], 1);
      provinces.value.splice(importantProvince[1], 1);
      provinces.value = [...JSON.parse(JSON.stringify(getTarget.value)),...JSON.parse(JSON.stringify(provinces.value))];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);


// Initial car groups with model Call
getCarGroupWithModels()
  .then((r) => {
    if (r.status === 200) {
      errMessage.value = null;
      carGroupsWithModels = r.data
      carBrandas.value = carGroupsWithModels.map((item) => {
        return { id: item.id, title: item.title }
      })
    } else if (r.status == 500) {
      errMessage.value = r.messages[0];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);



// Get Cities by province Id
const getCities = (id) => {
  getProvinceCities(id).then((r) => {
    if (r.status == 200) {
      cities.value = r.data.map((item) => {
        return { id: item.cityId, title: item.title }
      })
    }
  })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}

const handleFormSubmit = (form) => {
  if (cars.value.length && myCar.value == true && !selectedCar.value.id) {
    errMessage.value = 'از بین خودروهای پارک‌شده یکی را انتخاب کنید'
    return
  } else if (!yearOfManufacture.value) {
    errMessage.value = null
    errMessage.value = 'سال ساخت خودرو الزامی است'
    return
  } else if (!dateOfinspection.value) {
    errMessage.value = null
    errMessage.value = 'تعیین روز و ساعت بازدید الزامی است'
    return
  } else {
    form.userCarId = selectedCar.value.id
    form.timeVisit = dateOfinspection.value
    form.yearOfManufacture = yearOfManufacture.value
    postInspection(form).then(async (r) => {
      if (r.status == 200) {
        errMessage.value = null
        inspectionPrice.value = r.data.price
        inspectionId.value = r.data.id
        if (!myCar.value) {
          step.value = 2
        } else {
          step.value = await 3
        }
      } else if (r.status == 500) {
        errMessage.value = r.messages[0]
      }
    }).catch((err) => (errMessage.value = err.data.messages[0]))
      .finally(() => loading.value = false);
  }
}
const isMyCar = () => {
  myCar.value = !myCar.value
  if (myCar.value == false) {
    step.value = 1
  } else if (myCar.value && cars.value.length) {
    step.value = 2
  }
}

// Choose payment Method
const paymentMethod = (id) => {
  const form = {}
  form.id = inspectionId.value
  if (id == '01') {
    form.isOnline = true
  } else {
    form.isOnline = false
  }
  choosePaymentMethod(form).then((r) => {
    if (r.status == 200) {
      errMessage.value = null
      if (form.isOnline == true) {
        payment.value = 'online'
      } else {
        payment.value = 'offline'
      }
    } else if (r.status == 500) {
      errMessage.value = r.messages[0]
    }
  }).catch((err) => (errMessage.value = err.data.messages[0]))
    .finally(() => loading.value = false);
}

// Select Model
const selectModel = (id) => {
  carModels.value = carGroupsWithModels.find((item) => item.id === id).models;
};

// Generate payment link
const generatePaymentLink = () => {
  const form = {}
  form.id = inspectionId.value
  generatePaymentUrl(form).then((r) => {
    if (r.status == 200) {
      window.location.href = r.data;
      errMessage.value = null
    } else if (r.status == 500) {
      errMessage.value = r.messages[0]
    }
  }).catch((err) => (errMessage.value = err.data.messages[0]))
    .finally(() => loading.value = false);
}

</script>
<template>
  <div class="w-full farsi-num">

    <Head>
      <Title>کارشناسی خودرو</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>
    <div class="flex-col space-y-2 w-full">

      <!-- Banner -->
      <!-- <ProfileBanner class="hidden lg:flex" /> -->

      <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold print:hidden">
        <img src="/icons/arrow-right.svg" alt="">
        <p>بازگشت</p>
      </NuxtLink>

      <!-- Tabs -->
      <ProfileTabs v-model="tab" :titles="tabs" />

      <div v-if="tab == 0" class="flex flex-col gap-3">
        <div v-if="step == 2 || step == 1" class="flex-1 flex flex-col gap-3 justify-center border rounded-md p-5">
          <label for="inspection" class="font-bold">کارشناسی برای:</label>
          <select id="inspection" @change="isMyCar()"
            class="w-44 border rounded inline-flex py-2 px-6 outline-1 outline-offset-4 outline-blue-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]">
            <option :selected="myCar === true" value="01">خودروی خودم</option>
            <option :selected="myCar === false" value="02">خودروی دیگری</option>
          </select>

          <!-- Cars Component -->
          <div v-if="cars && myCar" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
        </div>

        <!-- Form -->
        <div class="flex-1 flex flex-col gap-6 border rounded-md px-2 lg:px-16 py-10">
          <SharedProgressBar :step="step" :titles="myCar ? ifMyCarTitles : ifNotMyCarTitles" lifeStyle="profileinspectionrequest" />

          <div v-if="step == 1 && !myCar" class="flex flex-col gap-6">
            <div class="flex items-center gap-3 font-semibold md:mt-10">
              <NuxtIcon class="text-brand-red" name="car" />
              <h5>درخواست کارشناسی خودرو</h5>
            </div>

            <VForm :validation-schema="schema1" :initial-values="initialValues" v-slot="{ meta: formMeta }"
              @submit="handleFormSubmit" class="grid grid-cols-1 gap-x-4 w-full sm:grid-cols-2 md:grid-cols-3">

              <ElementsVSelectInput name="inspectionTypeId" label="نوع کارشناسی" :options="inspectionType"
                placeholder="انتخاب کنید" class="md:col-start-1 md:col-end-1" />

              <ElementsVSelectInput v-if="carBrandas" name="carGroupId" label="برند خودرو" :options="carBrandas"
                class="md:col-start-1 md:col-end-1" placeholder="انتخاب کنید"
                @change="selectModel($event.target.value)" />

              <ElementsVSelectInput name="carModelId" label="مدل خودرو" :options="carModels"
                placeholder="انتخاب کنید" />

              <ElementsVDatePickerInput v-model="yearOfManufacture" name="yearOfmanufacture" :max="new Date()"
                label="سال ساخت خودرو" type="year" :simple="true" popover="bottom" />

              <ElementsVSelectInput name="provinceId" label="استان" :options="provinces" placeholder="انتخاب کنید"
                @change="getCities($event.target.value)" class="md:col-start-1 md:col-end-1" />

              <ElementsVSelectInput name="cityId" label="شهر" :options="cities" placeholder="انتخاب کنید" />

              <ElementsVDatePickerInput v-model="dateOfinspection" name="dateOfinspection" :min="new Date()"
                :max="new Date(Date.now() + (3 * 24 * 60 * 60 * 1000))" label="روز و ساعت بازدید" type="datetime"
                :simple="true" popover="bottom" :jump-minute="30" :round-minute="true" />

              <div
                class="col-span-full sm:col-span-2 xl:col-span-1 w-full flex flex-col justify-between gap-2 my-3 py-1 font-bold"
                dir="ltr">
                <label class="font-bold text-right">پلاک خودرو</label>
                <div class="relative flex items-center gap-2 border rounded-md pl-8 pr-3 py-1">
                  <InquiryFirstTwoDigits name="firstTwoDigits" />
                  <InquiryAlphabet name="plateAlphabet" />
                  <InquiryThreeDigits name="threeDigits" />
                  <InquiryIranDigits name="iranDigits" />
                  <div dir="ltr"
                    class="bg-blue-500 flex pt-1 flex-col space-y-1 items-center justify-center absolute left-0 rounded-l-md h-full w-6 text-[5px]">
                    <img src="/icons/ir-flag.svg" alt="" />
                    <p class="leading-tight text-left text-white">
                      I.R.<br />
                      IRAN
                    </p>
                  </div>
                </div>
                <VErrorMessage name="firstTwoDigits" class="text-xs font-normal text-red-500 mt-1 text-right " />
              </div>


              <!-- <ElementsVTextInput name="area" label="منطقه" maxlength="7" type="text" /> -->

              <ElementsVTextInput class="col-span-full h-32" name="address" label="آدرس محل بازدید" />

              <div class="flex justify-end whitespace-nowrap h-20 items-end col-span-full md:col-start-3 md:col-end-3">
                <button class="bg-brand-red px-3 py-2 rounded-md h-10 text-white" type="submit">
                  <p>درخواست کارشناسی</p>
                </button>
              </div>
              <div class="text-xs text-red-500 mt-2 farsi-num">
                {{ errMessage }}
              </div>
            </VForm>
          </div>

          <div v-if="step == 2 && !myCar" class="flex flex-col gap-6">
            <div class="flex items-center gap-3 font-semibold md:mt-10">
              <NuxtIcon class="text-brand-red" name="car" />
              <h5>پرداخت هزینه کارشناسی</h5>
            </div>

            <div v-if="selectedCar.id && myCar"
              class="flex flex-col space-y-5 border rounded-md px-2 lg:px-16 py-6 bg-gray-100 text-brand-blue font-semibold">
              <div class="flex items-center justify-between">
                <p>مدل خودرو:</p>
                <p>
                  {{ selectedCar.carGroupTitle }} {{ selectedCar.carModelTitle }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p>پلاک خودرو:</p>
                <p>
                  {{ selectedCar.licensePlateIranDigits }}
                  {{ selectedCar.licensePlateThreeDigits }} {{ selectedCar.licensePlateAlphabet }}
                  {{ selectedCar.licensePlateFirstTwoDigits }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p>سال ساخت خودرو:</p>
                <p>{{ yearOfManufacture }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>زمان درخواست کارشناسی:</p>
                <p>{{ dateOfinspection }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>هزینه کارشناسی:</p>
                <p>
                  <span class="text-green-700">
                    {{ $seperator(inspectionPrice) + ' ' }}
                  </span>
                  <span>ریال </span>
                </p>
              </div>
            </div>

            <div class="flex justify-between whitespace-nowrap h-20 items-end">

              <div class="flex flex-col gap-3">
                <label class="font-bold" for="payment">روش پرداخت</label>
                <select id="payment" @change="paymentMethod($event.target.value)"
                  class="max-w-full w-full border rounded inline-flex py-2 px-6 outline-1 outline-offset-4 outline-blue-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]">
                  <option selected>انتخاب کنید</option>
                  <option value="01">پرداخت آنلاین</option>
                  <option value="02">پرداخت در محل</option>
                </select>
              </div>
              <button v-if="payment == 'online'" @click="generatePaymentLink"
                class="bg-brand-red self-end px-10 py-2 rounded-md h-10 text-white" type="submit">
                <p>پرداخت آنلاین</p>
              </button>
              <button v-if="payment == 'offline'" @click="step = step + 1"
                class="bg-brand-red self-end px-10 py-2 rounded-md h-10 text-white" type="submit">
                <p>مرحله بعدی</p>
              </button>

            </div>
            <div class="text-xs text-red-500 mt-2 farsi-num">
              {{ errMessage }}
            </div>
          </div>

          <div v-if="step == 3 && !myCar" class="flex flex-col items-center gap-6 mt-10 font-semibold">

            <NuxtIcon name="inspectionFinal" filled />
            <h5 class="text-center">کارشناس ایرانی کار در زمان تعیین شده جهت کارشناسی خودرو شما مراجعه خواهد کرد.</h5>
            <div
              class="flex justify-between items-center w-80 bg-gray-100 text-brand-blue font-semibold rounded-md px-5 py-3">
              <p>زمان مراجعه کارشناس:</p>
              <p>{{ dateOfinspection }}</p>
            </div>

          </div>

          <div v-if="step == 1 && myCar" class="flex flex-col gap-6">
            <div
              class="flex justify-center bg-blue-100 py-3 border border-blue-200 rounded-md text-blue-400 items-center gap-3 font-semibold md:mt-10">
              <NuxtIcon class="" name="exclamation" />
              <h5>برای ثبت درخواست کارشناسی ، ابتدا لازم است مشخصات خودرو خود را در ایرانی کار ثبت کنید. </h5>
            </div>
            <img class="w-60 mx-auto" src="/images/no-car.png" alt="">

            <div class="mx-auto flex flex-col gap-5 w-1/3">
              <NuxtLink to="/profile/park-car"
                class="bg-brand-red flex justify-center gap-3 items-center px-3 py-2 rounded-md text-white">
                <NuxtIcon class="bg-white text-brand-red p-1 rounded-sm" name="car" />
                <p>پارک خودرو</p>
                <NuxtIcon name="plus" />
              </NuxtLink>
              <button @click="myCar = false" to="/profile/park-car"
                class="bg-black text-white flex justify-center gap-3 items-center px-3 py-2 rounded-md">
                <p>درخواست کارشناسی برای دیگری</p>
              </button>
            </div>
          </div>

          <div v-if="step == 2 && myCar" class="flex flex-col gap-6">
            <div class="flex items-center gap-3 font-semibold md:mt-10">
              <NuxtIcon class="text-brand-red" name="car" />
              <h5>درخواست کارشناسی خودرو</h5>
            </div>

            <div v-if="selectedCar.id && myCar"
              class="flex flex-col space-y-5 border rounded-md px-2 lg:px-16 py-6 bg-gray-100 text-brand-blue font-semibold">
              <div class="flex items-center justify-between">
                <p>مدل خودرو:</p>
                <p>
                  {{ selectedCar.carGroupTitle }} {{ selectedCar.carModelTitle }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p>پلاک خودرو:</p>
                <p>
                  {{ selectedCar.licensePlateIranDigits }}
                  {{ selectedCar.licensePlateThreeDigits }} {{ selectedCar.licensePlateAlphabet }}
                  {{ selectedCar.licensePlateFirstTwoDigits }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p>نام و نام خانوادگی مالک:</p>
                <p v-if="authUser.firstName && authUser.lastName">{{ authUser.firstName }} {{ authUser.lastName }}</p>
                <NuxtLink to="/profile/my-info" class="flex items-center text-xs text-blue-400 gap-2 font-light" v-else>
                  <NuxtIcon class="text-blue-400 w-5 rotate-90" name="pencil" />
                  <span>تکمیل اطلاعات کاربری</span>
                </NuxtLink>
              </div>
              <div class="flex items-center justify-between">
                <p>شماره تلفن همراه:</p>
                <p>{{ authUser.mobile }}</p>
              </div>
            </div>

            <VForm :validation-schema="schema" :initial-values="initialValues" v-slot="{ meta: formMeta }"
              @submit="handleFormSubmit" class="grid grid-cols-1 gap-x-4 w-full sm:grid-cols-2 md:grid-cols-3">

              <ElementsVSelectInput name="inspectionTypeId" label="نوع کارشناسی" :options="inspectionType"
                placeholder="انتخاب کنید" class="md:col-start-1 md:col-end-1" />


              <ElementsVDatePickerInput v-model="yearOfManufacture" name="yearOfmanufacture" :max="new Date()"
                label="سال ساخت خودرو" type="year" />

              <ElementsVSelectInput name="provinceId" label="استان" :options="provinces" placeholder="انتخاب کنید"
                @change="getCities($event.target.value)" class="md:col-start-1 md:col-end-1" />

              <ElementsVSelectInput name="cityId" label="شهر" :options="cities" placeholder="انتخاب کنید" />

              <ElementsVDatePickerInput v-model="dateOfinspection" name="dateOfinspection" :min="new Date()"
                :max="new Date(Date.now() + (3 * 24 * 60 * 60 * 1000))" label="روز و ساعت بازدید" type="datetime"
                :simple="true" popover="bottom" :jump-minute="30" :round-minute="true" />


              <!-- <ElementsVTextInput name="area" label="منطقه" maxlength="7" type="text" /> -->

              <ElementsVTextInput class="col-span-full" name="address" label="آدرس محل بازدید" />

              <div class="flex justify-end whitespace-nowrap h-20 items-end col-span-full md:col-start-3 md:col-end-3">
                <button class="bg-brand-red px-3 py-2 rounded-md h-10 text-white" type="submit">
                  <p>درخواست کارشناسی</p>
                </button>
              </div>
              <div class="text-xs text-red-500 mt-2 farsi-num">
                {{ errMessage }}
              </div>
            </VForm>
          </div>

          <div v-if="step == 3 && myCar" class="flex flex-col gap-6">
            <div class="flex items-center gap-3 font-semibold md:mt-10">
              <NuxtIcon class="text-brand-red" name="car" />
              <h5>پرداخت هزینه کارشناسی</h5>
            </div>

            <div v-if="selectedCar.id && myCar"
              class="flex flex-col space-y-5 border rounded-md px-2 lg:px-16 py-6 bg-gray-100 text-brand-blue font-semibold">
              <div class="flex items-center justify-between">
                <p>مدل خودرو:</p>
                <p>
                  {{ selectedCar.carGroupTitle }} {{ selectedCar.carModelTitle }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p>پلاک خودرو:</p>
                <p>
                  {{ selectedCar.licensePlateIranDigits }}
                  {{ selectedCar.licensePlateThreeDigits }} {{ selectedCar.licensePlateAlphabet }}
                  {{ selectedCar.licensePlateFirstTwoDigits }}
                </p>
              </div>
              <div class="flex items-center justify-between">
                <p>سال ساخت خودرو:</p>
                <p>{{ yearOfManufacture }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>زمان درخواست کارشناسی:</p>
                <p>{{ dateOfinspection }}</p>
              </div>
              <div class="flex items-center justify-between">
                <p>هزینه کارشناسی:</p>
                <p>
                  <span class="text-green-700">
                    {{ $seperator(inspectionPrice) + ' ' }}
                  </span>
                  <span>ریال </span>
                </p>
              </div>
            </div>

            <div class="flex justify-between whitespace-nowrap h-20 items-end">

              <div class="flex flex-col gap-3">
                <label class="font-bold" for="payment">روش پرداخت</label>
                <select id="payment" @change="paymentMethod($event.target.value)"
                  class="max-w-full w-full border rounded inline-flex py-2 px-6 outline-1 outline-offset-4 outline-blue-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]">
                  <option selected>انتخاب کنید</option>
                  <option value="01">پرداخت آنلاین</option>
                  <option value="02">پرداخت در محل</option>
                </select>
              </div>
              <button v-if="payment == 'online'" @click="generatePaymentLink"
                class="bg-brand-red self-end px-10 py-2 rounded-md h-10 text-white" type="submit">
                <p>پرداخت آنلاین</p>
              </button>
              <button v-if="payment == 'offline'" @click="step = step + 1"
                class="bg-brand-red self-end px-10 py-2 rounded-md h-10 text-white" type="submit">
                <p>مرحله بعدی</p>
              </button>

            </div>
            <div class="text-xs text-red-500 mt-2 farsi-num">
              {{ errMessage }}
            </div>
          </div>

          <div v-if="step == 4 && myCar" class="flex flex-col items-center gap-6 mt-10 font-semibold">

            <NuxtIcon name="inspectionFinal" filled />
            <h5 class="text-center">کارشناس ایرانی کار در زمان تعیین شده جهت کارشناسی خودرو شما مراجعه خواهد کرد.</h5>
            <div
              class="flex justify-between items-center w-80 bg-gray-100 text-brand-blue font-semibold rounded-md px-5 py-3">
              <p>زمان مراجعه کارشناس:</p>
              <p>{{ dateOfinspection }}</p>
            </div>

          </div>

        </div>
      </div>


      <div v-if="tab == 1"
        class="flex-1 border rounded-md px-2 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-10">
        آدرس های من
      </div>
    </div>
  </div>
</template>
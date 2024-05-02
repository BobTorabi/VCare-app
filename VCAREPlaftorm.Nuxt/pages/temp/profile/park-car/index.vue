
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
  carGroupId: string().required("برند خودرو الزامی است"),
  carModelId: string().required("مدل خودرو الزامی است"),
  licensePlateAlphabet: string().required("پلاک الزامی است"),
  licensePlateFirstTwoDigits: string().min(2, "حداقل 2 شماره").required("پلاک الزامی است"),
  licensePlateIranDigits: string().required("پلاک الزامی است").min(2, "حداقل 2 شماره"),
  licensePlateThreeDigits: string().required("پلاک الزامی است").min(3, "حداقل 3 شماره"),
});;
const initialValues = reactive({
  id: "",
  carGroupId: "",
  carGroupTitle: "",
  carModelId: "",
  carModelTitle: "",
  userFirstName: "",
  userLastName: "",
  isMainCar: "",
  dateOfManufacture: "",
  thirdPartyInsuranceExpireDate: "",
  bodyInsuranceExpireDate: "",
  technicalDiagnosisDate: "",
  licensePlateAlphabet: "",
  licensePlateFirstTwoDigits: "",
  licensePlateIranDigits: "",
  licensePlateThreeDigits: "",
  distanceOfMovementInKm: "",
  vinCode: "",
  barcode: "",
  imageUrl: "",
  yearOfManufacture: "",
});

// Composables
const router = useRouter()
const { modifyUserCar, getCarGroupWithModels } = useGarage();
const { authUser } = useAuth();

// States
const loading = ref(false);
const errMessage = ref(null);
const tab = ref(0);
const tabs = ['پارک خودرو جدید'];
let carGroupsWithModels = [];
const carBrandas = ref();
const carModels = ref();

const toEnglishDigits = (str) => {
  // convert persian digits [۰۱۲۳۴۵۶۷۸۹]
  var e = '۰'.charCodeAt(0);
  str = str.replace(/[۰-۹]/g, function (t) {
    return t.charCodeAt(0) - e;
  });

  // convert arabic indic digits [٠١٢٣٤٥٦٧٨٩]
  e = '٠'.charCodeAt(0);
  str = str.replace(/[٠-٩]/g, function (t) {
    return t.charCodeAt(0) - e;
  });
  return str;
}

const today = toEnglishDigits(new Date(Date.now()).toLocaleDateString('fa-IR'))
const fiveYears = toEnglishDigits(new Date(Date.now() + (5 * 365 * 24 * 60 * 60 * 1000)).toLocaleDateString('fa-IR'))
const oneYear = toEnglishDigits(new Date(Date.now() + (1 * 365 * 24 * 60 * 60 * 1000)).toLocaleDateString('fa-IR'))
const isMyCar = ref(false);



// Logics
// Initial car group with models Call
getCarGroupWithModels().then(async (r) => {
  if (r.status === 200) {
    errMessage.value = null;
    carGroupsWithModels = await r.data
    carBrandas.value = await carGroupsWithModels.map((item) => {
      return { id: item.id, title: item.title }
    })
  } else if (r.status == 500) {
    errMessage.value = r.messages[0];
  }
})


// Park the car
const handleFormSubmit = (form) => {
  loading.value = true;
  form.isMyCar = isMyCar.value

  modifyUserCar(form)
    .then(async (r) => {
      if (r.status === 200) {
        errMessage.value = null;

        // Tracking park car event through Google Tag Manager
        const userId = await authUser.value.userId
        await window.dataLayer.push({ 'event': 'park-car', 'userId': userId })

        router.push('/profile/my-cars')
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => {
      errMessage.value = err.data[0].errorDescription;
    })
    .finally(() => loading.value = false);
};

// Select Model
const selectModel = (id) => {
  carModels.value = carGroupsWithModels.find((item) => item.id === id).models;
};




const reset = () => {
  // yearOfManufacture.value = ''
  // thirdPartyInsuranceExpireDate.value = ''
  // bodyInsuranceExpireDate.value = ''
  // technicalDiagnosisDate.value = ''
  history.go(-1);
};

</script>
<template>
  <div class="flex flex-col gap-2 w-full farsi-num">

    <Head>
      <Title>پارک خودرو</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <!-- <ProfileBanner class="hidden lg:flex" /> -->

    <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold ">
      <img src="/icons/arrow-right.svg" alt="">
      <p>بازگشت</p>
    </NuxtLink>

    <ProfileTabs v-model="tab" :titles="tabs" />

    <div v-if="tab === 0" class="flex-1 flex flex-col gap-7 items-center border rounded-md px-2 md:px-16 py-10">

      <div class="w-full grid grid-cols-3 gap-3 gap-y-9 lg:grid-cols-6">
        <button class="flex flex-col h-20 justify-center items-center border p-2 shadow-md text-brand-blue rounded-md">
          <img class="w-12" src="/icons/car-in-park.svg" alt="" />
          <span>سواری</span>
        </button>
        <button class="flex flex-col h-20 justify-center items-center border p-2 shadow-md text-gray-400 rounded-md">
          <img class="w-12" src="/icons/truck-in-park.svg" alt="" />
          وانت
        </button>
        <button class="flex flex-col h-20 justify-center items-center border p-2 shadow-md text-gray-400 rounded-md">
          <img class="w-12" src="/icons/van-in-park.svg" alt="" />
          ون
        </button>
        <button class="flex flex-col h-20 justify-center items-center border p-2 shadow-md text-gray-400 rounded-md">
          <img class="w-12" src="/icons/big-truck-in-park.svg" alt="" />
          کامیون
        </button>
        <button class="flex flex-col h-20 justify-center items-center border p-2 shadow-md text-gray-400 rounded-md">
          <img class="w-12" src="/icons/minibus-in-park.svg" alt="" />
          مینی‌بوس
        </button>
        <button class="flex flex-col h-20 justify-center items-center border p-2 shadow-md text-gray-400 rounded-md">
          <img class="w-12" src="/icons/bus-in-park.svg" alt="" />
          اتوبوس
        </button>
      </div>
      <!-- v-slot="{ meta: formMeta }" *** FOR VFORM -->
      <VForm :validation-schema="schema" :initial-values="initialValues" @submit="handleFormSubmit"
        class="grid grid-cols-1 gap-x-4 w-full sm:grid-cols-2 md:grid-cols-3">

        <ElementsVSelectInput v-if="carBrandas" name="carGroupId" label="برند خودرو" :options="carBrandas"
          :requiredStar="true" placeholder="انتخاب کنید" @change="selectModel($event.target.value)" />

        <ElementsVSelectInput name="carModelId" label="مدل خودرو" :options="carModels" placeholder="انتخاب کنید"
          :requiredStar="true" />

        <ElementsVTextInput name="distanceOfMovementInKm" label="کارکرد خودرو" type="tel" maxlength="8" />

        <ElementsVTextInput name="vinCode" label="شماره VIN" maxlength="17" />

        <ElementsVTextInput name="barcode" label="بارکد کارت خودرو" type="tel" maxlength="9" />

        <ElementsVDatePickerInput name="yearOfManufacture" format="jYYYY" label="سال ساخت خودرو" type="year" :max="today"
          :simple="true" popover="bottom" />

        <ElementsVDatePickerInput name="thirdPartyInsuranceExpireDate" label="تاریخ پایان بیمه شخص ثالث"
          format="jYYYY/jMM/jDD" :simple="true" :min="today" :max="oneYear" popover="bottom" />

        <ElementsVDatePickerInput name="bodyInsuranceExpireDate" label="تاریخ پایان بیمه بدنه" format="jYYYY/jMM/jDD"
          :simple="true" :min="today" :max="fiveYears" popover="bottom" />

        <ElementsVDatePickerInput name="technicalDiagnosisDate" label="تاریخ پایان معاینه فنی" format="jYYYY/jMM/jDD"
          :simple="true" :min="today" :max="oneYear" popover="bottom" />

        <ElementsVSwitchToggle :isActive="isMyCar" label="خودروی خودم" v-model="isMyCar" />




        <div
          class="col-span-full sm:col-span-2 xl:col-span-1 w-full flex flex-col justify-between gap-2 my-3 py-1 font-bold"
          dir="ltr">
          <label class="font-bold text-right">
            <span class="text-brand-red">*</span>
            پلاک خودرو
          </label>
          <div class="relative flex items-center gap-2 border rounded-md pl-8 pr-3 py-1">
            <InquiryFirstTwoDigits name="licensePlateFirstTwoDigits" />
            <InquiryAlphabet name="licensePlateAlphabet" />
            <InquiryThreeDigits name="licensePlateThreeDigits" />
            <InquiryIranDigits name="licensePlateIranDigits" />
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

        <div class="hidden xl:block">


        </div>

        <div
          class="flex gap-3 justify-between whitespace-nowrap h-20 items-end col-span-full md:col-start-3 md:col-end-3">
          <button type="reset" @click="reset();"
            class="bg-white w-1/2 flex justify-center gap-3 items-center px-3 py-2 h-10 border rounded-md">
            <p>انصراف</p>
          </button>
          <button class="bg-brand-red px-3 py-2  w-1/2 rounded-md h-10 text-white" type="submit">
            <p>ثبت اطلاعات</p>
          </button>
        </div>

      </VForm>

    </div>
  </div>
</template>

<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";

definePageMeta({
  layout: "profile",
  middleware: "logged-in",
});

// Composables
const { getUserInfo, updateUserInfo } = useIdentity();
const { authToken, authUser } = useAuth();
const cookieUser = useCookie("user", { domain: "iranecar.com" });
const router = useRouter();
const config = useRuntimeConfig();

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const schema = object({
  // firstName: string().required("انتخاب نوع کارشناسی ازامی است"),
  // provinceId: string().required("انتخاب استان الزامی است"),
  // cityId: string().required("انتخاب شهر الزامی است"),
  // address: string().required("آدرس محل بازدید الزامی است"),
});
const initialValues = reactive({
  firstName: authUser.value.firstName,
  lastName: authUser.value.lastName,
  birthDate: authUser.value.birthDate,
  nationalCode: authUser.value.nationalCode,
  mobile: authUser.value.mobile,
  shebaBankCode: authUser.value.shebaBankCode,
  email: authUser.value.email,
  driverLicenseNo: authUser.value.driverLicenseNo,
});

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

// States
const errMessage = ref();
const loading = ref(false);
const tab = ref(0);
const tabs = [
  'مشخصات فردی',
]
const today = toEnglishDigits(new Date(Date.now()).toLocaleDateString('fa-IR'))


//Logics
// update User form submit
const handleFormSubmit = (form) => {
  loading.value = true
  updateUserInfo(form).then(async (r) => {
    if (r.status == 200) {
      errMessage.value = null
      Object.assign(initialValues, r.data);
      getUserInfo().then(async (r) => {
        if (r.status === 200) {
          cookieUser.value = await r.data;
          authUser.value = await cookieUser.value;
        }
      });
      tab.value = 0
    } else if (r.status == 500) {
      errMessage.value = r.messages[0]
    }
  }).catch((err) => (errMessage.value = err.data.messages[0]))
    .finally(() => loading.value = false);
}

</script>
<template>
  <!-- Mobile Menu hidden on Md -->
<div class="flex flex-col gap-2 w-full">

  <Head>
    <Title>اطلاعات کاربری</Title>
    <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <!-- Banner -->
    <!-- <ProfileBanner class="hidden lg:flex" /> -->

    <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold ">
      <img src="/icons/arrow-right.svg" alt="">
      <p>بازگشت</p>
    </NuxtLink>

    <ProfileTabs v-model="tab" :titles="tabs" />

    <div v-if="tab === 0" class="relative flex-1 border rounded-md px-2 lg:px-16 py-14 farsi-num">
      <button @click="tab = 3" class="absolute flex gap-1 left-5 top-5 text-brand-blue-light">
        <span>ویرایش</span>
        <NuxtIcon class="w-4 rotate-90" name="pencil" />
      </button>

      <div class="grid grid-cols-1 gap-4 w-full sm:grid-cols-2 md:grid-cols-3">
        <div class="flex flex-col space-y-2">
          <p class="font-bold">نام</p>
          <p class="text-center bg-gray-200 rounded-md py-3">
            {{ authUser.firstName }}
          </p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="font-bold">نام خانوادگی</p>
          <p class="text-center bg-gray-200 py-3 rounded-md">
            {{ authUser.lastName }}
          </p>
        </div>

        <div v-if="authUser.birthDate" class="flex flex-col space-y-2">
            <p class="font-bold">تاریخ تولد</p>
            <p class="text-center bg-gray-200 py-3 rounded-md ">
              {{ authUser.birthDate }}
            </p>
          </div>

        <div class="flex flex-col space-y-2">
          <div class="flex items-center gap-2">
            <p class="font-bold">شماره همراه</p>
            <p class="text-xs">(احراز شده)</p>
          </div>
          <div class="relative flex items-center justify-center bg-green-200 py-3 divy-3 rounded-md">
            <NuxtIcon name="check" class="w-5 absolute right-3 text-green-700" />
            <span class="self-center">
              {{ authUser.mobile }}
            </span>
          </div>
        </div>

        <div class="flex flex-col space-y-2">
          <div class="flex items-center gap-2">
            <p class="font-bold">کد ملی</p>
            <p v-if="authUser.nationalCodeIsFrozen" class="text-xs">(احراز شده)</p>
          </div>
          <div class="relative flex items-center justify-center py-3 divy-3 rounded-md"
            :class="authUser.nationalCodeIsFrozen ? 'bg-green-200' : 'bg-gray-200'">
            <NuxtIcon v-if="authUser.nationalCodeIsFrozen" name="check" class="w-5 absolute right-3 text-green-700" />
            <span class="self-center">
              {{ authUser.nationalCode }}
            </span>
          </div>
        </div>
        
        <div v-if="authUser.driverLicenseNo" class="flex flex-col space-y-2">
          <p class="font-bold">شماره گواهینامه</p>
          <p class="text-center bg-gray-200 py-3 rounded-md ">
            {{ authUser.driverLicenseNo }}
          </p>
        </div>

        

        <div v-if="authUser.shebaBankCode" class="flex flex-col space-y-2">
          <p class="font-bold">شماره شبا</p>
          <p class="text-center bg-gray-200 py-3 rounded-md ">
            {{ authUser.shebaBankCode }}
          </p>
        </div>

        <div class="flex flex-col space-y-2">
          <p class="font-bold">پست الکترونیک</p>
          <p class="text-center bg-gray-200 py-3 rounded-md">
            {{ authUser.email }}
          </p>
        </div>
        <!-- <div class="flex flex-col space-y-2">
              <p class="font-bold">کد معرف شما</p>
              <p class="text-center text-green-700 bg-green-200 py-3 rounded-md ">
                5642315
              </p>
            </div> -->
      </div>
    </div>
    <div v-if="tab === 3" class="flex-1 border rounded-md px-2 lg:px-16 py-10">

      <VForm :validation-schema="schema" :initial-values="initialValues" v-slot="{ meta: formMeta }"
        @submit="handleFormSubmit" class="grid grid-cols-1 gap-x-4 w-full sm:grid-cols-2 md:grid-cols-3">

        <ElementsVTextInput name="firstName" label="نام" />
        <ElementsVTextInput name="lastName" label="نام‌خانوادگی" />
        <ElementsVDatePickerInput name="birthDate" label="تاریخ تولد" format="jYYYY/jMM/jDD" :simple="true" :max="today"
          popover="bottom" />
        <ElementsVTextInput name="mobile" dir="ltr" label="شماره همراه" type="tel" maxlength="11" :disabled="true" />
        <ElementsVTextInput name="nationalCode" dir="ltr" label="کد ملی" type="tel" maxlength="10"
          :disabled="authUser.nationalCodeIsFrozen" />
        <ElementsVTextInput name="driverLicenseNo" dir="ltr" label="شماره گواهینامه" type="tel" maxlength="10" />
        <ElementsVTextInput name="shebaBankCode" dir="ltr" label="شماره شبا" type="tel" maxlength="24" />
        <ElementsVTextInput name="email" dir="ltr" class="sm:col-span-2" label="پست الکترونیک" type="email" />

        <div
          class="flex gap-3 justify-between whitespace-nowrap h-20 items-end col-span-full md:col-start-3 md:col-end-3">
          <button @click="tab = 0"
            class="bg-white w-1/2 flex justify-center gap-3 items-center px-3 py-2 border rounded-md">
            <p>انصراف</p>
          </button>
          <button class="flex justify-center items-center gap-3  bg-brand-red px-3 py-2 w-1/2 rounded-md h-10 text-white"
            type="submit">
            <p>ثبت اطلاعات</p>
            <SharedLoading v-if="loading" />
          </button>
        </div>
        <div class="text-xs text-red-500 mt-2 ">
          {{ errMessage }}
        </div>
      </VForm>
    </div>
    <div v-if="tab === 1"
      class="flex-1 border rounded-md px-2 md:px-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 py-10">
      آدرس های من
    </div>
  </div>
</template>

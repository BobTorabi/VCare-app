<script  setup>
import { number, object, string } from "yup";
import { configure } from "vee-validate";

onMounted(() => window.scrollTo({ top: 0, behavior: 'smooth' }));

// Composables:
const { registerComplaint } = useComplaint()

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema = object({
  fullName: string().min(4, "حداقل 4 حرف باشد ").required("نام و نام خانوادگی الزامی است"),
  // phoneNumber: string().matches(mobileRegex, "تلفن همراه معتبر نیست"),
  email: string().min(4, "حداقل 4 حرف باشد ").required("آدرس ایمیل الزامی است").email("آدرس ایمیل معتبر نیست"),
  title: string().required("عنوان شکایت الزامی است"),
  description: string().required("متن شکایت الزامی است"),
  // clientId : number(),
});

const initialValues = reactive({
  fullName: '',
  phoneNumber: '',
  email: '',
  title: '',
  description: '',
  // clientId : 0,
});

// States
const errMessage = ref(null);
const loading = ref(false);
const success = ref(false);

// handle submit
const handleSubmit = (form) => {
  loading.value = true;
  registerComplaint(form)
    .then(async (r) => {
      if (r.status === 200) {
        success.value = true;
        errMessage.value = null;
        loading.value = false;
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
        loading.value = false;
        success.value = false;
      }
    })
};
</script>

<template>
  <div class="relative pb-20">
    <div class=" container mx-auto py-10 mb-10 lg:mb-0">

      <Head>
        <Title>ثبت شکایت</Title>
        <Meta name="description" content="ثبت شکایت" />
      </Head>

      <div class="flex flex-col space-y-10 px-0 lg:px-5 text-justify ">
        <div class="w-full bg-gray-200 p-2 mb-2 text-center rounded-md cssShapeTitle ">
          <h1 class="font-bold text-xl text-brand-blue">ثبت شکایت</h1>
        </div>

        <div class="w-full flex flex-col lg:flex-row space-y-2 md:shadow-md rounded-md md:border ">
          <!-- form -->
          <div
            class="w-full lg:w-1/2 mx-auto text-center p-10 border rounded-md shadow-md mt-0 md:mt-10 m-10 lg:mr-16  ">
            <div class=" w-full text-right md:w-full bg-white z-10">
              <p class="font-semibold text-center mb-3">
                فرم ثبت شکایت
              </p>
              <VForm :validation-schema="schema" :initial-values="initialValues"
                v-slot="{ meta: formMeta, errors: formErrors, values }" @submit="handleSubmit" autocomplete="off"
                class="flex flex-col gap-2 static space-y-5 z-30">
                <!-- fullName -->
                <ElementsVTextInput class="mt-1 inline-block" name="fullName" :autofocus="true" autocomplete="off"
                  type="text" placeholder="محمد ..." label="نام و نام خانوادگی" :requiredStar="true" />
                <!-- phoneNumber -->
                <ElementsVTextInput name="phoneNumber" :autofocus="true" autocomplete="off" type="text" maxlength="11"
                  placeholder="09" label="شماره تماس" dir="ltr" />
                <!-- email -->
                <ElementsVTextInput name="email" :autofocus="true" autocomplete="off" type="text"
                  placeholder="example@exam.com" label="آدرس ایمیل" :requiredStar="true" dir="ltr" />
                <!-- title -->
                <ElementsVTextInput name="title" :autofocus="true" autocomplete="off" type="text" placeholder="عنوان"
                  label="عنوان شکایت" :requiredStar="true" />
                <!-- description -->
                <ElementsVTextInput name="description" :autofocus="true" autocomplete="off" type="text"
                  placeholder="متن" label="متن شکایت" :requiredStar="true" />
                <div v-if="errMessage"
                  class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400">
                  <img src="@/assets/icons/error.svg" alt="" />
                  <p>{{ errMessage }}</p>
                </div>
                <div v-if="success"
                  class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-3 bg-green-100 text-green-700">
                  <img src="@/assets/icons/check.svg" class="w-5" alt="" />
                  <p>شکایت شما ثبت گردید در اسرع وقت پیگیری خواهد شد</p>
                </div>
                <button :disabled="!formMeta.valid || loading" type="submit"
                  class="flex items-center justify-center rounded-md font-semibold w-full text-white my-2 py-2 px-6 text-sm outline-1 outline-offset-4 outline-blue-500"
                  :class="formMeta.valid ? 'bg-brand-blue' : 'bg-gray-400'">
                  ارسال پیام
                  <SharedLoading v-if="loading" />
                </button>
              </VForm>
            </div>
          </div>

          <div class="w-full lg:w-1/2 mx-auto farsi-num leading-1 p-8 ">
            <div class="flex h-full flex-col space-y-5  justify-between">
              <div>
                <img class="max-w-3/4 h-auto mx-auto" src="/images/complaint.png" alt="" />
                <div class="inline-flex gap-2">
                  <p class=" text-center leading-8 text-sm px-2 md:px-0 lg:px-20">
                    جهت اعلام شکایت، نظر، انتقاد و پیشنهاد در مورد سرویس‌دهی وب‌سایت ایرانی کار می‌توانید با شماره تلفن
                    ۵۴۹۴۵-۰۲۱ تماس
                    بگیرید یا از طریق فرم مربوطه موضوع موردنظر را با ما در میان بگذارید.
                  </p>
                </div>
              </div>

              <!-- socialmedias -->
              <div class="flex flex-col justify-center  mx-auto">
                <div class="flex flex-row justify-end pl-3 gap-3">
                  <NuxtLink to="https://www.linkedin.com/company/iranecar" target="_blank"
                    class="flex items-center gap-2">
                    <img class="w-8" src="/images/linkedin.png" alt="" />
                  </NuxtLink>
                  <NuxtLink to="https://www.aparat.com/iranecar" target="_blank" class="flex items-center gap-2">
                    <img class="w-8" src="/images/aparat.png" alt="" />
                  </NuxtLink>
                  <NuxtLink to="https://www.instagram.com/iranecar" target="_blank" class="flex items-center gap-2">
                    <img class="w-8" src="/images/insta.png" alt="" />
                  </NuxtLink>
                </div>
                <p class="tracking-[1em] mt-2 mx-auto">iranecar</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.cssShapeTitle {
  display: block;
  width: 100%;
  position: relative;
}

.cssShapeTitle::after {
  display: inline-block;
  position: absolute;
  top: 100%;
  left: 50;
  content: "";
  width: 5rem;
  height: 1.5rem;
  background-color: rgb(229, 231, 235);
  clip-path: polygon(50% 100%, 0 0, 100% 0);
  transform: translate(50%, 0);
  -webkit-transform: translate(50%, 0);
  -moz-transform: translate(50%, 0);
  -ms-transform: translate(50%, 0);
  -o-transform: translate(50%, 0);
}
</style>
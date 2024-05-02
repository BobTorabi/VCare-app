<script setup>
import { number, object, string } from "yup";
import { configure } from "vee-validate";

onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));

// Composables:
const { registerContact } = useContactUs();

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema = object({
  fullName: string()
    .min(4, "حداقل 4 حرف باشد ")
    .required("نام و نام خانوادگی الزامی است"),
  email: string()
    .min(4, "حداقل 4 حرف باشد ")
    .required("آدرس ایمیل الزامی است")
    .email("آدرس ایمیل معتبر نیست"),
  // mobile: string().matches(mobileRegex, "تلفن همراه معتبر نیست"),
  subject: string().required("عنوان شکایت الزامی است"),
  description: string().required("متن شکایت الزامی است"),
  // projectId : number(),
});

const initialValues = reactive({
  fullName: "",
  phoneNumber: "",
  email: "",
  title: "",
  description: "",
  // projectId : null,
});

// States
const errMessage = ref(null);
const loading = ref(false);
const success = ref(false);

// handle submit
const handleSubmit = (form) => {
  loading.value = true;
  registerContact(form).then(async (r) => {
    if (r.status === 200) {
      success.value = true;
      errMessage.value = null;
      loading.value = false;
    } else if (r.status == 500) {
      errMessage.value = r.messages[0];
      loading.value = false;
      success.value = false;
    }
  });
};
</script>

<template>
  <div class="relative pb-20">
    <div class="container mx-auto py-10 mb-10 lg:mb-0">
      <Head>
        <Title>تماس با ما</Title>
        <Meta name="description" content="تماس با ما" />
      </Head>

      <div class="flex flex-col space-y-10 px-0 lg:px-5 text-justify">
        <div
          class="w-full bg-gray-200 p-2 mb-2 text-center rounded-md cssShapeTitle"
        >
          <h1 class="font-bold text-xl text-brand-blue">تماس باما</h1>
        </div>

        <div
          class="w-full flex flex-col lg:flex-row space-y-2 md:shadow-md rounded-md md:border"
        >
          <!-- form -->
          <div
            class="w-full lg:w-1/2 mx-auto text-right p-10 border rounded-md shadow-md mt-0 md:mt-10 m-10 lg:mr-16"
          >
            <div class="w-full bg-white z-10">
              <p class="font-semibold text-center mb-3">
                کاربر گرامی از طریق فرم زیر می توانید با ما در ارتباط باشید
              </p>
              <VForm
                :validation-schema="schema"
                :initial-values="initialValues"
                v-slot="{ meta: formMeta, errors: formErrors, values }"
                @submit="handleSubmit"
                autocomplete="off"
                class="flex flex-col gap-2 static space-y-5 z-30"
              >
                <!-- fullName -->
                <ElementsVTextInput
                  class="mt-1 inline-block"
                  name="fullName"
                  :autofocus="true"
                  autocomplete="off"
                  type="text"
                  placeholder="محمد ..."
                  label="نام و نام خانوادگی"
                  :requiredStar="true"
                />
                <!-- email -->
                <ElementsVTextInput
                  name="email"
                  :autofocus="true"
                  autocomplete="off"
                  type="text"
                  placeholder="example@exam.com"
                  label="آدرس ایمیل"
                  :requiredStar="true"
                  dir="ltr"
                />
                <!-- phoneNumber -->
                <ElementsVTextInput
                  name="mobile"
                  :autofocus="true"
                  autocomplete="off"
                  type="text"
                  maxlength="11"
                  placeholder="09"
                  label="شماره تماس"
                  dir="ltr"
                />
                <!-- title -->
                <ElementsVTextInput
                  name="subject"
                  :autofocus="true"
                  autocomplete="off"
                  type="text"
                  placeholder="عنوان"
                  label="عنوان پیام"
                  :requiredStar="true"
                />
                <!-- description -->
                <ElementsVTextInput
                  name="description"
                  :autofocus="true"
                  autocomplete="off"
                  type="text"
                  placeholder="متن"
                  label="متن پیام"
                  :requiredStar="true"
                />
                <div
                  v-if="errMessage"
                  class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400"
                >
                  <img src="@/assets/icons/error.svg" alt="" />
                  <p>{{ errMessage }}</p>
                </div>
                <div
                  v-if="success"
                  class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-3 bg-green-100 text-green-700"
                >
                  <img src="@/assets/icons/check.svg" class="w-5" alt="" />
                  <p>
                    با سپاس، پیام شما ثبت گردید و توسط همکاران ما بررسی خواهد شد
                  </p>
                </div>
                <button
                  :disabled="!formMeta.valid || loading"
                  type="submit"
                  class="flex items-center justify-center rounded-md font-semibold w-full text-white my-2 py-2 px-6 text-sm outline-1 outline-offset-4 outline-blue-500"
                  :class="formMeta.valid ? 'bg-brand-blue' : 'bg-gray-400'"
                >
                  ارسال پیام
                  <SharedLoading v-if="loading" />
                </button>
              </VForm>
            </div>
          </div>
          <!-- contact detail -->
          <div
            class="w-full lg:w-1/2 mx-auto space-y-2 farsi-num leading-1 justify-center p-6 md:p-8"
          >
            <div class="flex h-full flex-col justify-between space-y-1 gap-1">
              <img
                class="max-w-3/4 h-auto mx-auto mb-5 md:mb-1"
                src="/images/contact-us.png"
                alt=""
              />
              <div
                class="flex h-full flex-col justify-center space-y-3 md:space-y-3 mt-2 md:mt-1 mx-auto px-1 md:px-2 lg:px-16"
              >
                <div class="inline-flex gap-2 align-top md:flex-row">
                  <p class="font-semibold text-md whitespace-nowrap">
                    آدرس شرکت:
                  </p>
                  <p class="text-justify w-full text-xs align-top self-start">
                    تهران ، خیابان فاطمی ، بین کارگر و سیندخت ،جنب بانک سینا
                    پلاک 220
                  </p>
                </div>
                <div class="inline-flex gap-2">
                  <p class="font-semibold text-md whitespace-nowrap">
                    کد پستی:
                  </p>
                  <p class="text-justify w-full text-xs pt-1">1598817411</p>
                </div>
                <div class="inline-flex gap-2">
                  <p class="font-semibold text-md whitespace-nowrap">
                    تلفن تماس:
                  </p>
                  <p class="text-justify w-full text-xs pt-1">88510922-4</p>
                </div>
                <div class="inline-flex gap-2">
                  <p class="font-semibold text-md whitespace-nowrap">
                    تلفن پشتیبانی:
                  </p>
                  <p class="text-justify w-full text-xs pt-1">88510922-4</p>
                </div>
                <div class="inline-flex gap-2">
                  <p class="font-semibold text-md whitespace-nowrap">
                    دورنگار:
                  </p>
                  <p class="text-justify w-full text-xs pt-1">88854625</p>
                </div>
                <div class="inline-flex gap-2">
                  <p class="font-semibold text-md whitespace-nowrap">
                    آدرس ایمیل:
                  </p>
                  <p class="text-justify w-full text-xs pt-1">
                    support@sapoco.com
                  </p>
                </div>
                <div class="inline-flex gap-2">
                  <p class="font-semibold text-md whitespace-nowrap">
                    ساعات کاری:
                  </p>
                  <p class="text-justify w-full text-xs pt-1">
                    شنبه تا چهارشنبه ساعت 9 الی 17، پنجشنبه ها ساعت 9 الی 13 و
                    جمعه ها تعطبل
                  </p>
                </div>
              </div>
              <!-- socialmedias -->
              <div class="flex flex-col justify-end pl-3 gap-1">
                <div class="flex flex-row justify-center pr-5 gap-3 mx-auto">
                  <NuxtLink
                    to="https://www.linkedin.com/company/iranecar"
                    target="_blank"
                    class="flex items-center gap-2"
                  >
                    <img class="w-8" src="/images/linkedin.png" alt="" />
                  </NuxtLink>
                  <NuxtLink
                    to="https://www.instagram.com/iranecar"
                    target="_blank"
                    class="flex items-center gap-2"
                  >
                    <img class="w-8" src="/images/insta.png" alt="" />
                  </NuxtLink>
                  <NuxtLink
                    to="https://www.aparat.com/iranecar"
                    target="_blank"
                    class="flex items-center gap-2"
                  >
                    <img class="w-8" src="/images/aparat.png" alt="" />
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

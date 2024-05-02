<script setup>
import { object, string } from "yup";
import { configure } from "vee-validate";
definePageMeta({
  layout: "login",
  middleware: "not-logged-in",
});

// Composables
const { loginForm } = useIdentity();
const cookieToken = useCookie('userToken');
const cookieUser = useCookie("userDetails");
const router = useRouter();
const { authToken, authUser } = useAuth();

// States
const loading = ref(false);
const errMessage = ref(null);

//VeeValidate
configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});
//const mobileRegex = /^(?:0|98|\+98|\+980|0098|098|00980)?(9\d{9})$/;
const schema = object({
  email: string()
    //.matches(mobileRegex, "تلفن همراه معتبر نیست")
    .min(4, "At least 4 letters.")
    .email("Email address is invalid.")
    .required("This field is required."),
  password: string().required("This field is required."),
});

const initialValues = reactive({
  email: "",
  password: "",
});

// login
const handleLogin = (form) => {
  loading.value = true;
  loginForm(form)
    .then(async (r) => {
      if (r.status === 200) {
        errMessage.value = null;
        cookieToken.value = await r.data.userToken;
        authToken.value = await cookieToken.value;
        cookieUser.value = await r.data.userDetails;
        authUser.value = await cookieUser.value;
        await router.push("/dashboard");
      } else if (r.status != 200) {
        errMessage.value = r.messages[0];
        loading.value = false;
      }
    })
    .catch((err) => {
      errMessage.value = err.data[0].errorDescription;
      loading.value = false;
    });
};
</script>

<template>
  <div class="flex h-full justify-center items-center">

    <Head>
      <Title>Login</Title>
      <!-- <Meta name="description" content="متا دیسکریپشن ورود" /> -->
    </Head>

    <div
      class="flex flex-col gap-5 w-[500px] h-[580px] px-10 py-10 mx-10 z-50 shadow-md bg-white text-color-green rounded-md">

      <VForm :validation-schema="schema" :initial-values="initialValues" v-slot="{ meta: formMeta }" autocomplete="off"
        @submit="handleLogin" class="flex flex-col items-center gap-5">
        <div class="flex items-center">
          <!-- <NuxtIcon name="calendar" filled="" class="w-6 h-6 mt-1 mx-2" />
          <h1 class="font-bold pt-1">VCare</h1> -->
          <img src="@/assets/images/logo.png" alt="" width="80" />
        </div>
        <div class="flex flex-col items-center w-full mt-8">
          <h1>Login Form</h1>
          <ElementsVTextInput :autofocus="true" autocomplete="off" type="email" name="email" placeholder="Email"
            dir="ltr" />

          <ElementsVTextInput autocomplete="off" type="password" name="password" placeholder="Password" dir="ltr" />
        </div>
        <button :disabled="!formMeta.valid || loading" type="submit"
          class="flex gap-3 items-center justify-center rounded-md font-semibold w-full max-w-md text-white py-2 px-6 text-sm outline-1 outline-offset-4"
          :class="formMeta.valid ? 'bg-color-green' : 'bg-gray-400'">
          Sign In
          <SharedLoadingFrom v-if="loading" />
        </button>
        <div v-if="errMessage"
          class="flex justify-center items-center font-semibold space-x-2 w-full text-center text-xs border p-2 bg-red-100 text-red-400">
          <img src="@/assets/icons/error.svg" alt="" />
          <p>{{ errMessage }}</p>
        </div>
      </VForm>
    </div>
  </div>
</template>

<script setup>
import { number, object, string } from "yup";
import { configure } from "vee-validate";
definePageMeta({
    layout: "navak",
});

// States
const headerSection = [
    {
        Image: "/images/navak/contact-us.png",
        h1: "درخواست دمو و مشاوره رایگان",
        h2: "مشاوره رایگان",
        p: "برای دریافت مشاوره و دمو رایگان اطلاعات خود را در فرم زیر ثبت کنید. کارشناسان ما در اولین فرصت با شما تماس می‌گیرند تا متناسب با نیاز شما، بهترین راهکار نرم‌افزاری را پیشنهاد دهند.",
        tel: '021-54945',
        telInsideNum: '1',
    },
];

// Composables:
const { registerNavakContact } = useContactUs();
const router = useRouter()

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
    companyTitle: string().required("نام سازمان /شرکت الزامی است"),
    mobile: string().required("تلفن همراه الزامی است"),
    organizationPhone: string().required("تلفن سازمان الزامی است"),
    organizationLevel: string().required("سمت سازمانی الزامی است"),
    email: string().min(4, "حداقل 4 حرف باشد ").required("آدرس ایمیل الزامی است").email("آدرس ایمیل معتبر نیست"),
    province: string().required("استان الزامی است"),
    webSite_Url: string().required("آدرس وب سایت الزامی است"),
    // subject: string().required("عنوان شکایت الزامی است"),
    // description: string().required("متن شکایت الزامی است"),
    // projectId : number(),
});

const initialValues = reactive({
    fullName: '',
    phoneNumber: '',
    email: '',
    title: '',
    description: '',
    // projectId : null,
});

// States
const errMessage = ref(null);
const loading = ref(false);
const success = ref(false);

// handle submit
const handleSubmit = (form) => {
    loading.value = true;
    form.typeContact = 1 // navak typeContact
    registerNavakContact(form)
        .then(async (r) => {
            if (r.status === 200) {
                router.push("/navak/confirmation")
                errMessage.value = null;
                success.value = true;
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
    <div class="flex flex-col gap-28 py-5 md:py-14 mx-auto">

        <Head>
            <Title>ارتباط با ما</Title>
            <Meta name="description" content="ارتباط با ما" />
        </Head>

        <div class="xl:container mx-auto px-5 mt-10 ">
            <div v-for="(headerSection, index) in headerSection" :key="index">
                <div class="flex flex-col-reverse md:flex-row justify-center items-center gap-5">
                    <div class="md:w-1/2 flex flex-col items-center space-y-3 md:pl-10">
                        <h1 class="text-lg md:text-3xl lg:text-4xl font-extrabold text-brand-red ">{{ headerSection.h1 }}
                        </h1>
                        <p class="md:w-96 text-brand-blue leading-10">{{ headerSection.p }}</p>
                    </div>
                    <div class="w-full md:w-1/2 flex justify-center items-center max-h-96">
                        <nuxt-img :src="headerSection.Image" loading="lazy" sizes="sm:100vw md:50vw lg:50vw" format="webp"
                            quality="100" fit="cover" />
                    </div>
                </div>
            </div>
        </div>
        <div class="xl:container w-full mx-auto bg-gray-100 py-10 px-10">
            <VForm :validation-schema="schema" :initial-values="initialValues" v-slot="{ meta: formMeta }"
                @submit="handleSubmit" autocomplete="off" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 static z-30">
                <!-- fullName -->
                <ElementsVTextInput class="" name="fullName" :autofocus="true" autocomplete="off" type="text"
                    placeholder="محمد ..." label="نام و نام خانوادگی" :requiredStar="true" />

                <ElementsVTextInput name="companyTitle" autocomplete="off" type="text" label="نام سازمان / شرکت"
                    placeholder="ناوک" :requiredStar="true" />

                <!-- phoneNumber -->
                <ElementsVTextInput name="mobile" autocomplete="off" type="text" maxlength="11" placeholder="09"
                    label="تلفن همراه" dir="ltr" :requiredStar="true" />
                <!-- phoneNumber -->
                <ElementsVTextInput name="organizationPhone" autocomplete="off" type="text" maxlength="11" label="تلفن سازمان" dir="ltr"
                    :requiredStar="true" />

                <ElementsVTextInput name="organizationLevel" autocomplete="off" type="text" placeholder="مدیر فروش"
                    label="سمت سازمانی" :requiredStar="true" />

                <ElementsVTextInput name="fieldofActivityCompany" autocomplete="off" type="text" placeholder="خرید و فروش"
                    label="صنعت و زمینه فعالیت سازمانی" />
                <!-- email -->
                <ElementsVTextInput name="email" autocomplete="off" type="text" placeholder="example@exam.com" label="ایمیل"
                    :requiredStar="true" dir="ltr" />

                <ElementsVTextInput name="province" autocomplete="off" type="text" placeholder="فارس" label="استان"
                    :requiredStar="true" />

                <ElementsVTextInput name="webSite_Url" autocomplete="off" type="text" placeholder="www.iranecar.com"
                    label="آدرس وب سایت" :requiredStar="true" />
                <!-- description -->
                <div v-if="errMessage"
                    class="flex justify-center items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-2 bg-red-100 text-red-400">
                    <img src="@/assets/icons/error.svg" alt="" />
                    <p>{{ errMessage }}</p>
                </div>

                <button :disabled="!formMeta.valid || loading" type="submit"
                    class="flex gap-3 lg:col-start-4 lg:col-end-4 rounded-md px-16 place-self-end py-2 font-semibold h-fit w-fit text-white my-2 text-sm outline-1 outline-offset-4 outline-blue-500"
                    :class="formMeta.valid ? 'bg-brand-red' : 'bg-gray-400'">
                    ارسال
                    <SharedLoading v-if="loading" />
                </button>
                <div v-if="success"
                    class="flex justify-center col-span-full items-center font-semibold space-x-2 space-x-reverse w-full text-center text-xs border p-3 bg-green-100 text-green-700">
                    <img src="@/assets/icons/check.svg" class="w-5" alt="" />
                    <p>با سپاس، پیام شما ثبت گردید و توسط همکاران ما بررسی خواهد شد</p>
                </div>
            </VForm>
        </div>
    </div>
</template>
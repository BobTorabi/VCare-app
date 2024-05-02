<script setup>
import { useEmail } from '~~/composables/temp/useEmail';
import { object, string } from "yup";
import { configure } from "vee-validate";

// Composables
const route = useRoute();
const { subscribeNewsletter } = useEmail();

// veeValidate
configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
});

const schema = object({
    email: string().min(4, "حداقل 4 حرف باشد ").required("آدرس ایمیل الزامی است").email("آدرس ایمیل معتبر نیست"),
});
const initialValues = reactive({
    email: ''
});

// State:
const validEmailStatus = ref(false)
// validate email with RegEx
const ValidateEmail = (inputText) => {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    (inputText.match(mailformat)) ? validEmailStatus.value = true : validEmailStatus.value = false;
}

const goToTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }) };

</script>

<template>
    <div class="">
        <!-- Mobile Footer -->
        <div v-if="!route.path.startsWith('/navak')"
            class="fixed footer-shadow lg:hidden bottom-0 left-0 w-full bg-white h-16 flex justify-between items-center px-5 py-2 text-xs z-40">
            <NuxtLink to="/profile/my-cars" class="flex flex-col space-y-0.5 items-center">
                <span :class="route.path === '/profile/my-cars' && route.path !== '/profile'
                    ? 'flex bg-gray-200 rounded-full p-1.5'
                    : 'flex bg-white rounded-full p-1.5'">
                    <svg class="flex self-center justify-self-center" width="16" height="18" viewBox="0 0 18 16"
                        :fill="route.path === '/profile/my-cars' ? '#002664' : '#B4B4B4'"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M15.92 1.01C15.72 0.42 15.16 0 14.5 0H3.5C2.84 0 2.29 0.42 2.08 1.01L0.11 6.68C0.0399999 6.89 0 7.11 0 7.34V14.5C0 15.33 0.67 16 1.5 16C2.33 16 3 15.33 3 14.5V14H15V14.5C15 15.32 15.67 16 16.5 16C17.32 16 18 15.33 18 14.5V7.34C18 7.12 17.96 6.89 17.89 6.68L15.92 1.01ZM3.5 11C2.67 11 2 10.33 2 9.5C2 8.67 2.67 8 3.5 8C4.33 8 5 8.67 5 9.5C5 10.33 4.33 11 3.5 11ZM14.5 11C13.67 11 13 10.33 13 9.5C13 8.67 13.67 8 14.5 8C15.33 8 16 8.67 16 9.5C16 10.33 15.33 11 14.5 11ZM2 6L3.27 2.18C3.41 1.78 3.79 1.5 4.22 1.5H13.78C14.21 1.5 14.59 1.78 14.73 2.18L16 6H2Z" />
                    </svg>
                </span>
                <!-- <img src="/icons/my-car.svg" alt="" /> -->
                <p :class="route.path === '/profile/my-cars'
                    ? 'text-brand-blue font-semibold'
                    : 'text-gray-500'
                    ">
                    خودروهای من
                </p>
            </NuxtLink>
            <NuxtLink to="/" class="flex flex-col space-y-0.5 items-center">
                <span :class="route.path === '/'
                    ? 'flex bg-gray-200 rounded-full p-1.5'
                    : 'flex bg-white rounded-full p-1.5'">
                    <svg class="flex self-center justify-self-center" width="16" height="18" viewBox="0 0 16 18"
                        :fill="route.path === '/' ? '#002664' : '#B4B4B4'" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 17.6087V5.86957L7.82609 0L15.6522 5.86957V17.6087H9.83478V10.6174H5.81739V17.6087H0Z" />
                    </svg>
                </span>
                <p :class="route.path === '/' ? 'text-brand-blue font-semibold' : 'text-gray-500'
                    ">
                    خانه
                </p>
            </NuxtLink>
            <NuxtLink to="/profile" class="flex flex-col space-y-0.5 items-center">
                <span :class="route.path === '/profile' && route.path !== '/profile/my-orders'
                    ? 'flex bg-gray-200 rounded-full p-1.5'
                    : 'flex bg-white rounded-full p-1.5'">
                    <svg class="flex self-center justify-self-center" width="16" height="16" viewBox="0 0 16 16" :fill="route.path === '/profile' && route.path !== '/profile/my-orders'
                        ? '#002664'
                        : '#B4B4B4'
                        " xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8 8C6.9 8 5.95833 7.60833 5.175 6.825C4.39167 6.04167 4 5.1 4 4C4 2.9 4.39167 1.95833 5.175 1.175C5.95833 0.391667 6.9 0 8 0C9.1 0 10.0417 0.391667 10.825 1.175C11.6083 1.95833 12 2.9 12 4C12 5.1 11.6083 6.04167 10.825 6.825C10.0417 7.60833 9.1 8 8 8ZM0 16V13.2C0 12.6333 0.146 12.1123 0.438 11.637C0.729334 11.1623 1.11667 10.8 1.6 10.55C2.63333 10.0333 3.68333 9.64567 4.75 9.387C5.81667 9.129 6.9 9 8 9C9.1 9 10.1833 9.129 11.25 9.387C12.3167 9.64567 13.3667 10.0333 14.4 10.55C14.8833 10.8 15.2707 11.1623 15.562 11.637C15.854 12.1123 16 12.6333 16 13.2V16H0Z" />
                    </svg>
                </span>
                <p :class="route.path === '/profile' && route.path !== '/profile/my-orders'
                    ? 'text-brand-blue font-semibold'
                    : 'text-gray-500'
                    ">
                    حساب کاربری
                </p>
            </NuxtLink>
        </div>
        <!-- Main Footer -->
        <!-- <div class="hidden lg:block"> -->
        <div class="block ">
            <div class="bg-brand-blue text-gray-300 pt-3 pb-1 md:py-12 farsi-num">
                <!-- links -->
                <div class="xl:container mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-5">
                    <div class="flex flex-col space-y-3 relative">
                        <button type="button" @click="goToTop"
                            class="flex md:hidden absolute bg-blue-top left-0 top-3 flex-row gap-2 w-max rounded-md py-2 px-3 justify-center items-center ">
                            <NuxtIcon name="arrow-left" class="rotate-90 w-4 h-auto" />
                            <span class="text-lg">بازگشت به بالا</span>
                        </button>
                        <img class="w-40" src="/images/navak/navakLogo.png" alt="">
                        <p>
                            ناوک ابزار ی فلزی یا چوبی است که برای افزایش سرعت و دقت
                            حرکت پیکان، بر نوک آن قرار می دهند.
                        </p>
                    </div>
                    <div class="flex flex-col  space-y-3">
                        <h3 class="text-white font-semibold">سرویس ها</h3>
                        <div class="border-r pr-2 flex flex-col space-y-3 text-xs">
                            <NuxtLink to="/navak/retail" class="hover:opacity-60">خرده فروشی</NuxtLink>
                            <NuxtLink to="/navak/wholesale" class="hover:opacity-60">عمده فروشی</NuxtLink>
                            <NuxtLink to="/navak/single-sell" class="hover:opacity-60">تک فروشی</NuxtLink>
                            <NuxtLink to="/navak/agents-network" class="hover:opacity-60">شبکه مجازی نمایندگی ها</NuxtLink>
                            <NuxtLink to="/navak/warranty" class="hover:opacity-60">گارانتی الکترونیکی و رهگیری کالا
                            </NuxtLink>
                        </div>
                    </div>
                    <div class="flex flex-col  space-y-3">
                        <h3 class="text-white font-semibold">درباره ما</h3>
                        <div class="border-r pr-3 flex flex-col space-y-3 text-xs">

                            <div class="flex flex-row gap-5">
                                <NuxtLink to="/navak/contact-us" class="hover:opacity-60">تماس با ما :</NuxtLink>
                                <NuxtLink to="tel:02154945" class="ml-0 md:ml-4 hover:opacity-60">021-65012130</NuxtLink>
                            </div>
                            <p class=" self-top leading-6 ">
                                آدرس: تهران، خیابان فاطمی، بین خیابان کارگر و خیابان سیندخت، جنب
                                بانک سینا پلاک ۲۲۰بلوکB واحد۲۰۱
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <!-- copyright -->
            <div class="bg-brand-red text-center text-[9px] md:text-sm py-1 md:py-2 text-white mb-20 lg:mb-0">
                کلیه حقوق برای شرکت مشاورین گسترش الکترونیک ایما (مگا) محفوظ است. کپی
                رایت ۲۰۲۳
            </div>
        </div>
    </div>
</template>

<style  scoped>
.footer-shadow {
    filter: drop-shadow(0 1px 7px rgba(0, 0, 0, 0.2));
}

.arrowMoreInfo {
    display: inline-flex;
}

.arrowMoreInfo::after {
    position: relative;
    content: '\27F5';
    width: 15px;
    margin-right: 5px;
}

.arrowTopButton {
    display: inline-flex;
}

.bg-blue-top {
    background-color: rgba(0, 29, 76, 1);

}
</style>
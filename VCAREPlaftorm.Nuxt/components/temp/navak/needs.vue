<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));

const smallCardData = [
    {
        id: 1,
        icon: "/images/navak/need1.png",
        title: "نیازی به مرکز تماس مشتری ندارید ",
        title2:"ناوک تأمین می کند"
    },
    {
        id: 2,
        icon: "/images/navak/need2.png",
        title: "نیازی به ارسال پیامک و ایمیل ندارید",
        title2:"ناوک ارسال می‌کند"
    },
    {
        id: 3,
        icon: "/images/navak/need3.png",
        title: "نیازی به پروتکل های بانکی و امنیتی ندارید",
        title2: "ناوک تأمین می‌کند"
    },
    {
        id: 4,
        icon: "/images/navak/need4.png",
        title: "نیازی به انجام پشتیبانی سامانه‌های فروش  ندارید",
        title2:"ناوک پشتیبانی می‌کند"
    },
    // {
    //     id: 5,
    //     icon: "/images/navak/need5.png",
    //     title: "نیازی به پرداخت مستقیم  ندارید",
    //     title2:"تراکنشی حساب می‌کند"
    // },
];



</script>

<template>
    <div class="xl:container mx-auto bg-gray-100 flex flex-col py-5 justify-center lg:px-0 farsi-num">
        <h2 class="text-2xl font-extrabold mx-auto text-brand-blue">
            نیازمندی‌های زیر توسط ناوک تأمین می‌شود
        </h2>
        <div class="container mx-auto lg:px-20 xl:px-40 ">
            <div class="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4  gap-5 my-6">
                <div class="  " v-for="card in smallCardData" :key="card">
                    <div class="flex flex-col gap-2 rounded-lg w-40 h-40 bg-white items-center justify-center mx-auto px-5 shadow">
                        <img :src="card.icon" class="w-14 self-center mx-auto " :alt="card.title" />
                        <p class="mx-auto text-center text-xs"> {{ card.title }} </p>
                        <div
                            class="text-xs justify-center h-fit whitespace-nowrap bg-brand-blue text-white py-2 px-5 rounded-2xl ">
                            <span>{{ card.title2 }}</span>
                        </div>
                    </div>

                    <div class="block  mx-auto text-center mt-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

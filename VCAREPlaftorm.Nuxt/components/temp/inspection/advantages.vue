<script setup>
    onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));

const smallCardData = [
    {
        id: 1,
        icon: "/images/inspection/adventage1.png",
        title: "تیمی متشکل از کارشناسان مجرب و با سابقه",
    },
    {
        id: 2,
        icon:  "/images/inspection/adventage2.png",
        title: "حضور کارشناس ظرف مدت 30 دقیقه پس از تماس",
    },
    {
        id: 3,
        icon:  "/images/inspection/adventage3.png",
        title: "استفاده از تجهیزات دیجیتال جهت کارشناسی خودرو",
    },
    {
        id: 4,
        icon:  "/images/inspection/adventage4.png",
        title: "کارشناسی فنی و بدنه خودرو و صدور برگه کارشناسی",
    },
    {
        id: 5,
        icon:  "/images/inspection/adventage5.png",
        title: "ارائه ضمانتنامه در صورت قصور کارشناسان ایرانی کار",
    },
    {
        id: 6,
        icon:  "/images/inspection/adventage6.png",
        title: "ارائه مشاوره رایگان جهت انجام یک معامله امن",
    },
];



</script>

<template>
    <div class="flex flex-col justify-center  py-8 md:py-14 px-5 lg:px-0 farsi-num">
        <h2 class="text-lg md:text-2xl font-extrabold mx-auto">
            مزایای کارشناسی خودرو ایرانی کار
        </h2>
        <div class="container max-w-xl mx-auto flex items-center justify-center">
            <div class="grid grid-cols-3 gap-5 my-10">
                <div class="  " v-for="card in smallCardData" :key="card">
                    <div class="flex rounded-full items-center justify-center mx-auto">
                        <img :src="card.icon" class="w-28 self-center mx-auto " :alt="card.title" />
                    </div>
                        
                    <div class="block  mx-auto text-center mt-2">
                        <p class="mx-auto text-center text-xs"> {{ card.title }} </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

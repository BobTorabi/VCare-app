<script setup>
definePageMeta({
    layout: "navak",
});

// States
const headerSection = [
    {
        Image: "/images/navak/confirmation.png",
        h1: "سپاسگذاریم",
        p: "اطلاعات شما با موفقیت ثبت شد. همکاران ما به‌زودی با شما تماس می‌گیرند . با احترام",
        tel: '021-54945',
        telInsideNum: '1',
    },
];
</script>

<template>
    <div class="flex flex-col items-center gap-20 py-5 md:py-14 px-5">

        <Head>
            <Title>درباره ما</Title>
            <Meta name="description" content="ارتباط با ما" />
        </Head>

        <div class="xl:container mx-auto px-5 md:mt-10 ">
            <div v-for="(headerSection, index) in headerSection" :key="index">
                <div class="flex flex-col-reverse md:flex-row justify-center items-center gap-5">
                    <div class="md:w-1/2 flex flex-col space-y-3 md:pl-10">
                        <h1 class="text-lg md:text-4xl font-extrabold text-brand-red ">{{ headerSection.h1 }}</h1>
                        <p class="md:text-2xl md:w-96 text-brand-blue leading-10">{{ headerSection.p }}</p>

                    </div>
                    <div class="w-full md:w-1/2 flex justify-center items-center max-h-96">
                        <nuxt-img :src="headerSection.Image" loading="lazy" sizes="sm:100vw md:50vw lg:50vw" format="webp"
                            quality="100" fit="cover" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-10 md:flex-row items-center md:mt-10">
            <a href="/pdf/Navak.pdf" class="relative">
                <p
                    class="absolute bottom-0 left-0 right-0 top-0 grid place-items-center text-2xl font-extrabold shadow shadow-white text-brand-blue leading-10">
                    دانلود کاتالوگ ناوک</p>
                <img class="max-w-md w-80 md:w-auto" src="/images/navak/download-catalog.png" alt="">
            </a>
            <NuxtLink to="/navak/about-us" class="relative">
                <p
                    class="absolute  bottom-0 left-0 right-0 top-0 grid place-items-center text-2xl font-extrabold shadow-white  text-brand-blue leading-10">
                    درباره ما</p>
                <img class="max-w-md w-80 md:w-auto" src="/images/navak/about-us-confirmation.png" alt="">
            </NuxtLink>
        </div>
    </div>
</template>
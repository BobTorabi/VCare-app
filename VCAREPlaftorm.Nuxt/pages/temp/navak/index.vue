<script setup>
definePageMeta({
    layout: "navak",
});
// States
const headerSection = [
    {
        Image: "/images/navak/main.png",
        h1: "با ناوک به هدف بزنید",
        h2: "مشاوره رایگان",
        h2Black: "قیمت ",
        p: "پـیش‌خـوان الکتـرونیکی فــروش و خدمات پس از فروش ناوک",
        tel: '021-54945',
        telInsideNum: '1',
    },
];

const data = [
    {
        h2: "تأمین محیط‌های نرم افزاری",
        image: "/images/navak/computers.png",
        listItems: [
            "پشتیبانی از انواع روش های فروش کالا",
            "قابلیت مدیریت هجوم های لحظه ای کاربران",
            "قابلیت استفاده از اپلیکیشن های موبایل در فرآیند های اجرایی",
            "پنل مدیریت برنامه های فروش و داشبورد مدیریتی"
        ],
    },
    {
        h2: "تأمین محیط‌های سخت افزاری",
        image: "/images/navak/servers.png",
        listItems: [
            "پشتیبانی از تکنولوژی ابری",
            "تامین سرورها و منابع سخت افزاری مورد نیاز",
            "تامین پهنای باند مورد نظر",
        ],
    }
];
</script>

<template>
    <div class="w-full py-14 mx-auto">

        <Head>
            <Title>صفحه اصلی</Title>
            <Meta name="description" content="پـیش‌خـوان الکتـرونیکی فــروش و خدمات پس از فروش ناوک" />
        </Head>

        <div class="xl:container mx-auto px-5 mt-10">

            <div v-for="(headerSection, index) in headerSection" :key="index">
                <div class="flex flex-col-reverse md:flex-row justify-center items-center gap-5">
                    <div class="md:w-1/2 flex flex-col items-center space-y-3 md:pl-10  text-center">
                        <h1 class="text-lg md:text-4xl font-extrabold text-brand-red ">{{ headerSection.h1 }}</h1>
                        <p class="md:text-2xl w-96 text-brand-blue leading-10">{{ headerSection.p }}</p>

                        <div class="flex flex-col md:flex-row gap-4 justify-center md:gap-1 items-center ">
                            <a href="/pdf/Navak.pdf"
                                class="flex justify-center items-center gap-2 text-xl text-brand-blue  whitespace-nowrap bg-gray-100 px-12 md:px-8 py-1 rounded-2xl ">
                                <span>دانلود کاتالوگ</span>
                                <NuxtIcon class="w-5" name="download" />
                            </a>
                            <NuxtLink to="/navak/contact-us"
                                class="justify-center text-xl whitespace-nowrap bg-brand-red text-white px-8 py-1 rounded-2xl ">
                                <span>جلسه رایگان دمو</span>
                            </NuxtLink>

                        </div>
                    </div>
                    <div class="w-full md:w-1/2 flex justify-center items-center max-h-96">
                        <nuxt-img :src="headerSection.Image" loading="lazy" sizes="sm:100vw md:50vw lg:50vw" format="webp"
                            quality="100" fit="cover" />
                    </div>
                </div>
            </div>
        </div>

        <div class="xl:container mx-auto px-5 my-10 leading-8">
            <h1 class="text-lg md:text-2xl text-brand-blue font-extrabold text-right mt-10">
                ناوک چیست؟
            </h1>
            <p class="text-justify leading-9 text-lg mt-4">
                ناوک یک زیر ساخت منسجم و یک‌پارچه در فضای مجازی است که از طریق آن واحد‌های تولیدی - صنعتی قادر هستند
                با
                تمامی حلقه‌های زنجیره فروش و توزیع کالا به صورت مستقیم وارد محاوره و تعامل شوند.
                <br />
                ارائه این سرویس‌ها از طریق پنج محیط نرم‌افزار و چند اپلیکیشن کاربردی به انجام می‌رسد.
            </p>
        </div>

        <NavakNeeds />

        <div class="flex flex-col-reverse justify-center md:flex-row xl:container mx-auto px-5 my-8 leading-8">
            <div class="w-full md:w-1/2 flex flex-col justify-center">
                <h3 class="text-lg font-extrabold text-right text-brand-blue mt-10">
                    مهمترین چالش های واحدهای تولیدی - صنعتی
                </h3>
                <ul class="mt-5">
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            نیاز به سرمایه‌گذاری کلان برای ایجاد شبکه مناسب توزیع
                        </span>
                    </li>
                    <li class="flex juce items-center  gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            مشکلات مربوط به گارانتی محصول
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            عدم تسلط بر نوسانات قیمت در بازار
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            وابستگی شدید به خریداران عمده محصول
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            عدم امکان رهگیری کالا
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            توان اندک برای گسترش بازار رقابت
                        </span>
                    </li>
                </ul>
            </div>
            <div class="w-full md:w-1/2 flex justify-center items-center max-h-96">
                <nuxt-img src="/images/navak/laptop.png" loading="lazy" sizes="sm:100vw md:50vw lg:50vw" format="webp"
                    quality="100" fit="cover" />
            </div>
        </div>

        <div class="flex flex-col-reverse md:flex-row-reverse xl:container mx-auto px-5 my-10 leading-8">
            <div class="w-full md:w-1/2 flex flex-col">
                <h3 class="text-lg text-brand-blue font-extrabold text-right mt-10">
                    راهکار‌های ناوک
                </h3>
                <ul class="mt-5">
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            نفوذ بیشتر در بازار
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            ایجاد منظومه‌ای از شبکه نمایندگی مجازی در سطح کشور
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            افزایش توان در توزیع مویرگی
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            مدیریت گارانتی محصول
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            امکان رهگیری کالا در سطح کشور
                        </span>
                    </li>
                    <li class="flex juce items-center gap-2">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            توان اندک برای گسترش بازار رقابت
                        </span>
                    </li>
                </ul>
            </div>
            <div class="w-full md:w-1/2 flex justify-center items-center max-h-96">
                <nuxt-img src="/images/navak/box.png" loading="lazy" sizes="sm:100vw md:50vw lg:50vw" format="webp"
                    quality="100" fit="cover" />
            </div>
        </div>

        <NavakServices />


        <div id="works" class="mx-auto flex flex-col md:flex-row gap-20 items-center justify-center py-10">
            <div class="flex flex-col items-center gap-5">
                <h2 class="text-lg font-extrabold text-right text-brand-blue mt-5">
                    خدمات ناوک
                </h2>
                <img class="w-72" src="/images/navak/services.png" alt="">
            </div>
            <div v-for="(item, index) in data" :key="index" class="flex flex-col items-center gap-5">
                <img class="w-36" :src="item.image" alt="">
                <h2 class="text-brand-red font-semibold">
                    {{ item.h2 }}
                </h2>
                <ul class="">
                    <li class="flex juce items-center gap-2 my-3" v-for="(list, index) in item.listItems" :key="index">
                        <NuxtIcon class="w-3" name="list-arrow" />
                        <span>
                            {{ list }}
                        </span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex flex-col bg-gray-100 py-4 gap-10">
            <div class="flex flex-col-reverse justify-center md:flex-row mx-auto px-5 leading-8">
                <div class="w-full flex flex-col justify-center">
                    <h3 class="text-lg text-brand-blue font-extrabold text-right">
                        به ازای هر تراکنش؛ پرداخت کنید
                    </h3>
                    <p class="mt-5">
                        استفاده از سرویس‌ها و خدمات فنی، متضمن هیچگونه پرداخت مستقیمی از سوی واحد تولیدی
                        نمی‌باشد.
                        جبران
                        این
                        خدمات از محل تراکنش‌های انجام گرفته در قالب سرویس‌های پنج گانه تأمین خواهد شد.
                    </p>
                </div>
                <div class="w-full flex justify-center items-center">
                    <img class="w-96" src="/images/navak/transaction.png" alt="">
                </div>
            </div>
            <div class="flex flex-col-reverse md:flex-row-reverse xl:container mx-auto px-5 leading-8">
                <div class="w-full flex flex-col gap-5">
                    <h3
                        class="flex justify-center items-center gap-3 text-lg font-extrabold text-brand-blue text-right mt-10">
                        <img class="w-8 h-4" src="/images/navak/navak-arrow.png" alt="">
                        دریافت اطلاعات بیشتر و مشاوره رایگان
                        <img class="w-8 h-4 rotate-180" src="/images/navak/navak-arrow.png" alt="">
                    </h3>
                    <p>
                        استفاده از سرویس‌ها و خدمات فنی ناوک، متضمن هیچگونه پرداخت مستقیمی از سوی واحد تولیدی
                        نمی‌باشد.
                        جبران این خدمات از محل تراکنش‌های انجام گرفته در قالب سرویس‌های پنج گانه ناوک تامین
                        خواهد‌شد.
                    </p>
                    <NuxtLink to="/navak/contact-us"
                        class="text-center w-fit self-end px-8 whitespace-nowrap bg-brand-red text-white py-1 rounded-2xl ">
                        جلسه رایگان دمو
                    </NuxtLink>
                </div>
                <div class="w-full flex justify-center items-center">
                    <img class="w-96" src="/images/navak/consulting.png" alt="">
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
definePageMeta({
    layout: "navak",
});

// States
const headerSection = [
    {
        Image: "/images/navak/about-us.png",
        h1: "مگا در یک نگاه",
        p: "مشاورین گسترش الکترونیک ایما (مگا) متخصص در زمینه تجارت الکترونیکی ",
        tel: '021-54945',
        telInsideNum: '1',
    },
];
</script>

<template>
    <div class="flex flex-col gap-5 py-14 mx-auto">

        <Head>
            <Title>درباره ما</Title>
            <Meta name="description" content="ارتباط با ما" />
        </Head>

        <div class="xl:container mx-auto px-5 mt-10 ">
            <div v-for="(headerSection, index) in headerSection" :key="index">
                <div class="flex flex-col-reverse md:flex-row justify-center items-center gap-5">
                    <div class="md:w-1/2 flex flex-col items-center space-y-3 md:pl-10  text-center">
                        <h1 class="text-lg md:text-4xl font-extrabold text-brand-red ">{{ headerSection.h1 }}</h1>
                        <p class="md:text-2xl w-96 text-brand-blue leading-10">{{ headerSection.p }}</p>

                    </div>
                    <div class="w-full md:w-1/2 flex justify-center items-center max-h-96">
                        <nuxt-img :src="headerSection.Image" loading="lazy" sizes="sm:100vw md:50vw lg:50vw" format="webp"
                            quality="100" fit="cover" />
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-col-reverse justify-center md:flex-row items-center xl:container mx-auto px-5 leading-8">
            <div class="w-full md:w-1/3 flex flex-col gap-5 items-center justify-center">
                <h3 class="text-lg font-extrabold text-right text-brand-blue">
                    مگا از دیروز تاکنون
                </h3>
                <img class="w-72" src="/images/navak/mega-logo.png" alt="">
            </div>
            <div class="w-full md:w-2/3 flex justify-center items-center max-h-96">
                <p>
                    مشاورین گسترش الکترونیک ایما (مگا) یک شرکت تخصصی در زمینه تجارت الکترونیکی است که به پشتوانه ۲۰ سال حضور
                    مستمر در این عرصه با بهره‌گیری از متخصصان و کارشناسان ارشد، مجموعه ­ای غنی را برای نقش آفرینی موثر در
                    فضای کسب و کار الکترونیکی کشور فراهم آورده است. مگا به پشتوانه تجارب مختلف در بخش ­های دولتی و خصوصی، در
                    مدت زمان فعالیت خود توانسته است در حوزه‌های مختلف تجارت الکترونیکی موفقیت‌های قابل قبولی کسب نماید. در
                    این رابطه می ­توان به طور خاص به نقش کلیدی این شرکت در صنعت خودروی کشور اشاره کرد.
                </p>
            </div>
        </div>

        <div
            class="flex mt-6 flex-col-reverse justify-center md:flex-row-reverse items-center xl:container mx-auto px-5  leading-8">
            <div class="w-full md:w-1/3 flex flex-col gap-5 items-center justify-center">
                <img class="w-60" src="/images/navak/about-us-man.png" alt="">
            </div>
            <div class="w-full md:w-2/3 flex justify-center items-center max-h-96">
                <p>
                    سال‌ها تجربه در زمینه طراحی، تولید، مدیریت و پشتیبانی از پرتال‌های گوناگون تجارت الکترونیکی و سیستم‌های
                    فروش اینترنتی محصولات، مگا را در جایگاهی قرار داده که قادر است هر کسب و کاری را در قالب الکترونیکی تصور
                    نموده و قابلیت‌ها و زوایای پنهان آن را برای سوددهی بیشتر تحلیل نماید و بر اساس این تحلیل، فرایند
                    الکترونیکی شدن یک کسب و کار را راهبری و مدیریت نماید. بدیهی است که این تخصص در حوزه تحلیل کسب و کار و
                    شناسایی فرصت‌های تجاری را نباید با تخصص تولید پرتال‌ و ابزارهای مورد استفاده در تجارت الکترونیکی یکسان
                    فرض نمود.
                </p>
            </div>
        </div>

    </div>
    <div class="bg-gray-100 py-12">
        <div class="flex flex-col-reverse justify-center md:flex-row items-center xl:container mx-auto px-5 leading-8">
            <div class="w-full md:w-1/3 flex flex-col gap-5 items-center justify-center">
                <img class="w-72" src="/images/navak/about-us-stairs.png" alt="">
            </div>
            <div class="w-full md:w-2/3 flex flex-col gap-5 max-h-96">
                <h3 class="text-lg font-extrabold text-right text-brand-blue">
                    ماموریت ما
                </h3>
                <p>
                    با همه ­گیر شدن استفاده از اینترنت و فضای مجازی در ساز و کارهای روزمره آحاد جامعه، نیازمندی­ در این حوزه
                    همه روزه در حال تغییر است. در حال حاضر تقاضا برای دریافت سرویس‌های مبتنی بر وب، به تدریج جایگزین تقاضا
                    برای دریافت نرم افزارهای مبتنی بر وب شده است. با درک این تقاضا، شرکت مگا جایگاه خویش را در فضای کسب و
                    کار الکترونیکی کشور به عنوان ارائه دهنده سرویس‌های مبتنی بر وب در حوزه تجارت الکترونیکی تعریف نموده است.

                </p>
            </div>
        </div>
        <div class="xl:container mx-auto mt-10 w-full flex flex-col items-center text-center gap-3 leading-8">
            <h3 class="text-lg font-extrabold text-right text-brand-red">
                بر این اساس ماموریت مگا را می‌توان در عبارات زیر بیان نمود:
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                <div class="flex flex-col gap-3 justify-center p-2 items-center rounded-md bg-white h-60 w-60 shadow">
                    <div class="h-1/4">
                        <img class="w-16" src="/images/navak/mission01.png" alt="">
                    </div>
                    <div class="h-3/4">
                        <p>
                            ایجاد زیرساخت ­های لازم برای ارائه سرویس‌های مبتنی بر وب در حوزه تجارت الکترونیکی
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-3 justify-center p-2 items-center rounded-md bg-white h-60 w-60 shadow">
                    <div class="h-1/4">
                        <img class="w-16" src="/images/navak/mission02.png" alt="">
                    </div>
                    <div class="h-3/4">
                        <p>
                            مشاوره به کارفرمایان و شرکت­های طرف قرارداد برای الکترونیکی نمودن کسب وکارها و فرآیندهای تجاری
                            به منظور افزایش توان فروش و کیفیت خدمات پس از فروش
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-3 justify-center p-2 items-center rounded-md bg-white h-60 w-60 shadow">
                    <div class="h-1/4">
                        <img class="w-16" src="/images/navak/mission03.png" alt="">
                    </div>
                    <div class="h-3/4">
                        <p>
                            ارتقاء فضای اعتماد و اطمینان در بازار الکترونیکی در کشور از طریق ارائه خدمات با کیفیت و مطابق با
                            استانداردهای جهانی
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-3 justify-center p-2 items-center rounded-md bg-white h-60 w-60 shadow">
                    <div class="h-1/4">
                        <img class="w-16" src="/images/navak/mission04.png" alt="">
                    </div>
                    <div class="h-3/4">
                        <p>
                            مشارکت در رشد و گسترش فضای مجازی کشور از طریق تولید و به‌کارگیری آخرین دانش و دستاوردهای فنی و
                            تکنولوژیکی در حوزه تجارت الکترونیکی
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="flex flex-col-reverse justify-center md:flex-row items-center xl:container mx-auto px-5 leading-8">
        <div class="w-full md:w-2/3 flex flex-col gap-5 max-h-96">
            <h3 class="text-lg font-extrabold text-right text-brand-blue">
                زمینه‌های فعالیت
            </h3>
            <p>
                تجربه مفید در اجرای پروژه ­های مختلف، از یک طرف مگا را قادر به فعالیت در زمینه­ های تخصصی متنوعی ساخته و از
                طرف دیگر، ساختار مگا و همچنین استفاده از توان سهامداران و شرکت­های همکار امکان به­ خدمت­ گیری تخصص­های لازم
                برای اجرای انواع پروژه‌های فناوری اطلاعات را تسهیل نموده است.
            </p>
        </div>
        <div class="w-full md:w-1/3 flex flex-col gap-5 items-center justify-center">
            <img class="-mr-24" src="/images/navak/activities.png" alt="">
        </div>ّ
    </div>
    <div class="xl:container mx-auto my-10 w-full flex flex-col items-center text-center gap-3 leading-8">
        <h3 class="text-lg font-extrabold text-right text-brand-red">
            حوزه­ های اصلی که شرکت مگا به صورت تخصصی در آن فعال می ­باشد عبارتند از:
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-5 text-right">
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/mission01.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>تامین زیرساخت­ و ارائه سرویس‌های مبتنی بر وب در حوزه تجارت الکترونیکی</p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch02.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        فراهم نمودن خدمات DataCenter با امکانات Farm Server و پهنای باند نامحدود
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch03.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        ایجاد محیط‌های تعاملی با محوریت ارائه خدمات آنلاین
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch04.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        طراحی و تولید نرم ­افزارهای فروش با رویکرد مقابله با هجوم­ های لحظه ­ای
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch05.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        طراحی و پیاده ­سازی وب سایت­ و شبکه‌های اطلاع ­رسانی
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch06.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        طراحی، تولید و پیاده ­سازی سامانه‌های حوزه خدمات پرداخت و خدمات بانکی
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch07.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        طراحی و پیاده سازی شبکه مجازی توزیع کالا با حفظ و نگهداری شبکه فیزیکی موجود
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch08.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        طراحی و ایجاد پرتال ­های تخصصی در محیط‌های اینترنت و اینترانت
                    </p>
                </div>
            </div>
            <div class="flex gap-2 rounded-md border
            shadow">
                <div class="flex justify-center items-center w-1/5 bg-gray-100">
                    <img class="w-12" src="/images/navak/branch09.png" alt="">
                </div>
                <div class="w-4/5 p-1">
                    <p>
                        نظارت بر اجرای پروژه­ های فناوری اطلاعات در حوزه تجارت الکترونیکی
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
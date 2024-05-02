<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));

const handleScrollForm = ()=>{
    window.scrollTo({ top: '5rem', behavior: "smooth" })
}

const faqData = [
    {
        id: 1,
        icon: '/ICONS',
        details: `انجام تحلیل های موشکافانه و ارزیابی کامل بازار خودرو توسط ایرانی کار`
    },
    {
        id: 2,
        icon: '/ICONS',
        details: `در نظر گرفتن مشکلات فنی و آپشن ها جهت ارائه دقیق ترین قیمت خودرو`
    },
    {
        id: 3,
        icon: '/ICONS',
        details: `اعلام قیمت به سه شکل قیمت منصفانه، حداکثر قیمت و حداقل قیمت`
    },
    {
        id: 4,
        icon: '/ICONS',
        details: `قابل استفاده جهت قیمت گذاری خودرو شخصی در زمان فروش `
    }
]

</script>

<template>
    <div class=" mx-auto flex flex-col justify-center py-0 md:py-14 farsi-num ">
        <div class="mx-2 container self-center flex flex-col items-center justify-center leading-7 relative">

            <div class=" w-full h-full">
                <h2 class="text-lg md:text-2xl font-extrabold mx-auto mb-3 text-right">
                    تخمین قیمت خودرو توسط ایرانی کار
                </h2>
                <p class="text-justify">از آنجا که خودرو در بازار ایران یک کالای سرمایه ای محسوب می شود، ارزش گذاری
                    خودرو کارکرده امری بسیار مهم طلقی شده و عوامل بسیاری در تعیین قیمت منصفانه خودرو دخیل می باشد. جهت
                    محاسبه قیمت خودرو، عوامل بسیاری مانند هویت خودرو، کارکرد خودرو، سال تولید، وضعیت سلامت قطعات بدنه از
                    جهت رنگ و تعویض، وضعیت سلامت سیستم های فنی، آپشن های نصب شده بروی خودرو، شرایط بازار و حجم معاملات
                    انجام شده یک مدل خودرو خاص و ... در این محاسبه دخیل هستند.</p>
            </div>

            <div class="flex flex-col md:flex-row w-full h-auto justify-center align-center pb-10 md:py-10 ">
                <div class="w-full md:w-1/2 pt-5 md:pt-10">
                    <h2 class="text-lg md:text-2xl font-extrabold mx-auto mb-3 text-right">
                        چرا قیمت گذاری خودرو ایرانی کار
                    </h2>
                    <p class="text-justify">از آنجا که خودرو در بازار ایران یک کالای سرمایه ای محسوب می شود، ارزش گذاری
                        خودرو کارکرده امری بسیار مهم طلقی شده و عوامل بسیاری در تعیین قیمت منصفانه خودرو دخیل می باشد.
                        جهت محاسبه قیمت خودرو، عوامل بسیاری مانند هویت خودرو، کارکرد خودرو، سال تولید، وضعیت سلامت قطعات
                        بدنه از جهت رنگ و تعویض، وضعیت سلامت سیستم های فنی، آپشن های نصب شده بروی خودرو، شرایط بازار و
                        حجم معاملات انجام شده یک مدل خودرو خاص و ... در این محاسبه دخیل هستند.</p>
                    <button @click="handleScrollForm"
                        class="py-2 mt-3 md:mt-14 px-3 shadow inline-flex relative w-auto rounded-md text-white bg-brand-red">
                        <span class="flex flex-row items-center">
                            <span>تخمین قیمت خودروی من</span>
                            <nuxt-icon name="arrow-right" class="w-5 rotate-180 mr-6 text-gray-100" />
                        </span>
                    </button>
                </div>

                <div class="w-full md:w-1/2 rectangleShape">
                    <div class="md:mx-2 md:container self-center flex items-center justify-center">
                        <div class="grid grid-cols-2 gap-2 md:gap-4 mx-auto">
                            <div class="flex flex-col mt-0">
                                <div class="shadow-lg block p-2 md:p-3 rounded-md relative mt-5 w-40 h-40 sm:w-44 sm:h-44 bg-white">
                                    <div
                                        class="flex w-16 h-16 align-middle justify-center items-center mx-auto border rounded-full bg-gray-100 mb-3">
                                        <img class="w-12" src="/icons/carPriceEstimate/electric-vehicle.png" />
                                    </div>
                                    <p class="text-xs md:text-md font-semibold text-center leading-6">
                                        انجام تحلیل های موشکافانه و ارزیابی کامل بازار خودرو توسط ایرانی کار
                                    </p>
                                </div>

                                <div class="shadow-lg block p-2 md:p-3 rounded-md relative mt-2 md:mt-5 w-40 h-40 sm:w-44 sm:h-44 bg-white">
                                    <div
                                        class="flex w-16 h-16 align-middle justify-center items-center mx-auto border rounded-full bg-gray-100 mb-3">
                                        <img class="w-12" src="/icons/carPriceEstimate/new-dollar.png" />
                                    </div>
                                    <p class="text-xs md:text-md font-semibold text-center leading-6">
                                        اعلام قیمت به سه شکل قیمت منصفانه، حداکثر قیمت و حداقل قیمت
                                    </p>
                                </div>
                            </div>
                            <div class="flex flex-col md:mt-20">
                                <div class="shadow-lg block p-2 md:p-3 rounded-md relative mt-5 w-40 h-40 sm:w-44 sm:h-44 bg-white">
                                    <div
                                        class="flex w-16 h-16 align-middle justify-center items-center mx-auto border rounded-full bg-gray-100 mb-3">
                                        <img class="w-10" src="/icons/carPriceEstimate/search-car.png" />
                                    </div>
                                    <p class="text-xs md:text-md font-semibold text-center leading-6">
                                        در نظر گرفتن مشکلات فنی و آپشن ها جهت ارائه دقیق ترین قیمت خودرو
                                    </p>
                                </div>
                                <div class="shadow-lg block p-2 md:p-3 rounded-md relative mt-2 md:mt-5 w-40 h-40 sm:w-44 sm:h-44 bg-white">
                                    <div
                                        class="flex w-16 h-16 align-middle justify-center items-center mx-auto border rounded-full bg-gray-100 mb-3">
                                        <img class="w-12" src="/icons/carPriceEstimate/car-hand.png" />
                                    </div>
                                    <p class="text-xs md:text-md font-semibold text-center leading-6">
                                        قابل استفاده جهت قیمت گذاری خودرو شخصی در زمان فروش
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.rectangleShape::after {
    display: block;
    position: absolute;
    content: '';
    width: 800px;
    height: 400px;
    border-radius: 30px;
    background: -o-linear-gradient(169.49deg, #FAECF0 3.63%, rgba(250, 236, 240, 0) 85.77%);
    background: linear-gradient(280.51deg, #FAECF0 3.63%, rgba(250, 236, 240, 0) 85.77%);
    left: -15rem;
    top: 5rem;
    transform: rotate(40.26deg);
    -webkit-transform: rotate(40.26deg);
    -moz-transform: rotate(40.26deg);
    -ms-transform: rotate(40.26deg);
    -o-transform: rotate(40.26deg);
    z-index: -1;
}

@media screen and (max-width:768px) {
    .rectangleShape::after {
        left: -25rem;
    }
}

@media screen and (max-width:1024px) {
    .rectangleShape::after {
        left: -20rem;
    }
}
</style>

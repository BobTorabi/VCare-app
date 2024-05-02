<script setup>
    onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    const imageData = 
    {
        id: 1,
        imageDesktop: "/images/inspection/inspectionLevelsDesktop.png",
        imageMobile: "/images/inspection/inspectionLevelsMobile.png",
        title: "حضور کارشناسان باتجربه و قدیمی در تیم ایرانی کار",
    }

</script>

<template>
    <div class="flex flex-col justify-center py-8 md:py-14 xl:container mx-auto px-5 farsi-num">
    
        <h2 class="text-lg md:text-2xl font-extrabold mx-auto">
            مراحل کارشناسی خودرو ایرانی کار
        </h2>
        
        <div class="flex items-center justify-center">
            <div class="flex flex-row-reverse md:flex-col my-10">                    
                <img :src="imageData.imageDesktop" class="hidden md:block w-full h-auto self-center mx-auto" alt="card.title" />
                <img :src="imageData.imageMobile" class="block md:hidden w-1/2 sm:w-1/2 h-auto self-center mx-auto" alt="card.title" />

                <div class="grid grid-rows-4 md:grid-rows-1 md:mt-5 md:grid-cols-4 leading-6 lg:leading-7 w-1/2 md:w-full gap-3 md:gap-8 text-center text-xs md:text-sm font-semibold ">
                    <div class="mt-3 px-3 lg:pl-6 lg:pr-0 self-center">خودرو مورد نظر خود را بازدید کرده و درباره قیمت و شرایط معامله با فروشنده توافق کنید</div>
                    <div class="mt-3 px-3 lg:px-6 self-center">با ایرانی کار تماس بگیرید. کارشناس ما ظرف حداکثر 30 دقیقه در مکان حضور می یابد</div>
                    <div class="mt-3 px-3 lg:px-6 self-center">کارشناسی رنگ، بدنه و سیستم های فنی توسط تجهیرات دیجیتال انجام خواهد شد</div>
                    <div class="mt-3 px-3 lg:pr-6 lg:pl-0 self-center">در صورت تایید سلامت خودرو توسط کارشناس ایرانی کار، با خیال راحت خودرو را بخرید</div>
                </div>
            </div>
           
        </div>
    </div>
</template>


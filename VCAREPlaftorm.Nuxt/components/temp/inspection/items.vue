<script setup>
    onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));

const smallCardData = 
    {
        id: 1,
        imageDesktop: "/images/inspection/inspectioncCarDesktop.png",
        imageMobile: "/images/inspection/inspectioncCarMobile.png",
        title: "حضور کارشناسان باتجربه و قدیمی در تیم ایرانی کار",
    }

</script>

<template>
    <div class="flex flex-col justify-center bg-gradient-linear  py-8 md:py-14 px-5 lg:px-0 farsi-num">
    

        <h2 class="text-lg md:text-2xl font-extrabold mx-auto">
            موارد کارشناسی تخصصی فنی و بدنه خودرو
        </h2>
        <div class="container mx-auto flex items-center justify-center">
            <div class="  gap-5 my-10">
                <div class=" ">
                    
                    <img :src="smallCardData.imageDesktop" class="w-full hidden md:block h-auto self-center mx-auto " alt="card.title" />
                    <img :src="smallCardData.imageMobile" class="w-full block md:hidden h-auto self-center mx-auto " alt="card.title" />
                   
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .bg-gradient-linear{
        background:   linear-gradient(269.78deg, #EDEDED 5.85%, #F8F8F8 101.04%);
    }
    
</style>

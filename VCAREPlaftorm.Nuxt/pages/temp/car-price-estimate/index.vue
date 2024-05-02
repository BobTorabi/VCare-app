<script  setup>


// State:

</script>

<template>
    <div class="pb-16 w-full xl:container mx-auto px-5 md:py-0 mt-8">

        <Head>
            <Title>تخمین قیمت خودرو</Title>
            <Meta name="description" content="متا دیسکریپشن صفحه تخمین قیمت خودرو" />
        </Head>

        <!--  فرم تخمین قیمت خودرو  car price estimate Form -->
        <div class="block relative mt-10 z-10 mainFormBackground">
            <CarPriceEstimateForm />
        </div>

        <!-- سوالات متداول -->
        <carPriceEstimateFaq />

        <!-- سکشن توضیحات صفحه -->
        <CarPriceEstimateDescription />

        <!-- سکشن گریداطلاعات بیشتر -->
        <CarPriceEstimateMoreInfo />

    </div>
</template>

<style scoped>
.mainFormBackground {
    background-image: url('/images/carPriceEstimateBackground.webp');
    background-repeat: no-repeat;
    background-position: 50% center;
    background-size: contain;
    margin: auto 0;
}
</style>

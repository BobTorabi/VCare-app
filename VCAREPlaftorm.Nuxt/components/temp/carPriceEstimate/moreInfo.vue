<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));

const infoData = [
    {
        id: 1,
        icon: '/icons/carPriceEstimate/info-1.png',
        title: 'هویت خودرو',
        details: `
      قطعا در قدم اول باید هویت خودرو مشخص شود تا بدانیم چه خودرویی را مورد ارزیابی قرار می دهیم لذا باید در ابتدا برند، مدل، تیپ و سال تولید خودرو توسط کاربر مشخص شود.
    `
    },
    {
        id: 2,
        icon: '/icons/carPriceEstimate/info-2.png',
        title: 'کارکرد خودرو',
        details: `
      اگر دو خودرو با هویت یکسان کارکردهای متفاوتی داشته باشند و این تفاوت کارکرد چشمگیر باشد، قطعا قیمت خودرو با کارکرد کمتر (اصطلاحا کیلومتر کمتر) بالاتر خواهد بود.
    `
    },
    {
        id: 3,
        icon: '/icons/carPriceEstimate/info-3.png',
        title: `رنگ خودرو`,
        details: `
      در بازار ایران، خودروهای با رنگ سفید و مشکی بیشترین طرفدار را داشته و معمولا سایر رنگ ها طرفداران کمتری دارند. لذا خودروهایی با رنگ های خاص در شرایط مشابه قیمت کمتری دارند.
    `
    },
    {
        id: 4,
        icon: '/icons/carPriceEstimate/info-4.png',
        title: `سلامت بدنه`,
        details: `
      شرایط بدنه خودرو در بازار ایران اهمیت بسیار بالایی دارد. لذا وجود قطعات رنگ شده یا تعویضی در بدنه خودرو بسیار مهم است. همچنین باید وضعیت سلامت شاسی ها، سقف و ستونها به دقت بررسی شود.
    `
    },
    {
        id: 5,
        icon: '/icons/carPriceEstimate/info-5.png',
        title: `سلامت سیستم های فنی`,
        details: `
      هزینه تعمیر عیوب سیستم های فنی می تواند در قیمت خودرو بسیار اثرگذار باشد لذا ارزیابی سلامت موتور، گیربکس و سیستمهای جانبی فنی ... بسیار اهمیت دارد  
    `
    },
    {
        id: 6,
        icon: '/icons/carPriceEstimate/info-6.png',
        title: `آپشن های نصب شده`,
        details: `
      آپشن های نصب شده بروی خودرو بر ارزش خودرو تاثیر داشته و به قیمت آن می افزاید. این افزایش قیمت به ویژه در خودروهای ایرانی چشمگیر بوده و باید حتما لحاظ شود.
    `
    },
    {
        id: 7,
        icon: '/icons/carPriceEstimate/info-7.png',
        title: `سایر موارد`,
        details: `
      موارد دیگری مانند سلامت لاستیک ها، زمان اتمام بیمه ثالث، سلامت سپرها و ... نیز وجود دارد که می تواند بر قیمت خودرو اثرگذار باشد. لذا باید این موارد در فرم محاسبه قیمت مشخص شود.
    `
    },
    {
        id: 8,
        icon: '/icons/carPriceEstimate/electric-vehicle.png',
        title: `نوسانات بازار خودرو`,
        details: `
      علاوه بر تمام موارد فوق، باید نوسانات قیمت بازار در نظر گرفته شود تا بتوان یک محاسبه دقیق انجام داد. نرم افزار ایرانی کار با در اختیار داشتن یک دیتابیس کامل و به روز، نوسانات بازار خودرو را لحاظ کرده و دقیق ترین قیمت خودرو را اعلام می کند.
    `
    }
]

</script>

<template>
    <div class="mx-auto flex flex-col justify-center py-0 md:py-5 mb-10 md:mb-20 farsi-num">
        <h2 class="text-lg md:text-2xl font-extrabold mx-auto mb-10">
            عوامل موثر بر قیمت‌گذاری خودرو
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:md:grid-cols-4  container align-top self-center gap-3 lg:gap-4 justify-center leading-7">
            <div v-for="(info, index) in infoData" :key="index" class="flex flex-col space-y-2 text-right ">
                <div class="flex w-10 h-10 justify-end items-center rounded-md bg-red-50 p-1">
                    <img class="w-10" :src="info.icon" :alt="info.icon" />
                </div>
                <h3 class="text-md md:text-lg font-semibold">{{ info.title }}</h3>
                <p class="text-xs md:text-md text-justify ">{{ info.details }}</p>
            </div>
        </div>
    </div>
</template>

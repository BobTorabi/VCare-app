<script setup>
const props = defineProps({
    exception: Number
})
const services = [
    {
        id: 1,
        icon: "/images/navak/service01.png",
        title: "خرده فروشی",
        listItems: [
            "محاوره، فروش و تعامل مستقیم با بخش خرده فروشی کالا در سطح کشور",
            "محاوره، فروش و تعامل مستقیم با بخش خرده فروشی کالا در سطح کشور..."
        ],
        link: "/navak/retail"
    },
    {
        id: 2,
        icon: "/images/navak/service02.png",
        title: "عمده فروشی",
        listItems: [
            "پشتیبانی از کلیه فرآیندهای مرتبط با فروش عمده محصولات",
            "پایش مستمر حجم سفارشات عاملین",
            "واریز مستقیم و برخط وجوه به....",
        ],
        link: "/navak/wholesale"
    },
    {
        id: 3,
        icon: "/images/navak/service03.png",
        title: "شبکه مجازی نمایندگی ها",
        listItems: [
            "امکان ارتباط مستقیم با فروشگاه ها و خرده فروشان",
            "انتشار برخط فراخوان های واگذاری نمایندگی"
        ],
        link: "/navak/agents-network"
    },
    {
        id: 4,
        icon: "/images/navak/service04.png",
        title: "تک فروشی",
        listItems: [
            "امکان فروش مستقیم و بدون واسطه به مصرف کننده نهایی",
            "امکان ارائه خدمات جانبی و حضوری به مصرف کننده نهایی"
        ],
        link: "/navak/single-sell"
    },
    {
        id: 5,
        icon: "/images/navak/service05.png",
        title: "گارانتی الکترونیکی و رهگیری کالاها",
        listItems: [
            "کاهش هزینه های سربار و غیرضروری بخش گارانتی کالا",
            "تولید یک شناسنامه اختصاصی برای کالاهای تولیدی"
        ],
        link: "/navak/warranty"
    },
];

const otherServices =  services.filter((item) => item.id != props.exception)
</script>

<template>
    <div class="mx-auto flex flex-col py-5 justify-center lg:px-0 farsi-num">
        <h2 class="flex items-center gap-3 text-2xl font-extrabold text-brand-red">
            <img class="w-8 h-4" src="/images/navak/navak-arrow.png" alt="">
            سایر سرویس های ناوک
        </h2>
        <div class=" xl:container mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-4 gap-5 my-6">
            <div v-for="card in otherServices" :key="card.id">
                <NuxtLink :to="card.link">
                    <div class="flex flex-col gap-2 rounded-lg w-60 h-[335px]  bg-white px-2 py-3 shadow">
                        <img :src="card.icon" :alt="card.title" />
                        <h3 class="text-brand-red font-bold"> {{ card.title }} </h3>
                        <ul class="list-disc list-inside">
                            <li class="flex items-start gap-2 my-3" v-for="(item, index) in card.listItems" :key="index">
                                <NuxtIcon class="w-2" name="list-arrow" />
                                <span>
                                    {{ item }}
                                </span>
                            </li>
                        </ul>
                        <NuxtIcon class="w-3 self-end text-brand-red" name="navak-arrow-left" />
                    </div>
                    <div class="block  mx-auto text-center mt-2">
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup>
onMounted(() => window.scrollTo({ top: 0, behavior: "smooth" }));
const modalStatus = ref(false);

let brands = [
    { value: 'benz', name: 'بنز' },
    { value: 'pegeout', name: 'پژو' },
    { value: 'kia', name: 'کیا' },
    { value: 'sitroin', name: 'سیتروین' },
    { value: 'sitroin', name: 'سیتروین' },
]
let models = [
    { value: 'benz', name: 'بنز' },
    { value: 'pegeout', name: 'پژو' },
    { value: 'kia', name: 'کیا' },
    { value: 'sitroin', name: 'سیتروین' },
    { value: 'sitroin', name: 'سیتروین' },
]
let types = [
    { value: 'benz', name: 'بنز' },
    { value: 'pegeout', name: 'پژو' },
    { value: 'kia', name: 'کیا' },
    { value: 'sitroin', name: 'سیتروین' },
    { value: 'sitroin', name: 'سیتروین' },
]

const handleSubmit = () => {
    alert("handleSubmit")
}
</script>

<template>
    <div class="flex flex-col justify-center bg-gradient-linear  py-8 md:py-14 px-5 lg:px-0 farsi-num">
        <div class=" px-5 container">
            <div class="flex flex-col md:flex-row justify-center items-center gap-5">
                <div class="md:w-1/2 flex justify-center items-center max-h-96">
                    <img class="object-cover h-52 md:h-64 lg:h-96 -mt-20"
                        src="/images/inspection/inspectionPriceForm.png" alt="" />
                </div>
                <div class="w-full md:max-w-md flex flex-col space-y-10 md:space-y-20 text-center  md:text-right">
                    <h2 class="text-lg md:text-2xl font-extrabold">
                        <span class="text-brand-red">تعرفه کارشناسی خودرو</span>
                        <p class="text-xs mt-3 md:text-md font-extrabold">
                            برای مشاهده تعرفه ها روی تصویر ضربه بزنید
                        </p>
                    </h2>
                    <!-- temporary download pdf instead of inspection form -->
                    <!-- <div class="flex flex-col justify-betweem items-center h-full gap-2">
                        <div class="w-1/2">   
                            <a href="../../static/inspectionPrice.pdf" download="تعرفه کارشناسی.pdf" class="min-w-full lg:flex justify-center  bg-black text-white px-5 py-2 rounded-md"
                            >دانلود فایل PDF</a>
                        </div>
                    </div> -->

                    <!-- temporary MODAL -->
                    <div class="flex flex-col justify-betweem items-center h-full gap-2">
                        <div class="w-1/2">
                            <!-- <button 
                                class="min-w-full lg:flex justify-center  bg-black text-white px-5 py-2 rounded-md"
                                type="button"
                                @click="modalStatus = true"
                            >مشاهده لیست تعرفه ها</button> -->

                            <img @click="modalStatus = true"
                                src="/images/inspection/inspectionPriceList.jpg"
                                class="w-24 h-auto md:w-44 mx-auto border hover:border-red-300 rounded hover:cursor-pointer shadow-lg " />
                        </div>
                    </div>


                    <!-- <form name="inspectionPriceForm" onsubmit="handleSubmit">
                        <div class="flex flex-col gap-5"> -->
                    <!-- Brands -->
                    <!-- <div class=" ">
                                <label for="brands" class="font-semibold text-xs block w-full mb-1 text-right">برند خودرو</label>
                                <select id="brands" @change=""
                                    class="max-w-md w-full border rounded inline-flex py-2 px-6 outline-1 outline-offset-1 outline-red-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]">
                                    <option class="bg-gray-100" disabled selected>انتخاب کنید</option>
                                    <option v-for="(brand,i) of brands" :key="i" :value="brand.value">{{brand.name}}</option>
                                </select>
                            </div> -->

                    <!-- Models -->
                    <!-- <div class=" ">
                                <label for="models" class="font-semibold text-xs block w-full mb-1 text-right">مدل خودرو</label>
                                <select id="models" @change=""
                                    class="max-w-md w-full border rounded inline-flex py-2 px-6 outline-1 outline-offset-1 outline-red-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]">
                                    <option class="bg-gray-100" disabled selected>انتخاب کنید</option>
                                    <option v-for="(brand,i) of brands" :key="i" :value="brand.value">{{brand.name}}</option>
                                </select>
                            </div> -->

                    <!-- Types -->
                    <!-- <div class=" ">
                                <label for="types" class="font-semibold text-xs block w-full mb-1 text-right">تیپ خودرو</label>
                                <select id="types" @change=""
                                    class="max-w-md w-full border rounded inline-flex py-2 px-6 outline-1 outline-offset-1 outline-red-500 appearance-none bg-[url('/icons/chevron-down.svg')] bg-no-repeat bg-[position:10px]">
                                    <option class="bg-gray-100" disabled selected>انتخاب کنید</option>
                                    <option v-for="(brand,i) of brands" :key="i" :value="brand.value" placeholder="انتخاب کنید">
                                        {{brand.name}}
                                    </option>
                                </select>
                            </div> -->

                    <!-- <div class="flex flex-row justify-center items-center gap-2">
                                <div class="w-1/2">
                                    <button class="min-w-full lg:flex justify-center  bg-black text-white px-5 py-2 rounded-md">
                                            <span>تایید</span>
                                    </button>
                                </div>
                                <div class="w-1/2 flex justify-end">
                                    <span class="text-lg font-semibold text-green-600">980.000.000</span>
                                    <span class="text-xs self-center mr-1 font-semibold text-gray-900">تومان</span>
                                </div>
                            </div> -->
                    <!-- </div>
                    </form> -->
                </div>
            </div>
        </div>
        <SharedModalComponent v-if="modalStatus" @close="modalStatus = false" />
    </div>
</template>

<style scoped>
.bg-gradient-linear {
    background: linear-gradient(269.78deg, #EDEDED 5.85%, #F8F8F8 101.04%);
}
</style>


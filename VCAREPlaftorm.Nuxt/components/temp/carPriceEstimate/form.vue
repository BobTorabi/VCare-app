<script>

// State:
const step = ref(1);
// const state = reactive({
//     step: null,
// });

</script>
<template>
    <div id="estimateForm"
        class="flex flex-col justify-evently w-full mx-auto md:w-3/4 lg:w-1/2 h-96 max-h-full shadow-lg rounded-md p-3 bg-white">
        <p class="font-semibold text-sm md:text-lg text-gray-700">ماشینم چند می ارزه؟</p>

        <div class="flex flex-row grow justify-between">
            <SharedProgressBar :step="step" />





        </div>

        <!-- action buttons -->
        <div class="flex flex-col w-full md:flex-row justify-end items-center gap-2 bottom-0">
            <button type="button"
                class="flex justify-center items-center w-full md:w-40 bg-gray-50 hover:bg-gray-100 text-brand-red py-2 rounded-md">
                <span>مشاهده قیمت تا اینجا</span>
            </button>
            <button type="button"
                class="flex justify-center items-center w-full md:w-40 bg-brand-red hover:bg-brand-red/90 text-white lg:px-5 py-2 rounded-md">
                <span>تایید و ادامه</span>
            </button>
        </div>

    </div>
</template>

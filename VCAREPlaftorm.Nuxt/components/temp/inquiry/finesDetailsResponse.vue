<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  info: {
    type: Object,
    required: true,
  }
});

// Composables
const route = useRoute();
const { payFine, inquiryImage } = useInquiry();

// States
// find route for hide pay button in histoty
const hidePayButton = (route.path.match('/profile/my-inquiry')) ? true : false;
const loading = ref(false);
const imageModal = ref(false);
const image = ref();

// Logics
const pay = (amount, billId, paymentId) => {
  payFine(amount, billId, paymentId)
    .then((r) => {
      if (r.status == 500) {
        return;
      } else {
        window.open(r.data.redirectUrl, "_blank");
      }
    })
    .catch((err) => (errMessage.value = err.data.messages[0]))
    .finally((loading.value = false));
};

const ImageInquiry = (serialNo) => {
  loading.value = true;
  inquiryImage(props.info, serialNo)
    .then((r) => {
      if (r.status == 200) {
        image.value = r.data.vehicleImage;
        loading.value = false;
        imageModal.value = true;
      }
    })
    .catch((err) => (errMessage.value = err.data.messages[0]))
    .finally((loading.value = false));
};

const sortedWarningDTOs = props.data.warningDTOs.reverse();

</script>

<template>
  <div class="flex flex-col gap-4">
    <SharedImageModal v-if="imageModal" @close="imageModal = false" :image="image" />
    <div class="self-end">
      <button onclick="window.print()">
        <div class="p-2 rounded-sm border border-blue-500 bg-blue-100">
          <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17 5H3C1.34 5 0 6.34 0 8V12C0 13.1 0.9 14 2 14H4V16C4 17.1 4.9 18 6 18H14C15.1 18 16 17.1 16 16V14H18C19.1 14 20 13.1 20 12V8C20 6.34 18.66 5 17 5ZM13 16H7C6.45 16 6 15.55 6 15V11H14V15C14 15.55 13.55 16 13 16ZM17 9C16.45 9 16 8.55 16 8C16 7.45 16.45 7 17 7C17.55 7 18 7.45 18 8C18 8.55 17.55 9 17 9ZM15 0H5C4.45 0 4 0.45 4 1V3C4 3.55 4.45 4 5 4H15C15.55 4 16 3.55 16 3V1C16 0.45 15.55 0 15 0Z"
              fill="#2766C5" />
          </svg>
        </div>
      </button>
    </div>
    <div
      class="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between farsi-num border py-3 border-blue-500 rounded-md px-4">
      <div class="flex justify-between gap-2 md:gap-10 items-center">
        <p class="flex flex-col md:flex-row items-center gap-1">
          <span class="font-semibold text-brand-blue"> مجموع مبلغ خلافی : </span>
          <span class="font-semibold text-brand-red md:text-lg">
            {{ $seperator(data.totalPrice) }}
            <span class="text-sm text-black font-normal">ریال</span>
          </span>
        </p>
        <p class="flex flex-col md:flex-row items-center gap-1">
          <span class="font-semibold text-brand-blue whitespace-nowrap">
            تعداد تخلفات :
          </span>
          <span class="font-semibold text-brand-red md:text-lg whitespace-nowrap">
            {{ data.warningDTOs.length }}
            <span class="text-sm text-black font-normal">عدد</span>
          </span>
        </p>
      </div>
      <button v-if="!hidePayButton && data.totalPrice !== '0'" @click="pay(data.totalPrice, data.totalPaperId, data.totalPaymentId)"
        class="w-full md:w-fit bg-brand-blue-light print:hidden whitespace-nowrap text-white rounded-md py-3 px-2 md:px-12">
        پرداخت یکجا
      </button>
    </div>
    <div class="flex flex-col" v-for="(item, index) in sortedWarningDTOs" :key="index">
      <div
        class="flex md:flex-col md:items-center farsi-num border bg-white border-blue-500 rounded-md overflow-x-auto">
        <div class="flex flex-col shrink-0 justify-between md:flex-row md:w-full bg-blue-200 p-3 font-semibold">
          <p class="h-1/6 md:w-12 md:text-center">مبلغ</p>
          <p class="h-2/6 md:w-2/4 md:text-center">شرح تخلف</p>
          <p class="h-1/6 md:w-1/4 md:text-center">تحویل</p>
          <p class="h-1/6 md:w-2/4 md:text-center">محل تخلف</p>
          <p class="h-1/6 md:w-1/4 md:text-center">شناسه قبض</p>
          <p class="h-1/6 md:w-1/4 md:text-center">تاریخ و ساعت</p>
          <p v-if="item.hasImage === '1'" class="h-1/6 md:w-1/4 md:text-center">
            تصویر
          </p>
        </div>
        <div class="flex flex-col justify-between md:flex-row gap-2 md:w-full px-3 pt-4 pb-6 md:pb-8">
          <p class="h-1/6 md:w-12 flex gap-3 md:gap-0 md:flex-col items-center md:text-center">
            <span class="text-brand-red underline">
              {{ $seperator(item.finalPrice) }}
            </span>
            <span class="text-xs"> ریال </span>
          </p>
          <p class="h-2/6 md:w-2/4 md:text-start">{{ item.violationType }}</p>
          <p class="h-1/6 md:w-1/4 md:text-center">
            {{ item.violationDeliveryType }}
          </p>
          <p class="h-1/6 md:w-2/4 md:text-center">
            {{ item.violatoinAddress }}
          </p>
          <p class="h-1/6 md:w-1/4 md:text-center">{{ item.paperId }}</p>
          <p class="h-1/6 md:w-1/4 md:text-center">
            {{ item.violationOccureDate }}
          </p>
          <!-- <p v-if="item.hasImage === '1'" class="h-1/6 md:w-12 md:text-center">
                        {{ item.violationDeliveryType }}
                    </p> -->
          <div v-if="item.hasImage === '1'" class="flex items-center flex-col self-start md:self-start h-1/6 md:w-1/4 ">
            <button @click="ImageInquiry(item.serialNo)"
              class="flex items-center gap-2 border border-blue-500 rounded-md p-1 shadow-md">
              <img src="/images/imageIcon.png" class="w-5 h-5" alt="image icon" />
              <!-- <SharedLoading v-if="loading" /> -->
            </button>
          </div>
        </div>
      </div>
      <button v-if="!hidePayButton && data.totalPrice !== '0'" @click="pay(item.finalPrice, item.paperId, item.paymentId)"
        class="flex bg-brand-blue-light self-end text-white rounded-md py-3 px-12 -mt-6 ml-4 print:hidden">
        پرداخت
      </button>
    </div>
  </div>
</template>
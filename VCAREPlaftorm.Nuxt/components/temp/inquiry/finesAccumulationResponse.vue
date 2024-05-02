<script setup>
const { payFine } = useInquiry();

// find route for hide pay button in histoty
const route = useRoute();
const hidePayButton = (route.path.match('/profile/my-inquiry')) ? true : false;

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
});

// State
const loading = ref(false)

// Logic
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

</script>

<template>
  <div class="flex flex-col gap-4">
    <div
      class="flex flex-col gap-4 md:gap-0 md:flex-row md:justify-between farsi-num border py-3 border-blue-500 rounded-md px-4">
      <div class="flex justify-between gap-2 md:gap-10 items-center">
        <p class="flex flex-col md:flex-row items-center gap-1">
          <span class="font-semibold text-brand-blue"> مجموع مبلغ خلافی : </span>
          <span class="font-semibold text-brand-red text-xs md:text-md">
            {{ $seperator(data.warningPrice) }}
            <span class="text-sm text-black font-normal">ریال</span>
          </span>
        </p>
        <p class="flex flex-col md:flex-row items-center gap-1">
          <span class="font-semibold text-brand-blue whitespace-nowrap">
            شماره پلاک :
          </span>
          <span class="font-semibold text-brand-red text-xs md:text-md ">
            {{ data.plateChar }}

          </span>
        </p>
      </div>
      <button v-if="!hidePayButton && data.warningPrice !== '0'"
        @click="pay(data.warningPrice, data.paperId, data.paymentId)"
        class="w-full md:w-fit bg-brand-blue-light text-white rounded-md py-3 px-2 md:px-12">
        پرداخت
      </button>
    </div>
  </div>
</template>
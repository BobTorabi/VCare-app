<script setup>
definePageMeta({
  layout: "inner",
});
</script>
<template>
  <div class="pb-[140px]">

    <Head>
      <Title>Message Details</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <div class="bg-white rounded-custom-10 mb-3 mx-3 px-4 pb-3 text-[17px]">
      <div class="font-bold flex justify-between items-center pt-3 pb-1 leading-7 mb-3">
        <div class="flex">
          <img src="~/assets/images/info-photo.png" class="mr-3" alt="" />
          <div>
            <p>
              Info
            </p>
            <p class="font-normal">
              About Headaches
            </p>
          </div>
        </div>
        <div class="font-normal">
          <NuxtIcon name="alert-circle-orange" filled="" class="ml-1 rounded-full w-8 h-8" />
        </div>
      </div>
      <p class="font-normal leading-7">
        filler text that is placed in a document
        or visual presentation. Lorem ipsum is
        derived from the Latin "dolorem ipsum"
        roughly translated as "pain itself.
      </p>
      <img src="~/assets/images/info-photo-2.png" class="mx-auto my-3" alt="" />
      <div class="flex leading-8 mt-4">
        <NuxtIcon name="calendar" filled="" class="mr-2 w-5" />
        <div>
          August 28th
        </div>
        <NuxtIcon name="time" filled="" class="ml-5 mr-2 w-5" />
        <div>
          20:30 AM
        </div>
      </div>
    </div>

    <div class="bg-white rounded-custom-10 mx-3 mb-3 px-4 pb-3 text-[17px]">
      <div class="font-bold flex justify-between items-center pt-3 pb-1 leading-7 mb-3">
        <div class="flex">
          <img src="~/assets/images/info-photo.png" class="mr-3" alt="" />
          <div>
            <p>
              Info
            </p>
            <p class="font-normal">
              About Headaches
            </p>
          </div>
        </div>
        <div class="font-normal">
          <NuxtIcon name="alert-circle-orange" filled="" class="ml-1 rounded-full w-8 h-8" />
        </div>
      </div>
      <p class="font-normal leading-7">
        filler text that is placed in a document
        or visual presentation. Lorem ipsum
      </p>
      <div class="flex leading-8 mt-4">
        <NuxtIcon name="calendar" filled="" class="mr-2 w-5" />
        <div>
          August 28th
        </div>
        <NuxtIcon name="time" filled="" class="ml-5 mr-2 w-5" />
        <div>
          20:30 AM
        </div>
      </div>
    </div>

  </div>
</template>

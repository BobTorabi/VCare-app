<template>
  <div class="pb-[140px]">

    <Head>
      <Title>Home</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <div class="text-center text-color-green">
      <p><b>16</b> Aug</p>
      <p>Tuesday , <b>11:30 AM</b></p>
      <img src="~/assets/images/tree.png" class="mx-auto -mt-14" alt="" />
    </div>

    <div class="text-[17px] text-black rounded-custom-10 mx-3 mt-4">
      <div class="flex justify-between py-3 leading-7 bg-color-com text-white rounded-custom-10 px-2">
        <p class="flex">
          <NuxtIcon name="alert-circle" filled="" class="mr-2" />
          Alert : Stay on call
        </p>
      </div>
    </div>

    <div class="font-bold text-[17px] text-black rounded-custom-10 mx-3 mt-4">
      <div class="flex justify-between py-3 leading-7 bg-color-pri text-white rounded-custom-10 px-2">
        <p class="flex">
          <NuxtIcon name="sunny-outline" filled="" class="mr-2" />
          09:00 AM
        </p>
        <p class="font-normal flex">
          6/10
          <NuxtIcon name="check-mark" filled="" class="ml-2 bg-color-yellow rounded-full w-8 h-8" />
        </p>
      </div>
    </div>

    <div
      class="shadow-md bg-white text-color-green rounded-custom-10 mx-3 px-5 py-7 mt-4 bg-[url('~/assets/images/article.png')] bg-no-repeat bg-right">
      <p class="text-xl font-bold">Today's Article</p>
      <p class="text-base">What is Breast cancer?</p>
    </div>
  </div>
</template>

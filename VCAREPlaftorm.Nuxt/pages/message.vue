<script setup>
definePageMeta({
  layout: "inner",
  middleware: "logged-in",
});
</script>
<template>
  <div class="pb-[140px]">

    <Head>
      <Title>Message</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>

    <div
      class="text-[17px] bg-[#FFFAF5] rounded-custom-10 flex justify-center items-center py-3 leading-7 px-4 mx-3 mb-3">
      <NuxtLink to="/message">
        <NuxtIcon name="caret-right" filled="" class="ml-1 rounded-full w-8 h-8" />
      </NuxtLink>
      <p class="flex">
        <NuxtIcon name="calendar" filled="" class="mx-2" />
        July
      </p>
      <NuxtLink to="/message">
        <NuxtIcon name="caret-left" filled="" class="ml-1 rounded-full w-8 h-8" />
      </NuxtLink>
    </div>

    <div
      class="text-[17px] bg-[#FFFAF5] rounded-custom-10 flex justify-center items-center py-3 leading-7 px-4 mx-3 mb-3">
      <NuxtLink to="/message">
        <NuxtIcon name="caret-right" filled="" class="ml-1 rounded-full w-8 h-8" />
      </NuxtLink>
      <p class="flex">
        <NuxtIcon name="calendar" filled="" class="mx-2" />
        Week <span class="font-bold mx-2">1</span>
      </p>
      <NuxtLink to="/message">
        <NuxtIcon name="caret-left" filled="" class="ml-1 rounded-full w-8 h-8" />
      </NuxtLink>
    </div>

    <div
      class="font-bold text-[17px] text-white bg-color-aux rounded-custom-10 flex justify-between items-center py-3 leading-7 px-4 mx-3 mb-3">
      <div class="flex">
        <NuxtIcon name="build" filled="" class="mr-3 bg-color-body rounded-full w-16 h-16" />
        <div>
          <p>
            Alert
          </p>
          <p class="font-normal">
            Stay on call
          </p>
        </div>
      </div>
      <div class="flex font-normal">
        <div class="bg-color-com text-white border-2 w-7 h-7 text-center rounded-full mx-1 mt-0.5 leading-5">
          2
        </div>
        <NuxtIcon name="alert-circle" filled="" class="ml-1 rounded-full w-8 h-8" />
      </div>
    </div>

    <div
      class="font-bold text-[17px] bg-white rounded-custom-10 flex justify-between items-center py-3 leading-7 px-4 mx-3 mb-3">
      <div class="flex">
        <NuxtIcon name="build" filled="" class="mr-3 bg-color-body rounded-full w-16 h-16" />
        <div>
          <p>
            Alert
          </p>
          <p class="font-normal">
            Touch to call 911
          </p>
        </div>
      </div>
      <div class="font-normal">
        <NuxtIcon name="warning" filled="" class="ml-1 rounded-full w-8 h-8" />
      </div>
    </div>

    <div
      class="font-bold text-[17px] bg-white rounded-custom-10 flex justify-between items-center py-3 leading-7 px-4 mx-3 mb-3">
      <div class="flex">
        <NuxtIcon name="build" filled="" class="mr-3 bg-color-body rounded-full w-16 h-16" />
        <div>
          <p>
            Alert
          </p>
          <p class="font-normal">
            Increase a pill
          </p>
        </div>
      </div>
      <div class="font-normal">
        <NuxtIcon name="alert-circle-orange" filled="" class="ml-1 rounded-full w-8 h-8" />
      </div>
    </div>

    <NuxtLink to="/message-info">
      <div
        class="font-bold text-[17px] bg-white rounded-custom-10 flex justify-between items-center py-3 leading-7 px-4 mx-3 mb-3">
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
          <NuxtIcon name="mail" filled="" class="ml-1 rounded-full w-8 h-8" />
        </div>
      </div>
    </NuxtLink>

  </div>
</template>

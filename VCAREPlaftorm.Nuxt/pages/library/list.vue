<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getAllArticle } = useLibrary();
const route = useRoute();
const config = useRuntimeConfig();

// States
const loading = ref(true);
const errMessage = ref();
const posts = ref();

// Logics
getAllArticle(route.query.id)
  .then(async (r) => {
    if (r.status === 200) {
      errMessage.value = null;
      posts.value = await r.data.records;
    } else if (r.status == 500) {
      errMessage.value = r.messages[0];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

const shorten = (str, n) => {
  return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
};

</script>

<template>
  <div class="pb-[90px]">

    <Head>
      <Title>Library List</Title>
      <!-- <Meta name="description" content="keyboard 1 , keyboard 2" /> -->
    </Head>
    <SharedLoading v-if="loading" />
    <div v-if="!loading" class="text-[17px]">
      <div class="mx-3 relative">
        <input type="text" class="rounded-custom-10 py-3 px-4 w-full" placeholder="You can search here" />
        <button class="absolute right-0 top-3">
          <NuxtIcon name="search" filled="" class="mr-5 ml-3" />
        </button>
      </div>

      <NuxtLink to="/"
        class="flex font-bold text-base shadow-sm bg-white py-3 px-2 rounded-custom-10 leading-5 mt-4 mx-3 text-color-pri">
        <NuxtIcon name="call" filled="" class="mr-5 ml-3" />
        Contact us if you can't find what your'e looking for
      </NuxtLink>

      <div v-if="posts" class="grid grid-cols-2 gap-0">

        <template v-for="(post, index) in posts" :key="index">
          <NuxtLink :to="'/library/details?id=' + post.id"
            class="shadow-sm bg-white py-2 px-2 rounded-custom-10 leading-5 mt-4 mx-3">
            <img :src="config.SERVER_IMAGE_URL + post.imageUrl" class="m-auto rounded-custom-10" alt="" />
            <h1 class="font-medium text-base mt-2">
              {{ post.title }}
            </h1>
            <p class="text-sm mt-1">
              {{ shorten(post.body, 10) + " ..." }}
            </p>
            <div to="/" class="text-color-pri text-sm mt-2 block">
              Read more
            </div>
          </NuxtLink>
        </template>

        <!-- <NuxtLink to="/library/details" class="shadow-sm bg-white py-2 px-2 rounded-custom-10 leading-5 mt-4 mx-3">
          <img src="~/assets/images/library-2.png" class="m-auto rounded-custom-10" alt="" />
          <h1 class="font-medium text-base mt-2">What is cancer?</h1>
          <p class="text-sm mt-1">There are types of...</p>
          <div to="/" class="text-color-pri text-sm mt-2 block">
            Read more
          </div>
        </NuxtLink>

        <NuxtLink to="/library/details" class="shadow-sm bg-white py-2 px-2 rounded-custom-10 leading-5 mt-4 mx-3">
          <img src="~/assets/images/library-3.png" class="m-auto rounded-custom-10" alt="" />
          <h1 class="font-medium text-base mt-2">What is cancer?</h1>
          <p class="text-sm mt-1">There are types of...</p>
          <div to="/" class="text-color-pri text-sm mt-2 block">
            Read more
          </div>
        </NuxtLink>

        <NuxtLink to="/library/details" class="shadow-sm bg-white py-2 px-2 rounded-custom-10 leading-5 mt-4 mx-3">
          <img src="~/assets/images/library-1.png" class="m-auto rounded-custom-10" alt="" />
          <h1 class="font-medium text-base mt-2">What is cancer?</h1>
          <p class="text-sm mt-1">There are types of...</p>
          <div to="/" class="text-color-pri text-sm mt-2 block">
            Read more
          </div>
        </NuxtLink> -->
      </div>

    </div>
  </div>
</template>

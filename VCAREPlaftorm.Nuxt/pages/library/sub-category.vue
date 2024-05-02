<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getAllSubCategory } = useLibrary();
const route = useRoute()

// States
const loading = ref(true);
const errMessage = ref();
const posts = ref();

// Logics
getAllSubCategory(route.query.id)
  .then(async (r) => {
    if (r.status === 200) {
      errMessage.value = null;
      posts.value = await r.data;
    } else if (r.status == 500) {
      errMessage.value = r.messages[0];
    }
  })
  .catch((err) => (errMessage.value = err.data))
  .finally(() => loading.value = false);

</script>
<template>
  <div class="pb-[90px]">

    <Head>
      <Title>Library</Title>
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

      <div v-if="posts">
        <div v-for="(post, index) in posts" :key="index" class="main-category">
          <NuxtLink :to="'/library/list?id=' + post.id"
            class="flex py-4 min-h-[96px] items-center font-bold bg-color-sec text-white rounded-custom-10 px-2 mx-3 mt-4">
            <NuxtIcon name="Library2" filled="" class="mr-5 ml-3" />
            {{ post.title }}
          </NuxtLink>
        </div>
      </div>

      <!-- <NuxtLink to="/library-list"
        class="flex py-4 min-h-[96px] items-center font-bold bg-color-sec text-white rounded-custom-10 px-2 mx-3 mt-4">
        <NuxtIcon name="Library1" filled="" class="mr-5 ml-3" />
        Essential to know
      </NuxtLink>

      <NuxtLink to="/library-list"
        class="flex py-4 min-h-[96px] items-center font-bold bg-color-pri text-white rounded-custom-10 px-2 mx-3 mt-4">
        <NuxtIcon name="Library2" filled="" class="mr-5 ml-3" />
        Disease & Treatment
      </NuxtLink>

      <NuxtLink to="/library-list"
        class="flex py-4 min-h-[96px] items-center font-bold bg-color-aux text-white rounded-custom-10 px-2 mx-3 mt-4">
        <NuxtIcon name="Library3" filled="" class="mr-5 ml-3" />
        Cope with cancer
      </NuxtLink>

      <NuxtLink to="/library-list"
        class="flex py-4 min-h-[96px] items-center font-bold bg-color-com text-white rounded-custom-10 px-2 mx-3 mt-4">
        <NuxtIcon name="Library4" filled="" class="mr-5 ml-3" />
        Possible complications & problems
      </NuxtLink> -->
    </div>
  </div>
</template>

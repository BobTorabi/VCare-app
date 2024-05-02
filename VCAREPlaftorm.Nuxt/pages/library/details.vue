<script setup>
definePageMeta({
  layout: "inner",
});

// Composables
const { getArticleById } = useLibrary();
const route = useRoute();
const config = useRuntimeConfig();

// States
const loading = ref(true);
const errMessage = ref();
const posts = ref();

// Logics
getArticleById(route.query.id)
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
      <Title>Library Details</Title>
    </Head>
    <SharedLoading v-if="loading" />
    <div v-if="!loading" class="text-[17px]">

      <div v-if="posts" class="shadow-sm bg-white py-4 px-4 rounded-lg leading-5 mx-3">
        <img :src="config.SERVER_IMAGE_URL + posts.imageUrl" class="m-auto w-full rounded-custom-10" alt="" />
        <h1 class="font-bold text-xl mt-2">
          {{ posts.title }}
        </h1>
        <!-- <div class="text-lg mt-1">
          {{ posts.body }}
        </div> -->
        <div class="text-lg mt-1 article" v-html="posts.body"></div>
      </div>

    </div>
  </div>
</template>
<style>
.article h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: bold;
  margin: 10px 0 5px;
}
</style>
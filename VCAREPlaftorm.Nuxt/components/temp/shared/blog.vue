<script setup>
// Composables
const { getLastNews } = useBlog();

// States
const errMessage = ref();
const posts = ref();

// Logics
getLastNews()
  .then((r) => {
    posts.value = r.Data;
  })
  .catch((err) => (errMessage.value = err.data.messages[0]));

const shorten = (str, n) => {
  return (str.match(RegExp(".{" + n + "}\\S*")) || [str])[0];
};
</script>

<template>
  <div
    v-if="posts"
    class="flex flex-col space-y-6 py-10 items-center xl:container mx-auto px-5"
  >
    <h4 class="font-semibold text-2xl mb-3 text-brand-red">
      با وبلاگ ایرانی‌کار در مسیر بمانید!
    </h4>
    <div
      class="grid grid-cols-1 overflow-x-scroll md:grid-cols-2 lg:grid-cols-5 gap-3"
    >
      <NuxtLink
        :to="post.Id"
        target="_blank"
        v-for="(post, index) in posts"
        :key="index"
        class="flex items-start md:flex-col md:space-y-2 border shadow-md rounded-md farsi-num"
      >
        <img
          class="w-32 h-24 md:w-full md:h-44 object-cover object-center md:rounded-t-md rounded-r-md"
          :src="post.ImageUrl"
          alt=""
        />
        <div
          class="w-full h-full flex flex-col-reverse justify-between md:flex-col space-y-2 p-1 md:p-3"
        >
          <p class="self-end text-xs">{{ post.JalaliPublishDate }}</p>
          <h5 class="font-semibold md:text-lg">{{ post.Title }}</h5>
          <p class="leading-8 text-justify hidden md:block">
            {{ shorten(post.Description, 100) + " ..." }}
          </p>
        </div>
      </NuxtLink>
    </div>
    <NuxtLink to="https://iranecar.com/blog" class="text-sm md:text-lg mt-3 underline text-gray-900">ورود به وبلاگ ایرانی کار</NuxtLink>
  </div>
</template>

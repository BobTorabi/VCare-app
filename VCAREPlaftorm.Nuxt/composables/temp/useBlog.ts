export const useBlog = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // Get last News from blog
  const getLastNews = async () => {
    const data = await $fetch(`/news/lastNews`, {
      baseURL: config.SERVER_BLOG_URL,
      method: "GET",
    });
    return data;
  };

  return {
    getLastNews,
  };
};

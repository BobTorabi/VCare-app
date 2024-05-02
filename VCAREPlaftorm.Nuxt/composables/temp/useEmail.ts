export const useEmail = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // fetch/subscribe user email for newsletter
  const subscribeNewsletter = async (form:any) => {
    const data = await $fetch(`/Email/Add`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        emailAddress: form.email,
        clientId: 2 // iranecar user is 2
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  return {
    subscribeNewsletter,
  };
};

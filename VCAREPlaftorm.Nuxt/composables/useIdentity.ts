export const useIdentity = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // login
  const loginForm = async (form:any) => {
    const data = await $fetch(`/account/login`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: { email: form.email , password: form.password },
      headers: Authorization.value,
    });
    return data;
  };

  // get user profile info
  const getUserDetailsById = async (id:any) => {
    const data = await $fetch(`/user/getUserDetailsById?id=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  };

  return {
    loginForm, getUserDetailsById
  };
};

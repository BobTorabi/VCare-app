export const useComplaint = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // fetch/subscribe user email for newsletter
  const registerComplaint = async (form:any) => {
    const data = await $fetch(`/Complaint/Add`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        fullName : form.fullName,
        phoneNumber : form.phoneNumber,
        email : form.email,
        title : form.title,
        description : form.description,
        clientId : 0 // TODO: i dont know whats this
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  return {
    registerComplaint,
  };
};

export const useQuestions = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // 
  const GetSymptomsAndQuestions = async () => {
    const data = await $fetch(`/Reports/api/GetSymptomsAndQuestions`, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "GET",
    });
    return data;
  };
  
  return {
    GetSymptomsAndQuestions
  };
};

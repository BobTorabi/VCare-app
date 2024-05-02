export const useReport = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // Get all body part
  const getAllBodyPart = async () => {
    const data = await $fetch(`/medical/getAllBodyPart`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  // Get organ
  const getAllOrgan = async (id : any) => {
    const data = await $fetch(`/medical/getAllOrgan?bodyPartId=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  // Get organ
  const getAllOrganSymptom = async (id : any) => {
    const data = await $fetch(`/medical/getAllOrganSymptom?organId=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  // add User Report
  const addUserReport = async (selectedSymptoms:any) => {
    const data = await $fetch(`/medical/addUserReport`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: selectedSymptoms,
      headers: Authorization.value,
    });
    return data;
  };

  // Get organ
  const getTodayUserReport = async () => {
    const data = await $fetch(`/medical/getTodayUserReport`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  };

  // set report is done
  const setIsDoneReport = async () => {
    const data = await $fetch(`/medical/setIsDoneReport`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      headers: Authorization.value,
    });
    return data;
  };

  // Get All User Report
  const getAllUserReportByFilter = async () => {
    const data = await $fetch(`/medical/getAllUserReportByFilter`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  };

  // Get All User Report
  const getUserReporByGeneratedReportCode = async (id: any) => {
    const data = await $fetch(`/medical/getUserReporByGeneratedReportCode?generatedReportCode=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  };
  
  return {
    getAllBodyPart, 
    getAllOrgan, 
    getAllOrganSymptom, 
    addUserReport, 
    getTodayUserReport, 
    setIsDoneReport, 
    getAllUserReportByFilter,
    getUserReporByGeneratedReportCode
  };
};

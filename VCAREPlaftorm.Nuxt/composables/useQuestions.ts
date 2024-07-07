export const useQuestions = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // Get Symptoms And Questions
  const GetSymptomsAndQuestions = async () => {
    const data = await $fetch(`/Reports/api/GetSymptomsAndQuestions`, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "GET",
    });
    return data;
  };

  // Get Body Parts For Main Symptom
  const GetBodyPartsForMainSymptom = async (id:any) => {
    const data = await $fetch(`/Reports/api/GetBodyPartsForMainSymptom/` + id, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "GET",
    });
    return data;
  };

  // Get Symptom Sub Group For Main Symptom
  const GetSymptomSubgroupForMainSymptom = async (id:any) => {
    const data = await $fetch(`/Reports/api/GetSymptomSubgroupForMainSymptom/` + id, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "GET",
    });
    return data;
  };

  // Get Questions For Direct Questions
  const GetQuestionsForDirectQuestions = async (id:any) => {
    const data = await $fetch(`/Reports/api/GetQuestionsForDirectQuestions/` + id, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "GET",
    });
    return data;
  };

  // Get Questions For Body Part
  const GetQuestionsForBodyParts = async (form:any) => {
    const data = await $fetch(`/Reports/api/GetQuestionsForBodyParts`, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "POST",
      body: form
    });
    return data;
  };

  // Get Questions For Symptom Subgroup
  const GetQuestionsForSymptomSubGroups = async (form:any) => {
    const data = await $fetch(`/Reports/api/GetQuestionsForSymptomSubGroups/`, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "POST",
      body: form
    });
    return data;
  };

  // Send User Report
  const SendUserReport = async (form:any) => {
    const data = await $fetch(`/Reports/api/SubmitOrUpdateUserReport/`, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "POST",
      body: form
    });
    return data;
  };

  // Get User Reports
  const GetUserReports = async (userId:any ,startDate:any , endDate:any) => {
    const data = await $fetch(`/Reports/api/GetUserReports?userId=` + userId + `&from=` + startDate + `&to=`+ endDate, {
      baseURL: config.SERVER_REPORTS_URL,
      method: "GET"
    });
    return data;
  };

  return {
    GetSymptomsAndQuestions,
    GetBodyPartsForMainSymptom,
    GetSymptomSubgroupForMainSymptom,
    GetQuestionsForDirectQuestions,
    GetQuestionsForBodyParts,
    GetQuestionsForSymptomSubGroups,
    SendUserReport,
    GetUserReports
  };
};

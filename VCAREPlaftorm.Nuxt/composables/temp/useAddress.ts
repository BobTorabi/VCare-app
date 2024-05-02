export const useAddress = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // Get all provinces
  const getProvinceList = async () => {
    const data = await $fetch(`/Location/GetProvinceList`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  // Get all cities by province Id
  const getProvinceCities = async (id) => {
    const data = await $fetch(`/Location/GetProvinceCities?provinceId=${id}`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  return {
    getProvinceList,
    getProvinceCities
  };
};

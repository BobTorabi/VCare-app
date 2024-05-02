export const useLibrary = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // get All Main Category of library
  const getAllMainCategory = async () => {
    const data = await $fetch(`/library/getAllMainCategory`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  // get All Sub Category of library
  const getAllSubCategory = async (id:any) => {
    const data = await $fetch(`/library/getAllSubCategory?mainCategoryId=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
    });
    return data;
  };

  // get All Article of library
  const getAllArticle = async (id:any) => {
    const data = await $fetch(`/library/getAllArticle?subCategoryId=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  }; 

  // get get Article By Id of library
  const getArticleById = async (id:any) => {
    const data = await $fetch(`/library/getArticleById?id=` + id, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  };   

  // get Last Article of library
  const getLastArticle = async () => {
    const data = await $fetch(`/library/getAllArticle?pageNumber=1&pageSize=1`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: Authorization.value,
    });
    return data;
  }; 

  return {
    getAllMainCategory, getAllSubCategory, getAllArticle, getArticleById, getLastArticle
  };
};

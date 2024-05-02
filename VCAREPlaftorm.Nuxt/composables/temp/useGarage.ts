export const useGarage = () => {
  const config = useRuntimeConfig()
  const { authToken } = useAuth()
  const Authorization = ref({
    Authorization: 'Bearer ' + authToken.value,
    'Content-Type': 'application/json',
  })

  // Get All user cars
  const getAllUserCars = async () => {
    const data = await $fetch(`/Garage/GetAllUsersCars`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'GET',
      headers: Authorization.value,
    })
    return data
  }

  // Get car group with models
  const getCarGroupWithModels = async () => {
    const data = await $fetch(`/Garage/CarGroupWithModels`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'GET',
    })
    return data
  }

  // modify a park car
  const modifyUserCar = async (form:any) => {
    const data = await $fetch(`/Garage/ModifyUserCar`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        id: form.id,
        carGroupId: form.carGroupId,
        carGroupTitle: form.carGroupTitle,
        carModelId: form.carModelId,
        carModelTitle: form.carModelTitle,
        userFirstName: form.userFirstName,
        userLastName: form.userLastName,
        isMainCar: form.isMainCar,
        thirdPartyInsuranceExpireDate: form.thirdPartyInsuranceExpireDate,
        bodyInsuranceExpireDate: form.bodyInsuranceExpireDate,
        licensePlateIranDigits: form.licensePlateIranDigits,
        licensePlateAlphabet: form.licensePlateAlphabet,
        licensePlateFirstTwoDigits: form.licensePlateFirstTwoDigits,
        licensePlateThreeDigits: form.licensePlateThreeDigits,
        distanceOfMovementInKm: form.distanceOfMovementInKm,
        technicalDiagnosisDate: form.technicalDiagnosisDate,
        vinCode: form.vinCode,
        barcode: form.barcode,
        imageUrl: form.imageUrl,
        isMyCar: form.isMyCar,
        yearOfManufacture: form.yearOfManufacture,
      },
      headers: Authorization.value,
    })
    return data
  }

  // Get Users Car By Id 
  const getUsersCarById = async (id:any) => {
    const data = await $fetch(`/Garage/GetUsersCarById?id=${id}`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'GET',
      headers: Authorization.value,
    })
    return data
  }

  // get car Models with Brand id
  const carModelsByCarGroupId = async (id:any) => {
    const data = await $fetch(`/Garage/CarModelsByCarGroupId?CarGroupId=${id}`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'GET',
      headers: Authorization.value,
    })
    return data
  }

  // Remove user car from parking
  const removeUserCar = async (id:any) => {
    const data = await $fetch(`/Garage/RemoveUserCar?id=${id}`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'DELETE',
      headers: Authorization.value,
    })
    return data
  }

  return {
    getAllUserCars,
    modifyUserCar,
    getCarGroupWithModels,
    removeUserCar,
    carModelsByCarGroupId,
    getUsersCarById
  }
}
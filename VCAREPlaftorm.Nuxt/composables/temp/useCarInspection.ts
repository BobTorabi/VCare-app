export const useCarInspection = () => {
  const config = useRuntimeConfig()
  const { authToken } = useAuth()
  const Authorization = ref({
    Authorization: 'Bearer ' + authToken.value,
    'Content-Type': 'application/json',
  })

  // Get all inspections
  const getAllInspections = async () => {
    const data = await $fetch(`/CarInspection/GetAll`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'GET',
      headers: Authorization.value,
    })
    return data
  }

  // Get an inspection
  const getInspection = async () => {
    const data = await $fetch(`/CarInspection/Get`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'GET',
      headers: Authorization.value,
    })
    return data
  }

  // Post a car inspection form
  const postInspection = async (form) => {
    const data = await $fetch(`/CarInspection/Add`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        userCarId: form.userCarId,
        carModelId: form.carModelId,
        carPlaqueIranDigits: form.iranDigits,
        carPlaqueAlphabet: form.plateAlphabet,
        carPlaqueTwoDigits: form.firstTwoDigits,
        carPlaqueThreeDigits: form.threeDigits,
        cityId: form.cityId,
        address: form.address,
        timeVisit: form.timeVisit,
        inspectionTypeId: form.inspectionTypeId,
        yearOfManufacture: form.yearOfManufacture,
      },
      headers: Authorization.value,
    })
    return data
  }


  // Generate payment url
  const generatePaymentUrl = async (form) => {
    const data = await $fetch(`/CarInspection/GeneratePaymentUrl`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        id: form.id,
        callbackUrl: config.CALLBACK_URL
      },
      headers: Authorization.value,
    })
    return data
  }

  // Update an inspection
  const updateInspection = async (form) => {
    const data = await $fetch(`/CarInspection/Update`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        userCarId: form.userCarId,
        carModelId: form.carModelId,
        carPlaqueIranDigits: form.carPlaqueIranDigits,
        carPlaqueAlphabet: form.carPlaqueAlphabet,
        carPlaqueTwoDigits: form.carPlaqueTwoDigits,
        carPlaqueThreeDigits: form.carPlaqueThreeDigits,
        cityId: form.cityId,
        address: form.address,
        timeVisit: form.timeVisit,
        inspectionTypeId: form.inspectionTypeId,
        yearOfManufacture: form.yearOfManufacture,
      },
      headers: Authorization.value,
    })
    return data
  }

  // Calculate Car Inspection Price
  const calculateInspectionPrice = async (form) => {
    const data = await $fetch(`/CarInspection/CalculateInspectionPrice`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        userCarId: form.userCarId,
        carModelId: form.carModelId,
        inspectionTypeId: form.inspectionTypeId,
        yearOfManufacture: form.yearOfManufacture,
      },
      headers: Authorization.value,
    })
    return data
  }

  //Chosse Payment method
  const choosePaymentMethod = async (form) => {
    const data = await $fetch(`/CarInspection/ChoosePaymentMethod`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        id: form.id,
        isOnline: form.isOnline,
      },
      headers: Authorization.value,
    })
    return data
  }

  return {
    getAllInspections,
    getInspection,
    postInspection,
    updateInspection,
    choosePaymentMethod,
    generatePaymentUrl,
    calculateInspectionPrice,
  }
}

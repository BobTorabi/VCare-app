export const useInquiry = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // Fetches fine details + fine image if exists
  const inquiryFineDetails = async (form) => {
    const data = await $fetch(`/Inquiry/ViolationInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        client: form.client,
        code: form.code,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
        licensePlateFirstTwoDigits: form.firstTwoDigits,
        licensePlateAlphabet: form.plateAlphabet,
        licensePlateThreeDigits: form.threeDigits,
        licensePlateIranDigits: form.iranDigits,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Fetches fine accumulation
  const inquiryFineAccumulation = async (form) => {
    const data = await $fetch(`/Inquiry/AccumulationViolationsInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        client: form.client,
        code: form.code,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
        licensePlateFirstTwoDigits: form.firstTwoDigits,
        licensePlateAlphabet: form.plateAlphabet,
        licensePlateThreeDigits: form.threeDigits,
        licensePlateIranDigits: form.iranDigits,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Fetches card and sanad status by car details
  const inquiryCardSanad = async (form) => {
    const data = await $fetch(`/Inquiry/CardSanadInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        client: form.client,
        code: form.code,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
        licensePlateFirstTwoDigits: form.firstTwoDigits,
        licensePlateAlphabet: form.plateAlphabet,
        licensePlateThreeDigits: form.threeDigits,
        licensePlateIranDigits: form.iranDigits,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Fetches driving licence status
  const inquiryDrivinglicence = async (form) => {
    const data = await $fetch(`/Inquiry/LicenseStatusInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        client: form.client,
        code: form.code,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Fetches licence negative score
  const inquiryNegativeScore = async (form) => {
    const data = await $fetch(`/Inquiry/LicenseNegativePointInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        client: form.client,
        code: form.code,
        licenseNo: form.licenceNo,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Fetches active pelate number
  const inquiryActivePelak = async (form) => {
    const data = await $fetch(`/Inquiry/ActivePlakInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        client: form.client,
        code: form.code,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Fetches fine image + pelak image
  const inquiryImage = async (form, serialNo) => {
    const data = await $fetch(`/Inquiry/ViolationImageInquiryByInfo`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        serialNo: serialNo,
        code: form.code,
        mobile: form.mobile,
        nationalCode: form.nationalCode,
        licensePlateFirstTwoDigits: form.firstTwoDigits,
        licensePlateAlphabet: form.plateAlphabet,
        licensePlateThreeDigits: form.threeDigits,
        licensePlateIranDigits: form.iranDigits,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Send OTP in case user try to inquiry for other users
  const sendInquiryOTP = async (mobile) => {
    const data = await $fetch(`/Inquiry/SendOtp`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        mobile: mobile,
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Car fine payment
  const payFine = async (amount, billId, paymentId) => {
    const data = await $fetch(`/Payment/CarFines`, {
      baseURL: config.SERVER_CORE_URL,
      method: "POST",
      body: {
        amount: amount,
        billId: billId,
        paymentId: paymentId,
        callbackUrl: config.CALLBACK_URL
      },
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  //Get all inquiry History
  const getAllInquiryHistory = async (form) => {
    const data = await $fetch(`Inquiry/GetAllInquiryHistory`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  //Get all inquiry History
  const getInquiryHistoryDetail = async (id) => {
    const data = await $fetch(`Inquiry/GetInquiryHistoryDetail?Id=${id}`, {
      baseURL: config.SERVER_CORE_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };


  return {
    inquiryFineDetails,
    inquiryFineAccumulation,
    inquiryCardSanad,
    inquiryDrivinglicence,
    inquiryNegativeScore,
    inquiryActivePelak,
    inquiryImage,
    sendInquiryOTP,
    payFine,
    getAllInquiryHistory,
    getInquiryHistoryDetail
  };
};

export const useContactUs = () => {
  const config = useRuntimeConfig()
  const { authToken } = useAuth()
  const Authorization = ref({
    Authorization: 'Bearer ' + authToken.value,
    'Content-Type': 'application/json',
  })

  // post iranecar contact form
  const registerContact = async (form: any) => {
    const data = await $fetch(`/Contact/Add`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        fullName: form.fullName,
        email: form.email,
        mobile: form.mobile,
        subject: form.subject,
        description: form.description,
        projectId: null, // TODO: after improved back
      },
      headers: {
        Authorization: 'Bearer ' + authToken.value,
        'Content-Type': 'application/json',
      },
    })
    return data
  }


  // post navak contact form
  const registerNavakContact = async (form: any) => {
    const data = await $fetch(`/Contact/Add`, {
      baseURL: config.SERVER_CORE_URL,
      method: 'POST',
      body: {
        fullName: form.fullName,
        companyTitle: form.companyTitle,
        mobile: form.mobile,
        organizationPhone: form.organizationPhone,
        organizationLevel: form.organizationLevel,
        fieldofActivityCompany: form.fieldofActivityCompany,
        email: form.email,
        province: form.province,
        webSite_Url: form.webSite_Url,
        subject: "Navak",
        description: "Navak",
        projectId: null, // TODO: after improved back
      },
      headers: {
        Authorization: 'Bearer ' + authToken.value,
        'Content-Type': 'application/json',
      },
    })
    return data
  }

  return {
    registerContact, registerNavakContact
  }
}

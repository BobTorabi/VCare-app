export const useAuth = () => {
  const cookieToken = useCookie('userToken')
  const cookieUser = useCookie('userDetails')
  const cookieReportDate = useCookie('reportDate')
  const cookieReportCode = useCookie('reportCode')
  const cookieStep = useCookie('userStep')
  
  const authToken = useState("authToken", () => "")
  const authUser = useState("authUser", () => "")
  const authReportDate = useState("authReportDate", () => "")
  const authReportCode = useState("authReportCode", () => "")
  const authStep = useState("authStep", () => "")

  if (cookieToken.value) {
    authToken.value = cookieToken.value;
  }
  if (cookieUser.value) {
    authUser.value = cookieUser.value;
  }
  if (cookieReportDate.value) {
    authReportDate.value = cookieReportDate.value;
  }
  if (cookieReportCode.value) {
    authReportCode.value = cookieReportCode.value;
  }
  if (cookieStep.value) {
    authStep.value = cookieStep.value;
  }
  return { authToken, authUser, authReportDate , authReportCode, authStep };
};
export const useAuth = () => {
  const cookieToken = useCookie('userToken')
  const cookieUser = useCookie('userDetails')
  const cookieReportDate = useCookie('reportDate')
  const authToken = useState("authToken", () => "")
  const authUser = useState("authUser", () => "")
  const authReportDate = useState("authReportDate", () => "")
  if (cookieToken.value) {
    authToken.value = cookieToken.value;
  }
  if (cookieUser.value) {
    authUser.value = cookieUser.value;
  }
  if (cookieReportDate.value) {
    authReportDate.value = cookieReportDate.value;
  }
  return { authToken, authUser, authReportDate };
};
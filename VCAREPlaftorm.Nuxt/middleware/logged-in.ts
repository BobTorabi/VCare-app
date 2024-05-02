export default defineNuxtRouteMiddleware((to, from) => {
  const { authToken } = useAuth();

  if (!authToken.value) {
    return navigateTo('/', { replace: true });
  }
});

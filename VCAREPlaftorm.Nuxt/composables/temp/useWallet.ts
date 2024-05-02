export const useWallet = () => {
  const config = useRuntimeConfig();
  const { authToken } = useAuth();
  const Authorization = ref({
    Authorization: "Bearer " + authToken.value,
    "Content-Type": "application/json",
  });

  // Get user wallet total amount
  const getTotalAmount = async () => {
    const data = await $fetch(`/Wallet/TotalAmount`, {
      baseURL: config.SERVER_WALLET_URL,
      method: "GET",
      headers: {
        Authorization: "Bearer " + authToken.value,
        "Content-Type": "application/json",
      },
    });
    return data;
  };

  // Increase user wallet balance (old wallet)
  const increaseWallet = async ({ form }) => {
    const data = await $fetch(`/Payment/PrepareIncreaseWallet`, {
      baseURL: config.SERVER_WALLET_URL,
      method: "POST",
      body: { amount: form.value, callbackUrl: config.CALLBACK_URL },
      headers: Authorization.value,
    });
    return data;
  };

  // Increase user wallet balance by gift code
  const increaseWalletByGiftCode = async (form) => {
    // alert(form.giftCode)
    const data = await $fetch(`/Gift/IncreaseWalletByGiftCode`, {
      baseURL: config.SERVER_WALLET_URL,
      method: "POST",
      body: { userId: form.userId, giftCode: form.giftCode },
      headers: Authorization.value,
    });
    return data;
  };
  return {
    getTotalAmount,
    increaseWallet,
    increaseWalletByGiftCode
  };
};

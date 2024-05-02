<script setup>
definePageMeta({
  layout: 'profile',
  middleware: 'logged-in',
});

const cookieWallet = useCookie('wallet')

const config = useRuntimeConfig();
const { authToken, authWallet } = useAuth();
const tab = ref(0);
const tabs = [
  'کیف پول من',
]
// State:
const loginModal = ref(false);
const currentPage = ref(1);
const totalPage = ref(0)

cookieWallet.value = await $fetch(`/Wallet/TotalAmount`, {
  baseURL: config.SERVER_WALLET_URL,
  method: 'GET',
  headers: {
    Authorization: 'Bearer ' + authToken.value,
    'Content-Type': 'application/json',
  },
}).catch((err) => console.log(err))
authWallet.value = cookieWallet.value



// Initial Get Transactions
const { data: transactions } = await useFetch(`/Wallet/GetTransactions`, {
  baseURL: config.SERVER_WALLET_URL,
  method: 'POST',
  body: {
    startDate: '',
    endDate: '',
    pageIndex: currentPage
  },
  headers: {
    Authorization: 'Bearer ' + authToken.value,
    'Content-Type': 'application/json',
  },
}).catch((error) => console.log(error));
totalPage.value = transactions.value.data.totalPage;

// next page
const nextPage = async () => {
  if (currentPage.value < totalPage.value) {
    currentPage.value++;
    const { data: transactions } = await useFetch(`/Wallet/GetTransactions`, {
      baseURL: config.SERVER_WALLET_URL,
      method: 'POST',
      body: {
        startDate: '',
        endDate: '',
        pageIndex: currentPage
      },
      headers: {
        Authorization: 'Bearer ' + authToken.value,
        'Content-Type': 'application/json',
      },
    }).catch((error) => console.log(error));
    totalPage.value = transactions.value.data.totalPage;
  }


}
// next page
const prevPage = async () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    const { data: transactions } = await useFetch(`/Wallet/GetTransactions`, {
      baseURL: config.SERVER_WALLET_URL,
      method: 'POST',
      body: {
        startDate: '',
        endDate: '',
        pageIndex: currentPage
      },
      headers: {
        Authorization: 'Bearer ' + authToken.value,
        'Content-Type': 'application/json',
      },
    }).catch((error) => console.log(error));
    totalPage.value = transactions.value.data.totalPage;
  }
}


</script>
<template>
  <div class="flex flex-col space-y-2 w-full relative">

    <Head>
      <Title>کیف پول</Title>
      <Meta name="description" content="متا دیسکریپشن صفحه اول" />
    </Head>

    <SharedWalletModal v-if="loginModal" @close="loginModal = false" />

    <!-- Banner -->
    <!-- <ProfileBanner class="hidden lg:flex" /> -->

    <NuxtLink to="/profile" class="lg:hidden flex gap-3 items-center text-brand-red font-semibold ">
      <img src="/icons/arrow-right.svg" alt="">
      <p>بازگشت</p>
    </NuxtLink>

    <!-- Tabs -->
    <ProfileTabs v-model="tab" :titles="tabs" />

    <div v-if="tab === 0"
      class="flex flex-col space-y-10 border rounded-md px-2 md:px-5 py-10 farsi-num overflow-x-scroll">
      <div class="flex justify-between items-center border-y border-black py-5">
        <nuxt-icon class="text-brand-red w-10" name="wallet" />
        <p>موجودی کیف پول شما {{ $seperator(authWallet.data) }} ریال</p>
        <button @click="loginModal = true"
          class="bg-brand-red flex justify-center gap-3 items-center px-3 py-2 rounded-md text-white whitespace-nowrap">
          <nuxt-icon class="w-5" name="plus" />
          <p>افزایش موجودی</p>
        </button>
      </div>

      <!-- pagination -->
      <ul class="flex flex-row mx-auto justify-between items-center gap-3 self-center">
        <li>
          <button @click="prevPage()"
            class="border rounded flex hover:bg-gray-200 flex-row items-center justify-center shadow p-1" type="button">
            <nuxt-icon name="chevron-left" class="w-5 rotate-180" />
          </button>
        </li>
        <li>
          <span class="p-1 text-lg font-semibol">{{ currentPage }}</span>
          از
          {{ totalPage }}
        </li>
        <li>
          <button @click="nextPage()"
            class="border rounded flex hover:bg-gray-200 flex-row items-center justify-center shadow p-1" type="button">
            <nuxt-icon name="chevron-left" class="w-5 rotate" />
          </button>
        </li>
      </ul>

      <table v-if="transactions.data.items" class="table-auto whitespace-nowrap">
        <thead class="text-right">
          <tr>
            <th class="py-5">شناسه</th>
            <th class="py-5">عنوان</th>
            <th>مبلغ</th>
            <th>تاریخ</th>
            <!-- <th>ساعت</th> -->
            <th>وضعیت</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in transactions.data.items" :key="index" :class="index % 2 === 0 ? 'bg-gray-100' : ''">
            <td>{{ item.trackingCode }}</td>
            <td class="py-5">{{ item.type }}</td>
            <td>{{ $seperator(item.amount) }} ریال</td>
            <td>{{ item.createDate }}</td>
            <!-- <td>{{ item.trackingCode }}</td> -->
            <td>موفق</td>
          </tr>
        </tbody>
      </table>

      <!-- pagination -->
      <ul class="flex flex-row mx-auto justify-between items-center gap-3 self-center">
        <li>
          <button @click="prevPage()"
            class="border rounded flex hover:bg-gray-200 flex-row items-center justify-center shadow p-1" type="button">
            <nuxt-icon name="chevron-left" class="w-5 rotate-180" />
          </button>
        </li>
        <li>
          <span class="p-1 text-lg font-semibol">{{ currentPage }}</span>
          از
          {{ totalPage }}
        </li>
        <li>
          <button @click="nextPage()"
            class="border rounded flex hover:bg-gray-200 flex-row items-center justify-center shadow p-1" type="button">
            <nuxt-icon name="chevron-left" class="w-5 rotate" />
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
// Composables
const cookieToken = useCookie('token', { domain: "iranecar.com" })
const cookieUser = useCookie('user', { domain: "iranecar.com" })
const cookieWallet = useCookie('wallet', { domain: "iranecar.com" })
const router = useRouter()
const route = useRoute()
const { authToken, authUser, authWallet } = useAuth()

// States
const toggleItem = ref();
const menuItems = [
  {
    title: "داشبورد",
    SVGName: "dashboard",
    linkTo: "/profile",
  },
  {
    title: "ایرانی کار من",
    SVGName: "mobile-logo",
    isParent: true,
    subMenus: [
      {
        title: "استعلام‌های من",
        SVGName: "my-inquiry",
        linkTo: "/profile/my-inquiry",
      },
      {
        title: "کارشناسی خودرو",
        SVGName: "my-car",
        linkTo: "/profile/inspection",
      },
    ],
  },
  {
    title: "اطلاعات کاربری",
    SVGName: "user",
    linkTo: "/profile/my-info",
  },
  {
    title: "خودروهای من",
    SVGName: "my-car",
    linkTo: "/profile/my-cars",
  },
  {
    title: "سفارشات",
    SVGName: "bag",
    linkTo: "/profile/my-orders",
  },
  {
    title: "اعلان‌ها",
    SVGName: "notification",
    linkTo: "/profile/my-notifications",
  },
  {
    title: "نشان شده‌ها",
    SVGName: "favorite",
    linkTo: "/profile/my-bookmarks",
  },
  // {
  //   title: "تنظیمات",
  //   SVGName: "setting",
  //   linkTo: "/profile/settings",
  // },
  {
    title: "پشتیبانی",
    SVGName: "support",
    linkTo: "/profile/support",
  },
  {
    title: "خروج",
    SVGName: "exit",
    isExit: true,
  },
];

// Logics
const toggleMenu = (index) => {
  if (toggleItem.value === index) {
    toggleItem.value = null;
  } else {
    toggleItem.value = index;
  }
};

const logout = async () => {
  // Tracking User logout by Google Tag Manager
  window.dataLayer.push({ 'event': 'logout', 'logoutSource': 'iranecar_userProfile' })
  cookieToken.value = await null;
  authToken.value = await null;
  cookieUser.value = await null;
  authUser.value = await null;
  cookieWallet.value = await null;
  authWallet.value = await null;
  router.push("/");
};
</script>
<template>
  <div class="bg-gray-100 flex flex-col border w-full items-center rounded-md shadow-inner">
    <div class="flex flex-col self-start w-full">
      <div v-for="(item, index) in menuItems" class="flex flex-col w-full gap-4" :key="index">
        <!-- Parent menu item -->
        <div v-if="item.isParent === true" class="flex flex-col w-full">
          <div class="flex items-center gap-4">
            <div class="h-10 w-0.5" :class="{ 'bg-brand-red': toggleItem === index }"></div>
            <button @click="toggleMenu(index)"
              class="flex-1 hover:bg-gray-200 text-gray-500 flex items-center justify-between py-4 gap-5 ml-4"
              :class="{ 'border-b': toggleItem !== index }">
              <div class="flex items-center gap-4">
                <NuxtIcon class="w-4" :class="{ 'text-brand-blue': toggleItem === index }" :name="item.SVGName" />
                <p :class="{ 'text-brand-blue': toggleItem === index }">
                  {{ item.title }}
                </p>
              </div>
              <NuxtIcon class="text-red-700 rotate-90 transition-all ease-in-out duration-150"
                :class="{ 'rotate-0 ': toggleItem === index }" name="chevron-down" />
            </button>
          </div>
          <div v-if="toggleItem === index" class="border-b mx-4">
            <div v-for="(sebMenu, index) in item.subMenus"
              class="flex items-center gap-3 pr-4 text-xs hover:bg-gray-100" :key="index">
              <div class="h-7 w-4" :class="{ 'bg-brand-red': route.path === sebMenu.linkTo }"></div>
              <NuxtLink :to="sebMenu.linkTo" class="flex-1 hover:bg-gray-200 flex items-center gap-2 py-2" :class="
                route.path === sebMenu.linkTo
                  ? 'text-brand-blue font-semibold'
                  : 'text-gray-500'
              ">
                <NuxtIcon class="bg-blue-100 p-1.5 self-center w-6 h-6 rounded-full text-brand-blue" :class="
                  route.path === sebMenu.linkTo
                    ? 'text-brand-blue font-semibold'
                    : 'text-gray-500'
                " :name="sebMenu.SVGName" />
                <p>{{ sebMenu.title }}</p>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Button menu item > Exit -->
        <div v-else-if="item.isExit" class="flex items-center gap-4">
          <div class="h-10 w-0.5"></div>
          <button @click="logout"
            class="flex-1 hover:bg-gray-200 text-gray-500 flex items-center py-4 gap-5 ml-4 border-b">
            <NuxtIcon :name="item.SVGName" class="w-[18px]" />
            <p>{{ item.title }}</p>
          </button>
        </div>

        <!-- Link menu item -->
        <div v-else class="flex items-center gap-4">
          <div class="h-10 w-0.5" :class="{ 'bg-brand-red': route.path === item.linkTo }"></div>
          <NuxtLink :to="item.linkTo"
            class="flex-1 hover:bg-gray-200 text-gray-500 flex items-center py-4 gap-5 ml-4 border-b" :class="
              route.path === item.linkTo
                ? 'text-brand-blue font-semibold'
                : 'text-gray-500'
            ">
            <NuxtIcon :class="{ 'text-brand-blue': route.path === item.linkTo }" :name="item.SVGName" />
            <p :class="{ 'text-brand-blue': route.path === item.linkTo }">
              {{ item.title }}
            </p>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

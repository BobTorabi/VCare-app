<script setup>
const { authUser } = useAuth();
const { getUserDetailsById } = useIdentity();
// States
const mobileMenu = ref(false);
const menuItems = [
  // {
  //   title: "Home",
  //   isParent: true,
  //   subMenus: [
  //     {
  //       title: "Dashboard",
  //       linkTo: "/dashboard",
  //     },
  //     {
  //       title: "Home 2",
  //       linkTo: "/home2",
  //     },
  //     {
  //       title: "Home 3",
  //       linkTo: "/home3",
  //     },
  //     {
  //       title: "Home 4",
  //       linkTo: "/home4",
  //     },
  //   ],
  // },
  {
    title: "Message",
    linkTo: "/message",
  },
  {
    title: "Library",
    linkTo: "/Library",
  },
  {
    title: "Send report",
    linkTo: "/questions",
  },
  {
    title: "My reports",
    linkTo: "/report/myReport",
  },
  {
    title: "Logout",
    isExit: true,
  },
  // {
  //   title: "Main Menu",
  //   isParent: true,
  //   subMenus: [
  //     {
  //       title: "Submenu 1",
  //       linkTo: "https://sapoco.com/blog",
  //     },
  //     {
  //       title: "Submenu 2",
  //       linkTo: "https://sapoco.com/blog/category/sales-notices/",
  //     },
  //   ],
  // },
];
const loading = ref(true);
const errMessage = ref();
const userProfileItems = ref();

// Logics
// get User Profile
const handleGetUserDetailsById = () => {
  getUserDetailsById(authUser.value.id)
    .then(async (r) => {
      if (r.status === 200) {
        errMessage.value = null;
        userProfileItems.value = await r.data;
      } else if (r.status == 500) {
        errMessage.value = r.messages[0];
      }
    })
    .catch((err) => (errMessage.value = err.data))
    .finally(() => loading.value = false);
}
handleGetUserDetailsById();

</script>
<template>
  <div>
    <!-- Main Top Menu -->
    <!-- <div
      class="h-20 flex justify-between items-center mx-auto py-3 px-1"
      :class="{ 'bg-gray-100 shadow-md': route.path !== '/' }"
    > -->
    <div class="h-20 flex justify-between items-center mx-auto py-3 px-1">
      <!-- Left Section -->
      <div
        class="flex justify-start text-lg w-3/5 whitespace-nowrap bg-white h-[49px] pt-2 px-2 ml-3 mb-[6px] rounded-md leading-8">
        <NuxtIcon name="calendar" filled="" class="w-6 h-6 mt-1 mx-2" />
        <template v-if="userProfileItems">
          {{ userProfileItems.periodTime }}
          <!-- Day 36 of 60 -->
        </template>
      </div>

      <!-- Messages -->
      <NuxtLink to="/message" class="flex justify-end -mr-3">
        <NuxtIcon name="messages" filled="" />
      </NuxtLink>

      <!-- Burger Button -->
      <button @click="mobileMenu = !mobileMenu" class="flex justify-end">
        <!-- <NuxtIcon name="burger-menu" filled="" /> -->
        <img src="@/assets/images/burger-menu.png" class="" alt="" />
      </button>

      <!-- Mobile Menu -->
      <ThemeMobileMenu :menuItems="menuItems" v-model="mobileMenu" :toggleMenu="mobileMenu" />
    </div>
  </div>
</template>

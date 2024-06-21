<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
  toggleMenu: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["modelValue"]);

// Composables
const cookieToken = useCookie('userToken');
const cookieUser = useCookie("userDetails");
const cookieStep = useCookie("userStep");
const router = useRouter();
const { authToken, authUser, authStep } = useAuth();

// States
const toggleItem = ref();

//Logics
const toggleSubMenu = (index) => {
  if (toggleItem.value === index) {
    toggleItem.value = null;
  } else {
    toggleItem.value = index;
  }
};

//logout
const logout = async () => {
  cookieToken.value = await null;
  authToken.value = await null;
  authStep.value = await null;
  cookieUser.value = await null;
  cookieStep.value = await null;
  router.push("/");
};
</script>
<template>
  <div v-if="toggleMenu" @click="$emit('update:modelValue', false)"
    class="fixed overflow-x-hidden top-0 left-0 h-screen w-screen bg-slate-800/50 z-50"></div>
  <div
    class="w-80 fixed h-screen top-0 right-0 translate-x-80 shadow-lg transform transition-all duration-300 bg-white z-50 flex flex-col"
    :class="toggleMenu ? 'translate-x-[0px]' : ''">
    <div class="bg-gray-100 flex items-center px-4 py-4">
      <button @click="$emit('update:modelValue', false)" class="w-8 hover:bg-gray-300 rounded-md">
        <NuxtIcon name="cross" />
      </button>
      Close
    </div>
    <div>
      <div v-for="(item, index) in menuItems" :key="index" class="flex flex-col px-5">

        <template v-if="item.isExit != true">
          <NuxtLink v-if="!item.isParent" :to="item.linkTo" @click="$emit('update:modelValue', false)"
            class="py-4 border-b px-2 hover:bg-color-green/10 w-full h-full">
            {{ item.title }}
          </NuxtLink>
          <button v-if="item.isParent" @click="toggleSubMenu(index)"
            class="flex justify-between gap-2 items-center py-4 px-3 hover:bg-color-green/10 box-border"
            :class="{ 'border-b': !toggleItem }">
            <span class="cursor-pointer">{{ item.title }}</span>
            <NuxtIcon class="text-red-700 -rotate-90 transition-all ease-in-out duration-150"
              :class="{ '-rotate-1 ': toggleItem === index }" name="chevron-down" />
          </button>
          <div v-if="toggleItem === index" class="flex flex-col bg-white border-b pr-5 text-xs">
            <NuxtLink v-for="(sebMenu, index) in item.subMenus"
              class="self-start hover:bg-color-green/10 rounded-md p-3 w-full px-5" :to="sebMenu.linkTo" :key="index"
              @click="$emit('update:modelValue', false)">
              <span>{{ sebMenu.title }}</span>
            </NuxtLink>
          </div>
        </template>
        <template v-else>
          <!-- Button menu item > Exit -->
          <button @click="logout" class="py-4 border-b px-2 hover:bg-color-green/10 w-full h-full text-left">
            {{ item.title }}
          </button>
        </template>

      </div>
    </div>
  </div>
</template>

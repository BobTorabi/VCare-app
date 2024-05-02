<script setup>
const props = defineProps({
  menuItems: {
    type: Array,
    required: true,
  },
});

// Composables
const route = useRoute();

// States
const toggleItem = ref();

//Logics
const toggleMenu = (index) => {
  if (toggleItem.value === index) {
    toggleItem.value = null;
  } else {
    toggleItem.value = index;
  }
};
</script>
<template>
  <nav class="hidden lg:flex items-center">
    <div v-for="(item, index) in menuItems" :key="index">
      <NuxtLink v-if="!item.isParent" :to="item.linkTo" class="py-6 px-5 rounded-b-md" :class="route.path === item.linkTo
          ? 'bg-color-green text-white'
          : 'hover:bg-color-green/10'
        ">
        {{ item.title }}
      </NuxtLink>
      <button v-if="item.isParent" @mouseenter="toggleMenu(index)" @click="toggleMenu(index)"
        @mouseleave="toggleItem = null"
        class="relative flex gap-2 items-center py-6 px-3 rounded-b-md hover:bg-color-green/10 box-border">
        <div v-if="toggleItem === index"
          class="absolute bg-white/90 top-[68px] right-0 w-40 z-50 transition duration-200 ease-in-out rounded-md shadow-md">
          <ul class="flex flex-col">
            <NuxtLink v-for="(sebMenu, index) in item.subMenus"
              class="self-start hover:bg-color-green/10 rounded-md p-3 w-full text-right whitespace-nowrap"
              :to="sebMenu.linkTo" :key="index">
              <span>{{ sebMenu.title }}</span>
            </NuxtLink>
          </ul>
        </div>
        <span class="cursor-pointer">{{ item.title }}</span>
        <NuxtIcon name="chevron-down" />
      </button>
    </div>
  </nav>
</template>

<script setup>
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
    titles: {
        type: Array,
        required: true
    }
})

//states
const tab = ref(0);

// Change Tabs
const changeTab = (index) => {
    tab.value = index;
    emit('update:modelValue', tab.value);
};
</script>

<template>
    <div class="flex h-16 gap-10 bg-gray-100 shrink-0 border pr-3 rounded-md shadow-inner overflow-y-scroll scrollbar">
        <button v-for="(title, index) in titles" :key="index" @click="changeTab(index)"
            class="self-end  hover:bg-gray-100 p-2 whitespace-nowrap"
            :class="tab === index ? 'border-b-2 font-semibold border-red-600' : ''">
            {{ title }}
        </button>
    </div>
</template>
<style scoped>
/* Hide scrollbar for Chrome, Safari and Opera */
.scrollbar::-webkit-scrollbar {
    display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.scrollbar {
    -ms-overflow-style: none;
    /* IE and Edge */
    scrollbar-width: none;
    /* Firefox */
}
</style>
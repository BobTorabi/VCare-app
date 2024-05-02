<template>
    <span class=" flex items-center justify-center nuxt-icon" :class="{ 'nuxt-icon--fill': !filled }" v-html="icon"  />
</template>

<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    filled: {
        type: Boolean,
        default: false,
        required: false
    }
})
const icon = ref()

try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', { as: 'raw', eager: false })
    const rawIcon = await iconsImport[`/assets/icons/${props.name}.svg`]()
    icon.value = rawIcon
} catch {
    console.error(`[nuxt-icons] Icon '${props.name}' doesn't exist in 'assets/icons'`)
}

</script>

<style>
.nuxt-icon svg {
    vertical-align: middle;
}

.nuxt-icon.nuxt-icon--fill,
.nuxt-icon.nuxt-icon--fill * {
    fill: currentColor !important;
}
</style>
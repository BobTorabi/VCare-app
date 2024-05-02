<script setup>
  defineProps({
    faqData:{
        type: Array
    }
  });
</script>

<template>
    <!-- <SchemaOrgWebpage type="FAQPage" /> -->
    <SchemaOrgQuestion v-for="(faq,index) in faqData" :key="index">
        <template #name>
            {{ faq.title }}
        </template>
        <template #acceptedAnswer>
            <p>{{ faq.details }}</p>
        </template>
    </SchemaOrgQuestion>
</template>


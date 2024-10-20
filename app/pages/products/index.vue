<template>
<div class="flex w-full max-w-app justify-center py-12">

    <div class="w-full">

        <UButton icon="i-ph-plus" class="mb-6" size="lg" to="/products/create">Add</UButton>

        <UTable :rows="products" class="w-full">
            <template #title-data="{ row }">
                <nuxt-link :to="row.slug">{{ row.title }}</nuxt-link>
            </template>
        </UTable>

    </div>

</div>
</template>


<script setup>  


const { data:products } = await useFetch('/api/products/all')

</script>
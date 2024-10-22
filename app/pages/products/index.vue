<template>
<div class="flex w-full max-w-app justify-center py-12">

    <div class="w-full">

        <UButton icon="i-ph-plus" class="mb-6" size="lg" to="/products/create">Add</UButton>

        <UTable :rows="products" :columns="columns" class="w-full">
            <template #title-data="{ row }">
                <nuxt-link :to="row.slug">{{ row.title }}</nuxt-link>
            </template>

            <template #drivers-data="{ row }">
                <ul>
                    <li v-for="driver of row.drivers">{{ driver.value }}: {{ driver.qty }}</li>
                </ul>
            </template>

            <template #actions-data="{ row }">
                <UButton
                    :to="'/products/' + row.id + '/edit'"
                    icon="i-heroicons-pencil"
                    size="xs"
                    variant="ghost"
                    square
             />

        </template>

        </UTable>

    </div>

</div>
</template>


<script setup>  

const { data:products } = await useFetch('/api/products/all')

const columns = [{
    key: 'id',
    label: 'ID'
}, {
    key: 'brand',
    label: 'Brand'
}, {
    key: 'model',
    label: 'Model'
}, {
    key: 'title',
    label: 'Title'
}, {
    key: 'drivers',
    label: 'Drivers'
}, {
    key: 'actions'
}]


</script>
<template>
<div class="flex w-full max-w-app justify-center py-12">

    <div class="w-full">

        <div class="flex justify-between">

            <div class="flex gap-2">
                <div>
                    <UInput v-model="query" placeholder="Search..." />
                </div>
                <div>
                    <USelect v-model="type" :options="['iems','daps','dacs']" placeholder="Type" />
                </div>
            </div>

            <div class="flex justify-between">
                <UButton icon="i-ph-plus" class="mb-6" size="lg" to="/products/create">Add</UButton>
            </div>
        </div>

        <UTable :rows="filteredRows" :columns="columns" class="w-full">
            <template #title-data="{ row }">
                <nuxt-link :to="'/products/' + row.id + '/edit'">{{ row.title }}</nuxt-link>
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

const query = ref()
const type = ref()

const { data:products } = await useFetch('/api/products/all', {
    query: {
        type: type
    }
}, {
    deep: true
})

const filteredRows = computed(() => {
  if (!query.value) {
    return products.value
  }

  return products.value.filter((person) => {
    return Object.values(person).some((value) => {
      return String(value).toLowerCase().includes(query.value.toLowerCase())
    })
  })
})

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
},  {
    key: 'type',
    label: 'Type'
},{
    key: 'drivers',
    label: 'Drivers'
}, 
{
    key: 'priceRange',
    label: 'Price Range'
}, 
{
    key: 'releaseDate',
    label: 'Release Date'
},
{
    key: 'actions'
}]


</script>
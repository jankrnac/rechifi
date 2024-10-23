<template>
    <div class="flex w-full max-w-app justify-center py-12">
    
        <div class="w-full">

            <div class="flex gap-x-5 mb-6">
                <USelectMenu searchable :options="products" placeholder="Select products" option-attribute="title" clear-search-on-close @change="addProduct"/>
                <USelectMenu searchable :options="posts" placeholder="Select posts" />
            </div>
    
            <UTable :rows="heroes" :columns="columns" class="w-full">
    
                <template #actions-data="{ row }">
                    <UButton
                        icon="i-ph-x"
                        size="xs"
                        color="red"
                        variant="ghost"
                        @click="removeProduct(row)"
                 />
    
            </template>
    
            </UTable>
    
        </div>
    
    </div>
    </template>
    
    
<script setup>  
    
    const { data:heroes, refresh } = await useFetch('/api/heroes')

    const { data:products } = await useFetch('/api/products/all')
    const { data:posts } = await useFetch('/api/posts')

    const columns = [{
        key: 'id',
        label: 'ID'
    }, {
        key: 'productId',
        label: 'Product'
    }, {
        key: 'postId',
        label: 'Post'
    }, {
        key: 'order',
        label: 'Order'
    },
    {
        key: 'actions'
    }]
    
const addProduct = async (data) => {
    await $fetch('/api/heroes', {
        method: "POST",
        body: {
            productId: data.id
        }
    })

    refresh()
}

const removeProduct = async (data) => {
    await $fetch('/api/heroes/'+data.id, {
        method: "DELETE",
        body: {
            type: 'product'
        }
    })

    refresh()
}

</script>
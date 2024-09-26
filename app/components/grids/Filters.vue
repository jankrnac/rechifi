<template>

<div aria-labelledby="filter-heading" class="border-t border-gray-200 dark:border-gray-600 py-6">
    
    <h2 id="filter-heading" class="sr-only">Product filters</h2>

    <div class="flex items-center justify-between">
        
        <!-- Mobile filter dialog -->
        <GridsMobileFilters ref="mobileDialog" :filters="filters"/>

        <USelectMenu v-model="activeSort" :options="sortOptions" placeholder="Sort by" />
      
        <UButton class="lg:hidden" @click="openMobileDialog" variant="ghost" color="gray">Filters</UButton>

        <div class="md:flex space-x-3 hidden">
            <template v-for="(filter, filterIdx) in filters.filter(e=>e.type =='list')">
                <UPopover>
                    <UButton :label="filter.name" variant="ghost" color="gray" trailing-icon="i-heroicons-chevron-down-20-solid"></UButton>

                    <template #panel>
                        <form class="p-4 space-y-4 max-h-[410px] overflow-y-auto">
                            <div v-for="(option, optionIdx) in filter.options" :key="option.value" class="flex items-center">
                            <input :id="`filter-${filter.id}-${optionIdx}`" :name="`${filter.id}[]`" :value="option" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600" v-model="activeFilters[filter.id]"/>
                            <label :for="`filter-${filter.id}-${optionIdx}`" class="ml-3 whitespace-nowrap pr-6 text-sm font-medium cursor-pointer">{{ option.label }}</label>
                            </div>
                        </form>
                    </template>
                </UPopover>
            </template>
        </div>
    </div>
</div>

</template>

<script setup>

const props = defineProps({

    sortOptions:{
        type: Array
    },
    filters: {
        type: Array
    }
})


const activeFilters = useState('activeFilters')

const activeSort = useState('activeSort', () => {
    return {}
})



const mobileDialog = ref(null)

const openMobileDialog = () => {
    mobileDialog.value.setOpen()
}

</script>
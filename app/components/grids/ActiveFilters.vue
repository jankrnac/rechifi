<template>
<div class="text-left h-12">
    <ul v-if="activeFilters && (activeFilters.signature.length || activeFilters.brand.length || activeFilters.drivers.length)" class="text-sm mb-4 flex gap-x-3">
        <template v-for="[key, values] of Object.entries(activeFilters)">
        <li v-if="values.length" class="flex items-center gap-1">
            <template v-if="values.length">
                <div class="mr-2 capitalize">{{ key }}:</div>
                <div v-for="value in values" class="flex items-center gap-x-2 bg-gray-200 rounded px-2 py-1">
                    <div class="capitalize">{{ value.label }}</div>
                    <Icon name="ph:x-thin" size="20px" class="cursor-pointer" @click="activeFilters[key] = activeFilters[key].filter(e => e != value)"/>
                </div>
            </template>
        </li>
        </template>
    </ul>
</div>

</template>

<script setup>

const activeFilters = useState('activeFilters')


</script>
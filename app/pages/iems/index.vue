<template>

<div class="w-full">
    <div>
        <div class="mx-auto max-w-3xl text-center lg:max-w-app">

            <!-- Filters -->
            <div class="pb-10 mt-10 lg:mt-16 lg:pb-24">
                <h1 class="text-3xl lg:text-6xl font-bold tracking-tigh">In-Ear Monitors</h1>
                <p class="text-center mx-auto mt-4 max-w-3xl text-lg lg:text-xl">All IEMs from asian country manufacturers in one place</p>
            </div>
            
            <!-- Active filters -->
            <GridsActiveFilters />
            

            <!-- Filters -->
            <GridsFilters 
                :sort-options="sortOptions" 
                :active-sort="activeSort" 
                :filters="filters"
            />
            
        </div>

    </div>

    <!-- Grid -->
    <div class="lg:max-w-app mx-auto mt-12 mb-24">
        
        <ul role="list" class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-4">
            
            <template v-for="item in data">
                <ProductBox :product="item" />
            </template>
        </ul>

        <div class="mt-24 flex justify-center">
            <Icon name="ph:arrow-circle-down-thin" size="48px" class="cursor-pointer" @click="loadMore" />
        </div>

    </div>

</div>

</template>


<script setup>

useSeoMeta({
    title: 'IEMs - Rechifi',
    description: `Explore the pinnacle of personal audio with our curated list of chi-fi in-ear monitors. Navigate through our filterable IEMs list to find the perfect blend of technical specifications, 
    sound signature, and price. Dive into detailed reviews, comparisons. Your guide to precision awaits explore our in-ear monitors list now!"`
})

/***** Data Init  *****/

const { data:brands } = await useFetch('/api/brands')


/***** Sorting *****/

const sortOptions = [
    { label: 'Name', value:'title' },
    { label: 'Release Date', value: 'releaseDate' },
]


const activeSort = useState('activeSort', () => sortOptions[0])

const sortPayload = computed(() => {
    return {
        [activeSort.value.value]:activeSort.value.value == 'name' ? -1 : 1
    }
})


/***** Filtering  *****/

const filters = [
    {
        id: 'showall',
        name: 'Show all',
        type: 'checkbox'
    },
    {
        id: 'signature',
        name: 'Signature',
        type: 'list',
        options: [
            { value: 'bright', label: 'Bright' },
            { value: 'warm', label: 'Warm' },
            { value: 'v-shaped', label: 'V-shaped' },
            { value: 'u-shaped', label: 'U-shaped' },
            { value: 'w-shaped', label: 'W-shaped' },
            { value: 'dark', label: 'Dark' },

        ],
    },
    {
        id: 'brand',
        name: 'Brand',
        type: 'list',
        options:brands.value
    },

    {
        id: 'drivers',
        name: 'Drivers',
        type: 'list',
        options: [
            { value: 'dd', label: 'DD' },
            { value: 'planar', label: 'Planar' },
            { value: 'ba', label: 'BA' },
            { value: 'est', label: 'EST' },

        ],
    },
]

const activeFilters = useState('activeFilters', () => {
    return {}
})

activeFilters.value.signature = useRoute().query.signature ?  [useRoute().query.signature].flat() : []
activeFilters.value.drivers = useRoute().query.drivers ?  [useRoute().query.drivers].flat() : []
activeFilters.value.brand = useRoute().query.brand ?  [useRoute().query.brand].flat() : []
activeFilters.value.showall = useRoute().query.showall == 'true' ? true:false

const signatureFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.signature.length) return { $in: activeFilters.value.signature.map(e=>e.value) }
    return  {}
})

const driverFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.drivers.length) return { $in: activeFilters.value.drivers.map(e=>e.value) }
    return  {}
})


const brandFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.brand.length) return { $in: activeFilters.value.brand.map(e=>e.value) }
    return  {}
})

const indexFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.showall == true) return { $in: [true, false, null] }
    return  { $in: [true] }
})

watch([activeFilters, sortPayload], async () => {
    
    // reste the page when filters or sorting changes
    page.value = 1  

    //erfresh the data
    await refresh()


    data.value = iems.value
    
},{ deep: true })


/***** Products fetching data  *****/


const page = ref(1)
const { data:iems, refresh } = await useAsyncData('iems', () => 


    queryContent('/iems')
    .where({ _partial: false }) // exclude the Partial files

    .where({ 'signature': signatureFilter.value })
    .where({ 'driverTypes': driverFilter.value })
    .where({ 'brand': brandFilter.value })
    
    .where({ 'showInIndex': indexFilter.value })

    .skip(8 * (page.value - 1))
    .limit(8)

    .sort(sortPayload.value)

    .find()
)

// help variable for infinite scroll
const data = ref()
data.value = iems.value

const loadMore = async () => {
    page.value++

    await refresh()

    data.value = [...data.value, ...iems.value]
}

</script>

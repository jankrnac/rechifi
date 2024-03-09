<template>

    <div class="w-full">
        <div>
            <div class="mx-auto max-w-3xl text-center lg:max-w-app">
    
                <!-- Filters -->
                <div class="pb-10 mt-10 lg:mt-16 lg:pb-24">
                    <h1 class="text-3xl lg:text-6xl font-bold tracking-tigh">{{ t('daps') }}</h1>
                    <p class="text-center mx-auto mt-4 max-w-3xl text-lg lg:text-xl">{{t('slogan')}}</p>
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
                
                <template v-for="item in products">
                    <ProductBox :product="item" />
                </template>
            </ul>
        </div>
    
    </div>
    
 </template>
    
    
 <script setup>
    
    useSeoMeta({
        title: 'DAPs - Rechifi',
        description: `Explore the pinnacle of personal audio with our curated list of chi-fi digital audio players. Navigate through our filterable DAPs list to find the perfect blend of technical specifications, 
        sound signature, and price. Dive into detailed reviews and comparisons.`
    })
    
    const { t } = useI18n({
        useScope: 'local'
    })
    
    /***** Data Init  *****/
    
    const { data:brands } = await useFetch('/api/brands')
    
    brands.value.sort((a, b) => {
      const nameA = a.value.toUpperCase(); // ignore upper and lowercase
      const nameB = b.value.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    });
    
    
    
/***** Sorting *****/

const sortOptions = [
    { label: t('name'), value:'name' },
    { label: t('releaseDate'), value: 'releaseDate' },
]
    
const activeSort = useState('activeSort', () => sortOptions[0])

const sortPayload = computed(() => {
    return {
        [activeSort.value.value]:activeSort.valuevalue == 'title' ? -1 : 1
    }
})
    
    watch(sortPayload, async (value) => {
        
        await refresh()
    
    }, { deep: true })
    
    
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
            { value: 'DD', label: 'DD' },
            { value: 'planar', label: 'Planar' },
            { value: 'BA', label: 'BA' },
            { value: 'EST', label: 'EST' },

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
    if (activeFilters.value && activeFilters.value.signature.length) return { $in: activeFilters.value.signature }
    return  {}
})

const driverFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.drivers.length) return { $in: activeFilters.value.drivers }
    return  {}
})


const brandFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.brand.length) return { $in: activeFilters.value.brand }
    return  {}
})

const indexFilter = computed(() => {
    if (activeFilters.value && activeFilters.value.showall == true) return { $in: [true, false, null] }
    return  { $in: [true] }
})

watch(activeFilters, async () => {
    
    await refresh()

    await navigateTo({ 
        path: useRoute().path,
        query: activeFilters.value
    })
},{ deep: true })

    
    
/***** Products fetching data  *****/
    
const { data:products, refresh } = await useAsyncData('daps', () => 

    queryContent('/daps')

    .where({ _partial: false }) // exclude the Partial files

    .where({ 'brand': brandFilter.value })

    .where({ 'showInIndex': indexFilter.value })

    .sort(sortPayload.value)

    .find()
)

    
</script>
    
    
    <i18n lang="yaml">
        en:
         daps: 'Digital audio players'
         sort: 'Sort'
         slogan: All DAPs from asian country manufacturers in one place
         name: 'By name'
         releaseDate: 'Newest first'
        cz:
         headphones: "Sluchátka"
         slogan: Seznam všech slúchatek čínskych výrobců na jednom místě
         sort: 'Seřadit'
    </i18n>
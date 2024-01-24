<template>
<div class="capitalize rounded-xl flex items-center justify-center font-semibold"
    :class="{
        'border-orange-500': driver.type == 'DD',
        'border-green-500 dark:border-green-800': driver.type == 'BA',
        'border-blue-500' : driver .type== 'Planar',
        'border-teal-500' :driver.type == 'EST',
        'text-sm border-4 lg:text-lg' : size == 'normal',
        'px-2 py-1 text-sm border-[3px]' : size == 'small',
    }"
>

    <div class="flex">
        <template v-if="size == 'normal'">
            <div v-if="driver.count > 1" class="bg-green-500 flex items-center" :class="{
                'px-3' : size == 'normal'
            }">
                {{  driver.count }}
            </div>
            <div :class="{
                'px-4 py-2' : size == 'normal'
            }">
                <template v-if="driver.type == 'DD'">Dynamic driver</template>
                <template v-if="driver.type == 'BA'">Balanced armature</template>
            </div>
        </template>
        <template v-else>
            <div v-if="driver.count > 1" class="flex items-center" :class="{
                'px-3' : size == 'normal',
                'mr-0.5' : size == 'small'
            }">
                {{ driver.count }}
            </div>
            <template v-if="driver.type == 'DD'">DD</template>
           <template v-if="driver.type == 'BA'">BA</template>
        </template>
    </div>

</div>

</template>

<script setup>

const slots = useSlots()

const props = defineProps({
    size: {
        default: 'normal'
    },
    driver: {
        type: Object
    },
})

</script>
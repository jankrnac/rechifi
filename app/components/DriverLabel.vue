<template>
<div class="capitalize rounded-lg flex shrink-0 items-center justify-center font-semibold overflow-hidden"
    :class="{
        'border-orange-500 dark:border-orange-800': Object.keys(driver)[0] == 'dd',
        'border-green-500 dark:border-green-800': Object.keys(driver)[0] == 'ba',
        'border-blue-500 dark:border-blue-900' : Object.keys(driver)[0]== 'planar',
        'border-teal-500 dark:border-teal-900' : Object.keys(driver)[0]== 'bc',
        'border-yellow-500 dark:border-yellow-900' : Object.keys(driver)[0]== 'pzt',

        'border-teal-500' :Object.keys(driver)[0] == 'est',
        'border-teal-500' :Object.keys(driver)[0] == 'pr',
        'text-sm border-2 lg:border-[3px] lg:text-lg' : size == 'normal',
        'px-1 py-0.5 md:px-2 md:py-1 text-xs md:text-sm border-[1px] md:border-[2px]' : size == 'small',
    }"
>

    <div class="flex">
        <template v-if="size == 'normal'">
            <div :class="{
                'px-2 py-1 md:px-4 md:py-2' : size == 'normal'
            }">
                <span v-if="Object.values(driver)[0] > 1" class="mr-1">
                {{ Object.values(driver)[0] }}
                </span>
                <span v-if="Object.values(driver)[0] > 1" class="text-sm md:text-base mr-1 text-gray-500">x</span>
                <template v-if="Object.keys(driver)[0] == 'dd'">Dynamic</template>
                <template v-if="Object.keys(driver)[0] == 'ba'">Balanced armature</template>
                <template v-if="Object.keys(driver)[0] == 'est'">Electrostatic</template>
                <template v-if="Object.keys(driver)[0] == 'planar'">Planar</template>
                <template v-if="Object.keys(driver)[0] == 'bc'">Bone Conductor</template>
                <template v-if="Object.keys(driver)[0] == 'pzt'">Piezoelectric</template>
                <template v-if="Object.keys(driver)[0] == 'pr'">+ Passive radiator</template>

            </div>
        </template>
        <template v-else>
            <div v-if="Object.values(driver)[0] > 1" class="flex items-center" :class="{
                'px-3' : size == 'normal',
                'mr-0.5' : size == 'small'
            }">
                {{ Object.values(driver)[0] }}
            </div>
            <template v-if="Object.keys(driver)[0] == 'dd'">DD</template>
            <template v-if="Object.keys(driver)[0] == 'ba'">BA</template>
            <template v-if="Object.keys(driver)[0] == 'est'">EST</template>
            <template v-if="Object.keys(driver)[0] == 'planar'">Planar</template>
            <template v-if="Object.keys(driver)[0] == 'bc'">BC</template>
            <template v-if="Object.keys(driver)[0] == 'pzt'">PZT</template>
            <template v-if="Object.keys(driver)[0] == 'pr'">+ PR</template>


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
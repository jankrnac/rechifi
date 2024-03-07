<template>
<div class="capitalize rounded-lg flex shrink-0 items-center justify-center font-semibold overflow-hidden"
    :class="{
        'border-orange-500': Object.keys(driver)[0] == 'dd',
        'border-green-500 dark:border-green-800': Object.keys(driver)[0] == 'ba',
        'border-blue-500' : Object.keys(driver)[0]== 'planar',
        'border-teal-500' :Object.keys(driver)[0] == 'est',
        'text-sm border-2 lg:border-[3px] lg:text-lg' : size == 'normal',
        'px-2 py-1 text-sm border-[2px]' : size == 'small',
    }"
>

    <div class="flex">
        <template v-if="size == 'normal'">
            <div :class="{
                'px-4 py-2' : size == 'normal'
            }">
                <span v-if="Object.values(driver)[0] > 1" class="mr-2">
                {{ Object.values(driver)[0] }}
                </span>
                <template v-if="Object.keys(driver)[0] == 'dd'">Dynamic driver</template>
                <template v-if="Object.keys(driver)[0] == 'ba'">Balanced armature</template>
                <template v-if="Object.keys(driver)[0] == 'est'">Electrostatic driver</template>
                <template v-if="Object.keys(driver)[0] == 'planar'">Planar</template>

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
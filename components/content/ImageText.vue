<template>
    <div class="my-16 block md:flex items-center overflow-hidden w-full gap-12" :class="{'flex-row-reverse':reversed}">

        <!-- Left -->
        <div class="basis-2/4 rounded-xl overflow-hidden mb-6 md:mb-0">
            <nuxt-img :src="image" class="max-w-full max-h-full" />
        </div>

        <!-- Right -->
        <div class="basis-2/4"><ContentSlot :use="$slots.default" unwrap="p"/></div>
    </div>
</template>

<script setup>

    defineProps(['image', 'reversed'])

</script>
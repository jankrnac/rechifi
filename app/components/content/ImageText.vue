<template>
<div class="max-w-app mx-auto">
    <div class="my-16 block md:flex items-center overflow-hidden w-full gap-24" :class="{'flex-row-reverse':reversed}">

        <!-- Left -->
        <div class="basis-1/3 flex-1 rounded-xl overflow-hidden mb-6 md:mb-0 flex justify-center">
            <nuxt-img :src="image" class="max-w-full max-h-full rounded-xl" format='webp' densities="x1" />
        </div>

        <!-- Right -->
        <div class="basis-2/3 flex-1"><ContentSlot :use="$slots.default" /></div>
    </div>
</div>
</template>

<script setup>

    defineProps(['image', 'reversed'])

</script>
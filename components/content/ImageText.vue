<template>
<div class="max-w-[1200px] mx-auto">
    <div class="my-16 block md:flex justify-evenly items-center overflow-hidden w-full gap-12" :class="{'flex-row-reverse':reversed}">

        <!-- Left -->
        <div class="flex-1 rounded-xl overflow-hidden mb-6 md:mb-0 flex justify-center">
            <nuxt-img :src="image" class="max-w-full max-h-full rounded-xl" width="500" height="500"/>
        </div>

        <!-- Right -->
        <div class="flex-1"><ContentSlot :use="$slots.default" /></div>
    </div>
</div>
</template>

<script setup>

    defineProps(['image', 'reversed'])

</script>
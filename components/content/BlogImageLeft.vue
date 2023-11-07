<template>
    <div class="my-16 block md:flex items-start overflow-hidden w-full gap-12">
        <div class="basis-2/4 rounded-xl overflow-hidden mb-6 md:mb-0"><nuxt-img :src="src" class="w-full max-h-full max-w-full" /></div>
        <div class="basis-2/4"><ContentSlot :use="$slots.default" unwrap="p"/></div>
    </div>
</template>

<script setup>

    defineProps(['src'])

</script>
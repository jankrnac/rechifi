<template>

    <div class="flex flex-col items-center max-w-[1200px] mx-auto leading-loose">

        <h1 class="text-6xl font-playfair mt-16">
            <ContentSlot :use="$slots.title" unwrap="p"/>
        </h1>

        <time class="mb-8 mt-4 italic text-gray-400">{{ data.date }}</time>

        <div class="mb-8 flex flex-col justify-center items-center bg-gray-100 py-5 px-12 rounded-xl relative hover:bg-blue-100 transition">
            <div class="font-semibold">Original article</div>
            <a class="absolute inset-0" href="https://www.head-fi.org/showcase/letshuoer-s12-planar-iem.25649/reviews"></a>
            <div>https://www.head-fi.org/showcase/letshuoer-s12-planar-iem.25649/reviews</div>
        </div>

        <ContentSlot :use="$slots.content" unwrap="div"/>

    </div>

</template>

<script setup>

const { data } = await useAsyncData(() => queryContent().findOne());

</script>
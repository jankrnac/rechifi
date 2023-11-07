<template>

    <div class="flex flex-col items-center max-w-[1200px] mx-auto leading-loose">
        <h1 class="text-6xl font-playfair my-16">
            <ContentSlot :use="$slots.title" unwrap="p"/>
        </h1>
        
        <ContentSlot :use="$slots.content" unwrap="div"/>

    </div>

</template>
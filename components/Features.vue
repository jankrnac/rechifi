<template>

<div class="w-full max-w-app mb-24">

    <div class="flex justify-center md:justify-start mb-8">
		<h2 class="text-xl font-bold">Features</h2>
	</div>

    <ul class="">
        <li v-for="feature in features" class="flex items-center">
            <IconsWave class="w-4 h-4 mr-2 text-gray-400" />
            {{ feature }}
        </li>
    </ul>
</div>

</template>

<script setup>

defineProps({
    features: {
        type: Array
    }
})

</script>
<template>

<div class="flex flex-col items-center justify-center mb-24">
		<h2 class="text-xl font-bold mb-6">User rating</h2>

		<template v-if="rating">
			<client-only>
			<ve-progress 
				:progress="rating" 
				:size="150"
				font-size="2.5rem"
				:thickness="7"
				:empty-thickness="8"
				empty-line-mode="out"
				line-mode="out 5"
				dash="10 2"
				color="#88bedf"
				:legend-formatter="({ currentValue }) => `<span class='font-bold text-gray-700 dark:text-gray-200'>${currentValue}</span>`"
			/>
			</client-only>
		</template>

		<template v-else>
			No reviews with rating yet
		</template>
    </div>
</template>

<script setup>

defineProps(['rating'])

</script>
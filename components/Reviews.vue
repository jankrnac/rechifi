<template>

<div class="w-full">
	<ul class="grid grid-cols-4 gap-5">
		<li  v-for="review in reviews" class="relative flex flex-col items-center justify-center bg-gray-100/50 p-5 rounded-xl border hover:border-gray-200 transition border-transparent">
			<div class="flex justify-center items-center">
				<div class="text-5xl font-bold">{{  review.score  }}</div>
				<div class="text-base font-bold mt-5 text-gray-500">/10</div>

			</div>

			<div class="mt-4 text-base">{{ review.reviewer }}</div>

			<div class="mt-4 text-sm line-clamp-4">{{ review.description }}</div>

			<a :href="review.link" target="_blank" class="absolute inset-0"></a>
		</li>
	</ul>
</div>

</template>

<script setup>

const { t } = useI18n({
    useScope: 'local'
})

defineProps(['reviews'])
  
</script>

<i18n lang="yaml">
    en:
     reviews: 'Reviews'
    cz:
     reviews: 'Recenze'

</i18n>
<template>

<div>
	<ul v-for="review in reviews">
		<li class="flex flex-col items-center justify-center">
			<div class="flex justify-center items-center w-40 h-40 border-[12px] rounded-full">
				<div class="text-xl font-bold">{{  review.score  }}</div>
			</div>

			<div class="mt-4 text-lg font-semibold">{{ review.reviewer }}</div>
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
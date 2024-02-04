<template>

    <div class="flex flex-col items-center justify-center">
        <h3 class="text-2xl font-thin mb-4">User rating</h3>

    <client-only>
      <ve-progress 
	  	:progress="84" 
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
    </div>
</template>
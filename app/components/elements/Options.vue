<template>

<div>
    <UPopover>

        <UButton icon="i-ph-gear" color="sky" />
		
		<template #panel>
			<div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                	<div class="relative bg-white p-2 text-gray-800 text-left flex flex-col items-start space-y-5">
						<div v-for="[key, value] of Object.entries(options)">
							<component 
								:is="componentsMap[key]" 
								:model="key"
								:element="element"
								:options="options"
								@change="changed"
							/>
						</div>
						
                    	<UButton v-if="element.type != 'title'" color="red" size="xs" icon="i-ph-x" @click="$emit('delete')">
                        	Delete
						</UButton>
					</div>
				</div>
			</template>
	</UPopover>
</div>
</template>
  
<script setup>

const props = defineProps({
	element: {
		type: Object
	},
	options: {
		type: Object 
	}
})

const emits = defineEmits(['change','delete'])
const changed = (data) => {
	emits('change', data)
}

const componentsMap = {


}

  
</script>
  
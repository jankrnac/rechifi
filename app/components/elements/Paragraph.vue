<template>
	<div class="text-left">

		<bubble-menu
     		:editor="editor"
      		:tippy-options="{ duration: 100 }"
      		v-if="editor"
			class="flex gap-0.5"
    	>
			<UButton @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :variant="editor.isActive('heading') ? 'solid' : 'soft' ">
				<UIcon name="i-ph-text-h" />
			</UButton>
			<UButton @click="editor.chain().focus().toggleBold().run()" :variant="editor.isActive('bold') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-b" />
			</UButton>
			<UButton  @click="editor.chain().focus().toggleItalic().run()" :variant="editor.isActive('italic') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-italic" />
			</UButton>
			<UButton  @click="editor.chain().focus().toggleStrike().run()" :variant="editor.isActive('strike') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-strikethrough" />
			</UButton>

			<UButton  @click="editor.chain().focus().setTextAlign('left').run()" :variant="editor.isActive('strike') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-align-left" />
			</UButton>

			<UButton  @click="editor.chain().focus().setTextAlign('center').run()" :variant="editor.isActive('strike') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-align-center" />
			</UButton>
			
			<UButton  @click="editor.chain().focus().setTextAlign('right').run()" :variant="editor.isActive('strike') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-align-right" />
			</UButton>
			
			<UButton  @click="editor.chain().focus().setTextAlign('justify').run()" :variant="editor.isActive('strike') ? 'solid' : 'soft'">
				<UIcon name="i-ph-text-align-justify" />
			</UButton>

    	</bubble-menu>

		<editor-content v-if="editable" :editor="editor" spellcheck="false" />
		<div v-else v-html="element.data.text"></div>
	</div>
</template>

<script setup>

import { useEditor, EditorContent, BubbleMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'

	const props = defineProps({
		element: {
			type: Object
		},
		editable: {
			type: Boolean,
			default: false
		},
		dragging: {
			type: Boolean,
			default: false
		}
	})



	const editor = useEditor({
		content: props.element.data.text,
		extensions: [
			BubbleMenu,
			TextAlign.configure({
				types: ['paragraph'],
			}),
			StarterKit,
		],
		onUpdate({ editor }) {
			emits('change', {
				type: 'text',
				value: editor.getHTML()
			})
		},
		editorProps: {
			attributes: {
				class: 'focus:outline-none',
			},
		},
		editable: props.editable,
	})

	// watch the dragging props, if true, disable the editable conntent
	// this is the workaround for buf of duplicating content when dragging ends
	watch(() => props.dragging, (value) => {
		editor.value.setEditable(!value)
	})

	const emits = defineEmits(['change'])

	watch(() => props.editable, (value) => {
		editor.value.setOptions({editable: value});
	})

</script>

<style scoped>
 
:deep() h2{
	@apply text-3xl mb-4;
}

</style>
<template>
	<div class="text-left">

		<bubble-menu
     		:editor="editor"
      		:tippy-options="{ duration: 100 }"
      		v-if="editor"
			class="flex gap-0.5"
    	>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="{ 'is-active': editor.isActive('heading') }">
				<UIcon name="i-ph-text-h" />
			</button>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
				<UIcon name="i-ph-text-b" />
			</button>
			<button  class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
				<UIcon name="i-ph-text-italic" />
			</button>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
				<UIcon name="i-ph-text-strikethrough" />
			</button>

			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<UIcon name="i-ph-text-align-left" />
			</button>

			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<UIcon name="i-ph-text-align-center" />
			</button>
			
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<UIcon name="i-ph-text-align-right" />
			</button>
			
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<UIcon name="i-ph-text-align-justify" />
			</button>

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
			StarterKit.configure({
				paragraph: {
					HTMLAttributes:{
						class: 'lg:text-lg outline-none border-none'
					}
				}
			}),
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


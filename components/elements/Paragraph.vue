<template>
	<div class="text-left">
		<bubble-menu
     		:editor="editor"
      		:tippy-options="{ duration: 100 }"
      		v-if="editor"
			class="flex gap-0.5"
    	>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
				<IconsBold />
			</button>
			<button  class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M204,56a12,12,0,0,1-12,12H160.65l-40,120H144a12,12,0,0,1,0,24H64a12,12,0,0,1,0-24H95.35l40-120H112a12,12,0,0,1,0-24h80A12,12,0,0,1,204,56Z"></path></svg>
			</button>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
			</button>

			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<IconsAlignLeft />
			</button>

			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<IconsAlignCenter />
			</button>
			
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<IconsAlignRight />
			</button>
			
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('justify').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M28,64A12,12,0,0,1,40,52H216a12,12,0,0,1,0,24H40A12,12,0,0,1,28,64ZM216,92H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,40H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,40H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>
			</button>

    	</bubble-menu>

		<editor-content :editor="editor" />
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
						class: 'text-lg outline-none border-none'
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

	const emits = defineEmits(['change'])

	watch(() => props.editable, (value) => {
		editor.value.setOptions({editable: value});
	})

</script>


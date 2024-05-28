<template>
	<div class="text-left">

		<bubble-menu
     		:editor="editor"
      		:tippy-options="{ duration: 100 }"
      		v-if="editor"
			class="flex gap-0.5"
    	>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleHeading({ level: 1 }).run()" :class="{ 'is-active': editor.isActive('heading') }">
				<IconsHeading />
			</button>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
				<IconsBold />
			</button>
			<button  class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
				<IconsItalic />
			</button>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
				<IconsStrike />
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

		<editor-content v-if="editable" :editor="editor" dis/>
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


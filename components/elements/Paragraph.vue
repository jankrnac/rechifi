<template>
	<div class="text-left">
		<bubble-menu
     		:editor="editor"
      		:tippy-options="{ duration: 100 }"
      		v-if="editor"
			class="flex gap-0.5"
    	>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleBold().run()" :class="{ 'is-active': editor.isActive('bold') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M177.08,114.46A48,48,0,0,0,140,36H72A12,12,0,0,0,60,48V200a12,12,0,0,0,12,12h80a52,52,0,0,0,25.08-97.54ZM84,60h56a24,24,0,0,1,0,48H84Zm68,128H84V132h68a28,28,0,0,1,0,56Z"></path></svg>
			</button>
			<button  class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl" @click="editor.chain().focus().toggleItalic().run()" :class="{ 'is-active': editor.isActive('italic') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M204,56a12,12,0,0,1-12,12H160.65l-40,120H144a12,12,0,0,1,0,24H64a12,12,0,0,1,0-24H95.35l40-120H112a12,12,0,0,1,0-24h80A12,12,0,0,1,204,56Z"></path></svg>
			</button>
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().toggleStrike().run()" :class="{ 'is-active': editor.isActive('strike') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M228,128a12,12,0,0,1-12,12H185.86A41.48,41.48,0,0,1,196,168c0,14.45-7.81,28.32-21.43,38.05C162,215.05,145.44,220,128,220s-34-4.95-46.57-13.95C67.81,196.32,60,182.45,60,168a12,12,0,0,1,24,0c0,15.18,20.15,28,44,28s44-12.82,44-28c0-12.76-9.3-20.18-35.35-28H40a12,12,0,0,1,0-24H216A12,12,0,0,1,228,128ZM75.11,100a12,12,0,0,0,12-12c0-16,17.58-28,40.89-28,17.36,0,31.37,6.65,37.48,17.78a12,12,0,0,0,21-11.56C176.13,47.3,154.25,36,128,36,91,36,63.11,58.35,63.11,88A12,12,0,0,0,75.11,100Z"></path></svg>
			</button>

			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('left').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M28,64A12,12,0,0,1,40,52H216a12,12,0,0,1,0,24H40A12,12,0,0,1,28,64Zm12,52H168a12,12,0,0,0,0-24H40a12,12,0,0,0,0,24Zm176,16H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm-48,40H40a12,12,0,0,0,0,24H168a12,12,0,0,0,0-24Z"></path></svg>
			</button>

			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('center').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M28,64A12,12,0,0,1,40,52H216a12,12,0,0,1,0,24H40A12,12,0,0,1,28,64ZM64,92a12,12,0,0,0,0,24H192a12,12,0,0,0,0-24Zm152,40H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm-24,40H64a12,12,0,0,0,0,24H192a12,12,0,0,0,0-24Z"></path></svg>
			</button>
			
			<button class="border border-gray-500 bg-white rounded px-3 py-2 text-sm shadow-xl"  @click="editor.chain().focus().setTextAlign('right').run()" :class="{ 'is-active': editor.isActive('strike') }">
				<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#000000" viewBox="0 0 256 256"><path d="M28,64A12,12,0,0,1,40,52H216a12,12,0,0,1,0,24H40A12,12,0,0,1,28,64ZM216,92H88a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,40H40a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Zm0,40H88a12,12,0,0,0,0,24H216a12,12,0,0,0,0-24Z"></path></svg>
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
	})

	const emits = defineEmits(['change'])


</script>


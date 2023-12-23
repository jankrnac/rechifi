<template>
    <div>
      <Popover v-slot="{ open }" class="relative">
        <PopoverButton class="group inline-flex items-center rounded-r-md bg-blue-300 px-3 py-4 text-sm focus:outline-none 
		text-gray-600 [writing-mode:vertical-lr] [text-orientation:upright] hover:bg-blue-400 transition hover:text-white">
          <span class="font-bold">ADD</span>
        </PopoverButton>
  
        <transition
          enter-active-class="transition duration-200 ease-out"
          enter-from-class="translate-y-1 opacity-0"
          enter-to-class="translate-y-0 opacity-100"
          leave-active-class="transition duration-150 ease-in"
          leave-from-class="translate-y-0 opacity-100"
          leave-to-class="translate-y-1 opacity-0"
        >
          <PopoverPanel
            class="absolute z-10 w-screen max-w-[350px] left-14 top-0 transform px-4 sm:px-0"
          >
            <div class="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                <div class="relative bg-white p-7">
                    <draggable
                        class="list-group"
                        :list="elements"
                        :group="{name: 'elements', pull: 'clone', put:'false'}"
                        itemKey="id"
                        :clone="cloneElement"

                    >
                        <template #item="{ element, index }">
                            <div class="cursor-move border-dashed border border-gray-300 bg-white py-3 px-4 mb-1 rounded hover:bg-gray-50 hover:border-solid">{{ element.caption }}</div>
                        </template>
                    </draggable>
                </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>
</template>
  
<script setup>

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
import draggable from "vuedraggable";


const { data:elements } = await useFetch('/api/elements')

const cloneElement = ({id, type, caption, data}) => {
    return{
        id: 'new'+id,
        type: type,
        caption: caption,
        data: data

    }
}
  
</script>
  
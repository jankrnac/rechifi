<template>
    <div>
      <Popover v-slot="{ open }" class="relative">
        <PopoverButton class="group inline-flex items-center rounded-md bg-blue-300 px-3 py-2 text-sm focus:outline-none">
          <span>Add elements</span>
          <IconsCaretDown
            class="ml-2 h-4 w-4"
            aria-hidden="true"
          />
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
            class="absolute left-1/2 z-10 mt-3 w-screen max-w-[350px] -translate-x-1/2 transform px-4 sm:px-0"
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
                            <div class="cursor-move border-dashed border border-gray-300 bg-white py-3 px-4 mb-1 rounded-sm">{{ element.caption }}</div>
                        </template>
                    </draggable>
                </div>
            </div>
          </PopoverPanel>
        </transition>
      </Popover>
    </div>
</template>
  
<script setup lang="ts">

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
  
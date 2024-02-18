<template>

<div class="flex flex-col items-center justify-center">
    <h1 class="text-3xl lg:text-6xl my-4 lg:mt-16 lg:mb-6">
        <span class="font-playfair">My </span>
        <span class="font-bold">reviews</span> 
    </h1>
    
    <Wave />

    <div class="mx-auto lg:mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-app lg:grid-cols-4">
        <div v-for="review in reviews" class="relative">

            <ReviewBox :review="review" />

            <!-- Review Options -->
            <div class="absolute top-12 right-3 z-[1]">
                <Button size="small" color="red" class="absolute" @click="deleteReview(review.id)">Delete</Button>
            </div>
        </div>
    </div>

    <TransitionRoot appear :show="isOpen" as="template">
    <Dialog as="div" @close="closeModal" class="relative z-10">
      <TransitionChild
        as="template"
        enter="duration-300 ease-out"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="duration-200 ease-in"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black/25" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div
          class="flex min-h-full items-center justify-center p-4 text-center"
        >
          <TransitionChild
            as="template"
            enter="duration-300 ease-out"
            enter-from="opacity-0 scale-95"
            enter-to="opacity-100 scale-100"
            leave="duration-200 ease-in"
            leave-from="opacity-100 scale-100"
            leave-to="opacity-0 scale-95"
          >
            <DialogPanel
              class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
            >
              <DialogTitle
                as="h3"
                class="text-lg font-medium leading-6 text-gray-900"
              >
                Delete review?
              </DialogTitle>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Your review will be deleted permanently. Are you sure you want to do it?
                </p>
              </div>

              <div class="mt-4">
                  <Button color="red" @click="confirmDelete">Delete</Button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>


</div>

</template>

<script setup>

import { TransitionRoot, TransitionChild, Dialog, DialogPanel, DialogTitle } from '@headlessui/vue'

definePageMeta({
    middleware: 'auth'
});


const user = useSupabaseUser()
const client = useSupabaseClient()

const { data:reviews } = await useAsyncData('reviews', async () => {
    const { data } = await client.from('reviews').select(`id, model, brand, slug, cover, published, created_at, type, profiles (username)`).eq('profile_id', user.value.id).order('created_at')

    return data
})

const deletedReviewId = ref()

const deleteReview = (id) => {
    openModal()

    deletedReviewId.value = id
}

const confirmDelete = async () => {

    await client.from('reviews').delete().eq('id', deletedReviewId.value)

    reviews.value.splice(reviews.value.findIndex(e => e.id ===  deletedReviewId.value), 1)

    closeModal()
}


const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}
function openModal() {
  isOpen.value = true
}


</script>
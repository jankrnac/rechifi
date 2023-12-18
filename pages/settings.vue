<template>

    <div class="flex flex-col flex-grow dark:bg-gray-800">
        
    
        <div class="space-y-10 divide-y divide-gray-900/10 max-w-7xl mx-auto lg:px-8 mt-16 px-4">
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                </div>
    
                <form @submit.prevent="submitProfileForm" class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
    
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Name</label>
                                <input type="text" name="name" id="name" class="input" v-model="profile.name"/>
                            </div>
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                <input type="text" name="email" id="email" class="input" :value="user.email" :disabled="true" />
                            </div>
    
                            <div class="col-span-full">
                                <label for="photo" class="block text-sm font-medium leading-6 text-gray-900">Avatar</label>
                                <div class="mt-2 flex items-center gap-x-3">
                                    <div v-if="profile.avatar" class="w-14 h-14"><img :src="avatar" class="rounded-full max-h-full max-w-full"/></div>
                                    <div v-else class="i-ph-user-circle-duotone text-gray-500 text-5xl" aria-hidden="true" />
                                    <UploadSingle @cropped="setAvatar" :aspectRatio="1">
                                    <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                    </UploadSingle>
                                </div>
                            </div>
    
                          </div>
                    </div>
    
                    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <TheButton>Save</TheButton>
                    </div>
    
                  </form>
            </div>
    
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
                  <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Site settings</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">Application settings like color scheme, language, etc.</p>
                  </div>
    
            
            </div>
        </div>
    </div>
    </template>
    
<script setup>
    
    definePageMeta({
        middleware: "auth"
    });

    const user = useSupabaseUser()

    const { data:profile } = useFetch('/api/users/' + user.value.id)

    const preview = ref()

    const avatar = computed(() => {
        if(preview.value) return preview.value
        if(user.avatar) return user.avatar
        return false
    })
    
    const setAvatar = (data) => {
        preview.value = data.url
    
        data.formData.append('disk', 'local')
        data.formData.append('inline', true)
    
        auth.value.user.upload = data.formData
    }
    
    
    const submitProfileForm = async () => {
    
        if (preview.value)
        {
            const { data:response } = await useApiFetch(`upload`, {
                method: "POST", 
                body: auth.value.user.upload
            })
    
            auth.value.user.avatarFileName = response
        }
    
    
        execute()
    }
    
    
    </script>
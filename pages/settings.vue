<template>
    
    <div class="flex flex-col flex-grow dark:bg-gray-800 mb-24">
            
        <div class="space-y-10 max-w-7xl mx-auto lg:px-8 mt-16 px-4">

            <!-- Profile -->
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>
                </div>
                
                <form @submit.prevent="submitProfileForm" class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
    
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">Username</label>
                                <input type="text" name="username" id="name" class="border rounded px-4 py-2 w-full" :class="[usernameValid ? '':'bg-red-200']" v-model="profile.username"/>
                                <div v-if="!usernameValid" class="text-xs mt-1">Username already taken</div>
                            </div>

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">Name</label>
                                <input type="text" name="name" id="username" class="border rounded px-4 py-2 w-full" v-model="profile.name"/>
                            </div>
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">Email</label>
                                <input type="text" name="email" id="email" class="border rounded px-4 py-2 w-full" :value="user.email" :disabled="true" />
                            </div>
    
                            <div class="col-span-full">
                                <label class="block text-sm font-semibold leading-6 text-gray-700 mb-1">Avatar</label>
                                <div class="mt-2 flex items-center gap-x-3">
                                    <div v-if="profile.avatar" class="w-14 h-14"><img :src="avatar" class="rounded-full max-h-full max-w-full"/></div>
                                    <IconsUser v-else class="w-8 h-8" aria-hidden="true" />
                                    <UploadSingle @cropped="setAvatar" :aspectRatio="1">
                                    <button type="button" class="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                    </UploadSingle>
                                </div>
                            </div>
    
                          </div>
                    </div>
    
                    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <Button :disabled="!usernameValid" color="green" :loading="pending" class="disabled:opacity-50">Save</Button>
                    </div>
    
                  </form>
            </div>

              <!-- Gear -->
              <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7 text-gray-900">Owned audio gear</h2>
                    <p class="mt-1 text-sm leading-6 text-gray-600">Share with us, what audio devices you have or currently using</p>
                </div>
                
                <form @submit.prevent="submitSetupForm" class="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
    
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">IEM</label>
                                <ModelCombobox v-model="iem" model="iem" />
                            </div>

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">DAP</label>
                                <ModelCombobox v-model="dap" model="dap" />
                            </div>
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">DAC</label>
                                <ModelCombobox  v-model="dac" model="dac" />
                            </div>
    
                            <div class="col-span-full">
                                <label class="block text-sm font-semibold leading-6 text-gray-700 mb-1">Other, tips, cable, etc</label>
                                <div class="mt-2 flex items-center gap-x-3">
                                    <textarea class="w-full border rounded p-2" rows="4"></textarea>
                                </div>
                            </div>
    
                          </div>
                    </div>
    
                    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <Button color="green" :loading="pending" class="disabled:opacity-50">Save</Button>
                    </div>
    
                  </form>
            </div>
    
        </div>

        
    </div>
    </template>
    
<script setup>
    
    definePageMeta({
        middleware: "auth"
    });

    const user = useSupabaseUser()
    const client = useSupabaseClient()

    const { data:profile } = await useFetch('/api/users/' + user.value.id)

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
    
    const pending = ref(false)
    
    const submitProfileForm = async () => {
        pending.value = true
        if (preview.value)
        {
            const { data:response } = await useFetch(`upload`, {
                method: "POST", 
                body: auth.value.user.upload
            })
    
            auth.value.user.avatarFileName = response
        }
    
    
        await client.from('profiles')
            .update({
                username: profile.value.username,
                name: profile.value.name
            })
            .eq('id', user.value.id)

        pending.value = false
    }
    
    const usernameValid = ref(true)

    watch(() => profile.value.username, async (value) => {
        const { data } = await client.from('profiles').select().neq('id', profile.value.id).eq('username',value)

        usernameValid.value = !data.length
    })

    const { data:iem } = await useAsyncData(() =>  
    {   
        if(profile.value.iem)
        {
            return queryContent(profile.value.iem).findOne()
        }
    })
    const { data:dap } = await useAsyncData(() =>  
    {   
        if(profile.value.dap)
        {
            return queryContent(profile.value.dap).findOne()
        }
    })

    const { data:dac } = await useAsyncData(() =>  
    {   
        if(profile.value.dac)
        {
            return queryContent(profile.value.dac).findOne()
        }
    })

    const submitSetupForm = async () => {
        pending.value = true
    
        await client.from('profiles')
            .update({
                iem: iem.value._path,
                dap: dap.value._path,
                dac: dac.value._path,
                name: profile.value.name
            })
            .eq('id', user.value.id)

        pending.value = false
    }

</script>
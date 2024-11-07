<template>
    
    <div class="flex flex-col flex-grow mb-24">
            
        <div class="space-y-10 max-w-7xl mx-auto lg:px-8 mt-16 px-4">

            <!-- Profile -->
            <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7">Profile</h2>
                    <p class="mt-1 text-sm leading-6">This information will be displayed publicly so be careful what you share.</p>
                </div>
                
                <form @submit.prevent="submitProfileForm" class="dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
    
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 mb-1">Username</label>
                                <UInput name="username" id="name" size="xl" :class="[usernameValid ? '':'bg-red-200']" v-model="profile.username" @change="checkUsername"/>
                                <div v-if="!usernameValid" class="text-xs mt-1">Username already taken</div>
                            </div>

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 mb-1">Name</label>
                                <UInput type="text" name="name" id="username" size="xl" v-model="profile.name"/>
                            </div>
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 mb-1">Email</label>
                                <UInput name="email" id="email" size="xl" v-model="profile.email" :disabled="true" />
                            </div>
    
                            <div class="col-span-full">
                                <label class="block text-sm font-semibold leading-6 mb-1">Avatar</label>
                                <div class="mt-2 flex items-center gap-x-3">

                                    <div v-if="avatar" class="flex w-24 h-24 rounded-full overflow-hidden">
                                        <nuxt-img :src="avatar" densities="x1" sizes="200px md:300px lg:351px" class="min-h-full min-w-full flex-shrink-0 object-cover" />
                                    </div>

                                    <UIcon v-else name="i-ph-user" class="w-8 h-8" aria-hidden="true" />

                                    <UploadSingle @uploaded="setAvatar" :aspectRatio="1">
                                        <button type="button" class="rounded-md px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change</button>
                                    </UploadSingle>

                                </div>
                            </div>
    
                          </div>
                    </div>
    
                    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <UButton type="submit" :disabled="!usernameValid" color="green" :loading="pending" class="disabled:opacity-50">Save</UButton>
                    </div>
    
                  </form>
            </div>

              <!-- Gear -->
              <div class="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
                <div class="px-4 sm:px-0">
                    <h2 class="text-base font-semibold leading-7">Owned audio gear</h2>
                    <p class="mt-1 text-sm leading-6">Share with us, what audio devices you have or currently using</p>
                </div>
                
                <form @submit.prevent="submitSetupForm"  class="dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 dark:ring-gray-700 sm:rounded-xl md:col-span-2">
                    <div class="px-4 py-6 sm:p-8">
    
                        <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 mb-1">IEMs</label>
                                <ul class="mb-3">
                                    <li v-for="ownedIem in iems" class="flex items-center gap-2">  
                                        <div>{{ ownedIem?.brand + " " + ownedIem?.model }}</div>
                                        <UIcon name="i-ph-x" class="w-4 h-4 text-red-600 cursor-pointer" @click="removeIEM(ownedIem)" />
                                    </li>
                                </ul>

                                <div class="flex items-center gap-2">
                                    <USelectMenu
                                        v-model="iems"
                                        size="xl"
                                        searchable
                                        multiple
                                        searchable-placeholder="Search an IEM..."
                                        class="w-full"
                                        placeholder="Select an IEM"
                                        :options="allIEMs"
                                        :search-attributes="['model', 'brand']"
                                    >

                                        <template #option="{ option }">
                                            <span class="capitalize">{{ option.brand + ' ' + option.model }}</span>
                                        </template>

                                    </USelectMenu>
                                </div>
                            </div>

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 mb-1">DAP(s)</label>
                                <ul class="mb-3">
                                    <li v-for="ownedDap in daps" class="flex items-center gap-2">  
                                        <div>{{ ownedDap.brand + " " + ownedDap.model }}</div>
                                        <UIcon name="i-ph-x" class="w-4 h-4 text-red-600 cursor-pointer" @click="removeDAP(ownedDap)" />
                                    </li>
                                </ul>
                                <div class="flex items-center gap-2">

                                    <USelectMenu
                                        v-model="daps"
                                        size="xl"
                                        searchable
                                        multiple
                                        searchable-placeholder="Search an DAP..."
                                        class="w-full"
                                        placeholder="Select an DAP"
                                        :options="allDAPs"
                                        :search-attributes="['model', 'brand']"
                                    >

                                        <template #option="{ option }">
                                            {{ option.brand + ' ' + option.model }}
                                        </template>

                                    </USelectMenu>

                                </div>
                            </div>
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 mb-1">DAC(s)</label>
                                <ul class="mb-3">
                                    <li v-for="ownedDac in dacs" class="flex items-center gap-2">  
                                        <div>{{ ownedDac.brand + " " + ownedDac.model  }}</div>
                                        <UIcon name="i-ph-x" class="w-4 h-4 text-red-600 cursor-pointer" @click="removeDAC(ownedDac)" />
                                    </li>
                                </ul>
                                <div class="flex items-center gap-2">
                                    <USelectMenu
                                        v-model="dacs"
                                        size="xl"
                                        searchable
                                        multiple
                                        searchable-placeholder="Search an DAC..."
                                        class="w-full"
                                        placeholder="Select an DAC"
                                        :options="allDACs"
                                        :search-attributes="['model', 'brand']"
                                    >

                                        <template #option="{ option }">
                                            {{ option.brand + ' ' + option.model }}
                                        </template>

                                    </USelectMenu>
                                </div>                            
                            </div>
    
                            <div class="col-span-full">
                                <label class="block text-sm font-semibold leading-6 mb-1">Other, tips, cable, etc</label>
                                <div class="mt-2 flex items-center gap-x-3">
                                    <UTextarea class="w-full" :rows="4"></UTextarea>
                                </div>
                            </div>
    
                          </div>
                    </div>
    
                    <div class="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
                          <UButton color="green" type="submit" :loading="pending2" class="disabled:opacity-50">Save</UButton>
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

    const { user, fetch:fetchSession } = useUserSession()

    const { data:profile } = await useFetch('/api/users/' + user.value.id)

    const preview = ref()

    const avatar = computed(() => {
        if(preview.value) return preview.value
        if(profile.value.avatar) return profile.value.avatar.filename
        return false
    })
    
    const setAvatar = (data) => {
        preview.value = data.blob
    
        data.form.append('disk', 'local')
        data.form.append('inline', true)
    
        profile.value.upload = data.form
    }
    
    const pending = ref(false)
    
    const submitProfileForm = async () => {
        
        let bodyPayload = {
            username: profile.value.username
        }

        
        pending.value = true

        // if changing avatar
        if (preview.value)
        {

            // upload the file
            const uploadResult = await $fetch(`/api/files/blob`, {
                method: "POST", 
                body: profile.value.upload
            })
    
             // Save the file to DB
             const file = await $fetch('/api/files/', {
                method: "POST",
                body: {
                    filename: uploadResult[0].pathname,
                }
            })

            if (profile.value.avatar)
            {
                await $fetch('/api/files/blob/' + profile.value.avatar.filename, {
                    method: "DELETE"
                })
            }

            profile.value.avatarId = file.id

            bodyPayload['filename'] = uploadResult[0].pathname
            bodyPayload['avatar'] = {
                filename: uploadResult[0].pathname
            }

        }
        
        let usernamePayload
        if (profile.value.username == profile.value.email)
        {
            usernamePayload = profile.value.username
        }
        else
        {
            usernamePayload = useSlug(profile.value.username)
        }
    
        await $fetch('/api/users/' + user.value.id, {
            method: "PUT",
            body: {
                username: usernamePayload,
                name: profile.value.name,
                avatarId: profile.value.avatarId
            }
        })  


        await $fetch('/api/auth', {
            method: "PUT",
            body: bodyPayload
        })

        fetchSession()

        pending.value = false
    }
    
    const usernameValid = ref(true)

    const checkUsername = async () => {
        const { data:check } = await useFetch('/api/users/checkusername/' + profile.value.username)

        usernameValid.value = !check.value.length
    }


    const { data:allIEMs } = await useFetch('/api/products/iems')
    const { data:allDAPs } = await useFetch('/api/products/daps')
    const { data:allDACs } = await useFetch('/api/products/dacs')

    const iems = ref(profile.value.usersToProducts.map(e=>e.product).filter(e=>e.type == 'iems'))
    const daps = ref(profile.value.usersToProducts.map(e=>e.product).filter(e=>e.type == 'daps'))
    const dacs = ref(profile.value.usersToProducts.map(e=>e.product).filter(e=>e.type == 'dacs'))

    const removeIEM = (data) => 
    {
        iems.value.splice(iems.value.findIndex(e => e.id == data.id), 1)
    }

    const removeDAP = (data) => 
    {
        daps.value.splice(daps.value.findIndex(e => e.id == data.id), 1)
    }
    
    const removeDAC = (data) => 
    {
        dacs.value.splice(dacs.value.findIndex(e => e.id == data.id), 1)
    }

    const pending2 = ref(false)

    const submitSetupForm = async () => {

        pending2.value = true
         
        await $fetch('/api/users/' + user.value.id + '/products', {
            method: "PUT",
            body: {
                products: iems.value.concat(daps.value, dacs.value),
            }
        }) 

        pending2.value = false
    }

</script>
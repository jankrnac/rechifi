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
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">IEMs</label>
                                <ul class="mb-3">
                                    <li v-for="ownedIem in iems" class="flex items-center gap-2">  
                                        <div>{{ ownedIem?.model ? ownedIem?.model : ownedIem._dir + ' '+ ownedIem._path.split('/')[3] }}</div>
                                        <IconsCross class="w-4 h-4 text-red-600 cursor-pointer" @click="removeIEM(ownedIem)" />
                                    </li>
                                </ul>
                                <div class="flex items-center gap-2">
                                    <ModelCombobox v-model="iem" model="iem" /> 
                                    <Button color="blue" @click="addIEM" :disabled="!iem">Add</Button>
                                </div>
                            </div>

                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">DAP(s)</label>
                                <ul class="mb-3">
                                    <li v-for="ownedDap in daps" class="flex items-center gap-2">  
                                        <div>{{ ownedDap?.model ? ownedDap?.model : ownedDap._dir + ' '+ ownedDap._path.split('/')[3] }}</div>
                                        <IconsCross class="w-4 h-4 text-red-600 cursor-pointer" @click="removeDAP(ownedDap)" />
                                    </li>
                                </ul>
                                <div class="flex items-center gap-2">
                                    <ModelCombobox v-model="dap" model="dap" />
                                    <Button color="blue" @click="addDAP" :disabled="!dap">Add</Button>
                                </div>
                            </div>
    
                            <div class="sm:col-span-full">
                                <label for="name" class="block text-sm font-semibold leading-6 text-gray-700 mb-1">DAC(s)</label>
                                <ul class="mb-3">
                                    <li v-for="ownedDac in dacs" class="flex items-center gap-2">  
                                        <div>{{ ownedDac?.model ? ownedDac?.model : ownedDac._dir + ' '+ ownedDac._path.split('/')[3] }}</div>
                                        <IconsCross class="w-4 h-4 text-red-600 cursor-pointer" @click="removeDAC(ownedDac)" />
                                    </li>
                                </ul>
                                <div class="flex items-center gap-2">
                                    <ModelCombobox v-model="dac" model="dac" />
                                    <Button color="blue" @click="addDAC" :disabled="!dac">Add</Button>
                                </div>                            
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
                          <Button color="green" type="submit" :loading="pending" class="disabled:opacity-50">Save</Button>
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

    const iems = ref([])
    if(profile.value.iems && profile.value.iems.length)
    {
        for(const temp of profile.value.iems) {
            const result = await queryContent(temp).findOne()
            iems.value.push(result)
        };
    }


    const daps = ref([])
    if(profile.value.daps && profile.value.daps.length)
    {
        for(const temp of profile.value.daps) {
            const result = await queryContent(temp).findOne()
            daps.value.push(result)
        };
    }

    const dacs = ref([])
    if(profile.value.dacs && profile.value.dacs.length)
    {
        for(const temp of profile.value.dacs) {
            const result = await queryContent(temp).findOne()
            dacs.value.push(result)
        };
    }


    const iem = ref()
    const addIEM = async () => 
    {
        iems.value.push(await queryContent(iem.value._path).findOne())
    }

    const removeIEM = (data) => 
    {
        iems.value.splice(iems.value.findIndex(e => e._path == data._path), 1)
    }

    const dap = ref()
    const addDAP = async () => 
    {
        daps.value.push(await queryContent(dap.value._path).findOne())
    }

    const removeDAP = (data) => 
    {
        daps.value.splice(daps.value.findIndex(e => e._path == data._path), 1)
    }

    const dac = ref()
    const addDAC = async () => 
    {
        dacs.value.push(await queryContent(dac.value._path).findOne())
    }
    
    const removeDAC = (data) => 
    {
        dacs.value.splice(dacs.value.findIndex(e => e._path == data._path), 1)
    }

    const submitSetupForm = async () => {
        pending.value = true
    
        await client.from('profiles')
            .update({
                iems: iems.value.map(e=>e._path),
                daps: daps.value.map(e=>e._path),
                dacs: dacs.value.map(e=>e._path),
                name: profile.value.name
            })
            .eq('id', user.value.id)

        pending.value = false
    }

</script>
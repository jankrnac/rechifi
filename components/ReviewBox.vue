<template>

<article class="flex flex-col items-start justify-between">

    <div class="relative w-full  transition h-full flex items-center">
        
        
        <iframe v-if="review.type == 'youtube'" width="500" class="aspect-video rounded-xl" src="https://www.youtube.com/embed/YRZnahriSUE?si=1f3eV14oVdwKLvQR" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>

        <template v-else>
            <nuxt-img v-if="review.cover" :src="review.cover" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" densities="x1" />
            <nuxt-link :to="review._path" class="absolute inset-0"></nuxt-link>
    
            <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model" class="absolute inset-0 flex"></nuxt-link>

        </template>

    </div>

    <div v-if="!review.published" class="mt-2">
            <div class="rounded text-xs px-2 py-1 bg-gray-500 text-white">Unpublished</div>
    </div>

    <div class="w-full mt-2">
                
        <div class="group relative">
            <h3 v-if="size == 'normal'" class="mt-6 mb-1 text-2xl font-bold leading-6">
                <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model" class="text">{{ review.title }}</nuxt-link>
            </h3>
            <div class="flex w-full items-center gap-3">
                <div class="flex flex-1 justify-between gap-4" :class="[size == 'normal' ? 'text-sm' : 'text-xs']">
                    <div class="text-gray-500 dark:text-gray-200 italic mt-2 flex items-center justify-center">
                        <IconsUser class="w-4 h-4 mr-1" />
                        {{  review.profiles.username }}
                    </div>
                    <div class="text-gray-500 dark:text-gray-200  italic mt-2 flex items-center justify-center">
                        <IconsCalendar class="w-4 h-4 mr-1" />
                        {{ new Date(review.created_at).toLocaleString('en-us',{month:'long', day:'numeric', year:'numeric'}) }}
                    </div>
                </div>
            </div>
            <p v-if="size == 'normal'" class="mt-5 line-clamp-5 text-sm leading-6 min-h-[96px]">{{ review.description }}</p>
        </div>
            
    </div>

</article>
    
</template>
    
<script setup>

const props = defineProps({
    review: {
        type: Object,
        required: true
    },
    size: {
        type: String,
        default: 'normal'
    }
})


function makeTitle(slug) {
    var words = slug.split('-');

    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(' ');
}


</script>
<template>

<article class="flex flex-col items-start justify-between">

    <div class="relative w-full hover:-translate-y-1 transition h-full flex items-center">
        
        
        <iframe v-if="review.type == 'youtube'" width="500" class="aspect-video rounded-xl" src="https://www.youtube.com/embed/YRZnahriSUE?si=1f3eV14oVdwKLvQR" 
            title="YouTube video player" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowfullscreen>
        </iframe>

        <template v-else>
            <nuxt-img v-if="review.cover" :src="review.cover" alt="" class="aspect-square w-full rounded-2xl bg-gray-100 object-cover" />
            <nuxt-link :to="review._path" class="absolute inset-0"></nuxt-link>
        
            <div class="absolute inset-0 flex">
                <div class="justify-center items-center flex backdrop-blur-lg rounded-full text-2xl font-bold border border-gray-300/50 w-[100px] h-[100px]">
                    <div>{{ review.score }}</div>
                    <div class="text-base mt-1 text-gray-500">/10</div>
                </div>
            </div>

        </template>

    </div>
    
    <div class="max-w-xl mt-2">
                
        <div class="group relative">
            <h3 class="mt-6 text-2xl font-bold leading-6">
                <nuxt-link :to="'/reviews/' + review.profiles.username + '/' + review.brand + '/' + review.model" class="text">{{ review.brand + ' ' + makeTitle(review.model) }}</nuxt-link>
            </h3>
            <div class="mt-2 italic">by {{ review.profiles.username }}</div>
            <p class="mt-5 line-clamp-4 text-base leading-6 min-h-[96px]">{{ review.description }}</p>
        </div>
            
    </div>

</article>
    
</template>
    
<script setup>

const props = defineProps({
    review: {
        type: Object,
        required: true
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
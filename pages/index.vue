<template>
    <div class="max-w-[1500px] mx-auto mt-6 lg:mt-12">

        <div class="text-sm text-gray-400 mb-1">Featured post</div>

        <!-- Featured post -->
        <article class="mb-24">

            <div class="relative relative rounded-xl overflow-hidden shadow-xl mb-4">

                <!-- Image -->
                <div class="w-full select-none"><nuxt-img :src="featuredPost!.featuredCover" class="w-full" /></div>

                <!-- Logo -->
                <div class="absolute inset-0 flex z-10 text-white">
                </div>

                <!-- Title, text -->
                <div class="absolute inset-0 ml-12 flex items-center font-bold z-10">
                    <div class="inline-flex flex-col text-center ml-[2%] lg:ml-[10%]">
                        <div class="text-gray-100 text-2xl lg:text-5xl mb-2 lg:mb-6">{{ featuredPost!.title }}</div>
                        <div class="text-gray-100 text-xl lg:text-4xl">New diamond standart</div>
                    </div>
                </div>

                <!-- Overlay -->
                <div class="absolute inset-0 bg-gray-900 opacity-40 z-9"></div>

                
            </div>

            <Label>Recenze</Label>

            <section class="lg:w-2/3">
                <h1 class="text-2xl lg:text-5xl mt-8 mb-8 font-bold leading-relaxed">
                    <nuxt-link class="text" :to="featuredPost!._path">The trick to getting more done is to have the freedom to roam around</nuxt-link>
                </h1>
                <p class="text-xl leading-loose">Vel lectus vel velit pellentesque dignissim nec id magna. Cras molestie ornare quam at semper. Proin a ipsum ex. Curabitur eu venenatis justo. Nullam felis augue, imperdiet at sodales. Nullam felis libero, congue quis ipsum et, lacinia maximus eros. Vestibulum ante ipsum primis in faucibus.</p>
            </section>
        </article>

        <!-- Posts -->
        <div class="mx-auto lg:mt-32 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">

            <template v-for="post in blogPosts" :key="post._path">
                <BlogPostBox :post="post" />
            </template>

        </div>

    </div>
</template>


<script setup lang="ts">
  
    const blogPosts = await queryContent('/blog')
        .sort({ date: -1 }) // show latest articles first
        .where({ _partial: false }) // exclude the Partial files
        .find() 

    const featuredPost = blogPosts.find(e => e.featured)
  
</script>
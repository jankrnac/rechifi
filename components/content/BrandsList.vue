<template>

    <div class="flex gap-12 my-24 flex-wrap">
        <div v-for="brand in brands" class="relative flex flex-col justify-center items-center">
            <div v-if="brand.logo" class="w-32 h-32 flex items-center"><nuxt-img :src="brand.logo"/></div>
            <div>{{ brand.label }}</div>

            <a :href="brand.link" target="_blank" class="absolute inset-0"/>
        </div>
    </div>

</template>

<script setup>

const { data:brands } = await useFetch('/api/brands')

brands.value.sort((a, b) => {
  const nameA = a.value.toUpperCase(); // ignore upper and lowercase
  const nameB = b.value.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }

  // names must be equal
  return 0;
});

</script>
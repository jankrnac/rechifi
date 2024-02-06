<template>
    <div class="mt-24">
        <div id="commento"></div>
    </div>
</template>

<script setup>

useHead({
    script: [{
        src: "https://cdn.commento.io/js/commento.js",
        defer: true
    }]
})

</script>
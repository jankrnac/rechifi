<template>

<div loader="loader" class="loader absolute inset-0 flex justify-center items-center">
    <div class="content flex items-end gap-0.5 mt-2">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
    </div>
    
</div>
</template>

<style scoped>
.loader {

    .content {
        height: 10px;
        position: absolute;
    }
    .bar {
        background: white;
        bottom: 1px;
        height: 3px;
        width: 3px;
        animation: sound 0ms -800ms linear infinite alternate;
        border-radius: 999px;

        &:nth-child(1)  { animation-duration: 575ms; }
        &:nth-child(2)  { animation-duration: 533ms; }
        &:nth-child(3)  { animation-duration: 507ms; }
        &:nth-child(4)  { animation-duration: 558ms; }
        &:nth-child(5)  { animation-duration: 500ms; }
        &:nth-child(6)  { animation-duration: 527ms; }
        &:nth-child(7)  { animation-duration: 551ms; }
    }

}

@keyframes sound {
    0% {
       opacity: .35;
        height: 3px;
    }
    100% {
        opacity: 1;
        height: 15px;
    }
}


</style>
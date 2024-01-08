<template>

    <div class="dark:bg-gray-950 dark:text-gray-200 font-sans flex flex-col flex-1">
  
        <AppHeader />
  
      	<main class="flex flex-1 justify-center mx-4 lg:mx-0">
            <slot />
      	</main>

	  	<AppFooter />

    </div>
  
</template>

<style>

	#__nuxt{
		@apply min-h-screen flex flex-col
	}

	a.text {
		position: relative;
	}

	a.text::before {
		content: '';
		position: absolute;
		width: 100%;
		height: 2px;
		border-radius: 4px;
		background-color: #555;
		bottom: -2px;
		left: 0;
		transform-origin: right;
		transform: scaleX(0);
		transition: transform .3s ease-in-out;
	}

	a.text:hover::before {
		transform-origin: left;
		transform: scaleX(1);
	}

	

	.content p {
		@apply py-4
	}

	.content h1 {
		@apply text-2xl lg:text-4xl font-bold mt-6
	}

	.content h2 {
		@apply text-xl font-bold mt-6
	}

	.content ul {
		@apply list-disc ml-6
	}

</style>
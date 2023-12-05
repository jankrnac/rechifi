<template>

    <div class="font-sans mx-6">
  
        <AppHeader />
  
      	<main>
            <slot />
      	</main>

	  	<AppFooter />

    </div>
  
</template>

<style>

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

	.content h2 {
		@apply text-xl font-bold mt-6
	}

	.content ul {
		@apply list-disc ml-6
	}

</style>
<template>

    <div class="dark:bg-gray-950 dark:text-gray-200 font-sans flex flex-col flex-1 overflow-hidden">
  
        <AppHeader />
  
      	<main class="flex flex-1 justify-center mx-4 lg:mx-0">
            <slot />
      	</main>

	  	<AppFooter />

    </div>
  
</template>
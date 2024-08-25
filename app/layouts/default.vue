<template>

    <div class="dark:bg-gray-950 dark:text-gray-200 font-sans min-h-screen flex flex-col flex-1">
  
        <AppHeader />
  
      	<main class="flex flex-grow w-full justify-center mx-4 lg:mx-0">
            <slot />
      	</main>

	  	<AppFooter />

    </div>
  
</template>
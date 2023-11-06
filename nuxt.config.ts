export default defineNuxtConfig({

  	devtools: { 
    	enabled: true 
  	},
  	
	devServer:{
    	port: 3003
	},

  	modules: [
		'@nuxt/content',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'@nuxtjs/google-fonts',
		'@nuxt/image'
	],

	googleFonts: {
		families: {
			'Playfair Display': {
				ital: [700]
			},
			Montserrat: {
				regular: [300,400,600,800,900]
			}
		}
	}
})

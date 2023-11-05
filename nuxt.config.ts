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
		'@nuxtjs/google-fonts'
	],

	googleFonts: {
		families: {
			'Playfair Display': {
				ital: [700]
			},
			Montserrat: {
				regular: [300,400,800,900]
			}
		}
	}
})

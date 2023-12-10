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
		'@nuxt/image',
		'@nuxtjs/i18n',
		'@nuxtjs/supabase'
	],

	supabase:{
		redirect: false
	},

	googleFonts: {
		families: {
			'Playfair Display': {
				ital: [700]
			},
			Montserrat: {
				regular: [300,400,600,800,900]
			}
		}
	},

	image: {
		provider: 'ipx',
		densities: [1],
	},

	colorMode: {
        classSuffix: ''
    },

	content: {
		experimental: {
			search: true
		}
	},

	i18n: {
        strategy: 'no_prefix',
        locales: [
            {
                code: 'en',
                key: 'en',
                label: 'English'
            },
            {
                code: 'cz',
                key: 'cz',
                label: 'Čeština'
            }
        ],
    },


})

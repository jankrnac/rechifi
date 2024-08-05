export default defineNuxtConfig({

  	devtools: { 
    	enabled: true 
  	},
  	
	future: {
		compatibilityVersion: 4,
	},

	devServer:{
    	port: 3003
	},

	app: {
		head: {
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}]
		}
	},
	
  	modules: [
		'@nuxthq/studio',
		'@nuxtjs/color-mode',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'@nuxtjs/i18n',
		'vue3-carousel-nuxt',
		'@nuxtjs/device',
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
	},

	supabase: {
		cookieOptions: {
		  	secure: process.env.NODE_ENV === 'production',
		},
		redirect: false
	},

	image: {
		providers: {
			myProvider: {
			  	name: 'r2',
			  	provider: '~/providers/r2.ts',
			  	options: {
					baseURL: "https://media.rechifi.com/cdn-cgi/image/"
			  	}
			}
		},
		provider: 'r2',
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

	hub: {
		database: true,
		kv: true,
		blob: true
	},


})

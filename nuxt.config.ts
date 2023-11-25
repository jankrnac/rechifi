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

	postcss: {
		plugins: {
		  tailwindcss: {},
		  autoprefixer: {},
		 cssnano:
		   process.env.NODE_ENV === 'production'
			 ? { preset: ['default', { discardComments: { removeAll: true } }] }
			 : false, // disable cssnano when not in production
		},
	 },

	 image: {
		provider: process.env.NODE_ENV === 'production' ? 'netlify' : 'ipx',
		netlify: {
		  	baseURl: process.env.IMAGES_URL
		},
	}

})

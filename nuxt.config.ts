export default defineNuxtConfig({
	devtools: {
		enabled: true
	},

	future: {
		compatibilityVersion: 4,
	},

	devServer: {
		port: 3003
	},

	app: {
		head: {
			meta: [{
				name: "robots",
				content: "noindex, nofollow"
			}],
			bodyAttrs: {
				class: 'h-full'
			},
			htmlAttrs: {
				class: 'h-full'
			},
		},
		rootAttrs: {
			class: 'h-full'
		}
	},

	modules: [
		'@nuxt/ui',
		'@nuxthub/core',
		'@nuxt/content',
		'@nuxtjs/color-mode',
		'@nuxtjs/google-fonts',
		'@nuxt/image',
		'@nuxtjs/i18n',
		'vue3-carousel-nuxt',
		'@nuxtjs/device',
		'nuxt-auth-utils'
	],

	googleFonts: {
		families: {
			'Playfair Display': {
				ital: [700]
			},
			Montserrat: {
				regular: [300, 400, 600, 800, 900]
			}
		}
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
		blob: true,
		cache: true
	},

	routeRules: {
		'/iems/**': { swr: 600 },
		'/dacs/**': { swr: 600 },
		'/daps/**': { swr: 600 },
	},

	runtimeConfig: {
		session: {
			maxAge: 60 * 60 * 24 * 7 // 1 week
		},
		
		public: {
			googleAuth: Boolean(process.env.GOOGLE_AUTH || (process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID && process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET)),
		},
	
	},

	compatibilityDate: '2024-08-25'
})
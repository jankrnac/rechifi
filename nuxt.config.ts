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

	site: {
		url: process.env.NUXT_BASE_URL,
		name: 'Rechifi',
		description: 'Chifi user articles and reviews',
		defaultLocale: 'en',
		indexable:false
	},

	sitemap: {
		sources: [
		  '/api/__sitemap__/urls',
		]
	},

	app: {
		head: {
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
		'vue3-carousel-nuxt',
		'@nuxtjs/device',
		'nuxt-auth-utils',
		'@nuxtjs/turnstile',
		'@nuxt/scripts',
		'@stefanobartoletti/nuxt-social-share',
		'nuxt-authorization',
		'@nuxtjs/seo'
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

	icon: {
		serverBundle: {
			collections: ['ph']
		}
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


	turnstile: {
		siteKey: '',
	},

	socialShare: {
		baseUrl: process.env.NUXT_BASE_URL // required!
		// other optional module options
	},

	runtimeConfig: {
		session: {
			maxAge: 60 * 60 * 24 * 7 // 1 week
		},

		resendApiKey: '',

		turnstile: {
			// This can be overridden at runtime via the NUXT_TURNSTILE_SECRET_KEY
			// environment variable.
			secretKey: '',
		},

		public: {
			googleAuth: Boolean(process.env.GOOGLE_AUTH || (process.env.NUXT_OAUTH_GOOGLE_CLIENT_ID && process.env.NUXT_OAUTH_GOOGLE_CLIENT_SECRET)),
		},

	},

	routeRules: {
		// Don't add any /secret/** URLs to the sitemap.xml
		'/activate/': { robots: false },
		'/confirm/': { robots: false },
		'/remind/': { robots: false },
		'/reset/': { robots: false },
		'/suggest/': { robots: false },
	  }
})
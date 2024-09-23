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
		'nuxt-auth-utils',
		'@nuxtjs/turnstile',
		'@nuxt/scripts',
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
		baseUrl:  process.env.NUXT_BASE_URL // required!
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
})
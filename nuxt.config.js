/*jshint esversion: 6 */
module.exports = {
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Glass Gold Group - Online Shop',
		meta: [{
			charset: 'utf-8'
		}, {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		}, {
			hid: 'description',
			name: 'description',
			content: 'Glass Gold Group - Online Shop [VueJS & NuxtJS based app]'
		}],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon-gold.ico' },
			{ rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
		]
	},
	plugins: [{
		src: '~/plugins/vue-notifications',
		ssr: true
	}, {
		src: '~/plugins/vuetify',
		ssr: true
	}],
	css: ['~/assets/app.styl'],
	/*
	 ** Customize the progress bar color
	 */
	loading: {
		color: '#3B8070'
	},
	/*
	 ** Build configuration
	 */
	build: {
		vendor: ['axios', 'vuetify', 'vue-notifications'],
		/*
		 ** Run ESLint on save
		 */
		extend(config, ctx) {
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	}
};
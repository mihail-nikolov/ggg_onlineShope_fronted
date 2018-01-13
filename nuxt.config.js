/*jshint esversion: 6 */
module.exports = {
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Auto glasses - Glass Gold Group - Online Store',
		meta: [{
			charset: 'utf-8'
		}, {
			name: 'viewport',
			content: 'width=device-width, initial-scale=1'
		}, {
			hid: 'description',
			name: 'description',
			content: 'Glass Gold Group - Online Store [VueJS & NuxtJS based app]'
		}],
		link: [{
			rel: 'icon',
			type: 'image/x-icon',
			href: '/favicon-gold.ico'
		}]
	},
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
		vendor: ['vue-notifications'],
		/*
		 ** Run ESLint on save
		 */
		extend(config, ctx) {
			if (ctx.dev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	},
	plugins: [{
		src: '~/plugins/vue-notifications',
		ssr: false
	}]
};
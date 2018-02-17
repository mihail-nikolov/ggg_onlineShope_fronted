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
			{ rel: 'stylesheet', href: '/css/material-icons.css' },
			{ rel: 'stylesheet', href: 'css/materialdesignicons.min.css' },
			{ rel: 'stylesheet', href: 'css/font-awesome.min.css' }
		]
	},
	/* custom plugins */
	plugins: [{
		src: '~/plugins/vuetify',
		ssr: true
	}, {
		src: '~/plugins/simple-vue-validator',
		ssr: true
	}],
	/* stylus */
	css: ['~/assets/app.styl', '~/assets/main.css'],
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
		vendor: ['axios', 'vuetify', 'simple-vue-validator', 'babel-polyfill'],
		/*
		 ** Run ESLint on save
		 */
		extend(config, ctx) {
			config.node = { fs: 'empty' };
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.vue$/,
					loader: 'eslint-loader',
					exclude: /(node_modules)/
				});
			}
		}
	}
};
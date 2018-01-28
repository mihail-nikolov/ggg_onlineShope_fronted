import Vue from 'vue';
import Vuex from 'vuex';

import auth from './modules/auth';
import general from './modules/general';
import ui from './modules/ui';
import products from './modules/products';
import cart from './modules/cart';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		auth,
		general,
		ui,
		products,
		cart
	}
});
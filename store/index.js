/*jshint esversion: 6 */
import Vue from 'vue';
import Vuex from 'vuex';

import general from './modules/general';
import ui from './modules/ui';
import products from './modules/products';
import cart from './modules/cart';

Vue.use(Vuex);

export const store = new Vuex.Store({
	modules: {
		general,
		ui,
		products,
		cart
	}
});
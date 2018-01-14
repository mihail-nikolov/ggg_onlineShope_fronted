const state = () => ({
	addedItems: []
});

const mutations = {
	addItemToCart(state, item) {
		state.addedItems.push(item);
	}
};

const getters = {
	getCartItems(state) {
		return state.addedItems;
	}
};

const actions = {
	addItemToCart({commit}, item) {
		commit('addItemToCart', item);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
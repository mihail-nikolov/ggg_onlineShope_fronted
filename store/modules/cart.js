const state = () => ({
	addedItems: []
});

const mutations = {
	ADD_ITEM_TO_CART(state, item) {
		state.addedItems.push(item);
	},
	ADD_TO_COUNT_OF_ITEM(state, data) {
		let totalCount = state.addedItems[data.index].cartCount + data.count,
			item = state.addedItems[data.index].item,
			product = {item: item, cartCount: totalCount};
		state.addedItems.splice(data.index, 1, product);
	},
	CHANGE_COUNT_OF_ITEM_IN_CART(state, data) {
		state.addedItems[data.index].cartCount = data.count;
	},
	AUTO_LOAD_ITEMS(state, data) {
		state.addedItems = data.savedCartItems;
		console.log(state.addedItems);
	},
	REMOVE_PRODUCT_FROM_CART(state, index) {
		state.addedItems.splice(index, 1);
	}
};

const getters = {
	getCartItems(state) {
		return state.addedItems;
	}
};

const actions = {
	addItemToCart({commit}, data) {
		// let productToBeAdded = data.productToBeAdded,
		// originalProduct = data.originalProduct,
		// currentlyAddedItems = this.getters["modules/cart/getCartItems"],
		// productIsInCart = false,
		// indexOfProduct = 0;

		commit('ADD_ITEM_TO_CART', data.productToBeAdded);
		// if (currentlyAddedItems.length > 0) {
		// 	currentlyAddedItems.forEach(function(product, index) {
		// 		if (JSON.stringify(productToBeAdded.item) === JSON.stringify(product.item)) {
		// 			productIsInCart = true;
		// 			indexOfProduct = index;
		// 		}
		// 	});
		// }
		// if (!productIsInCart) {
		// 	commit('ADD_ITEM_TO_CART', productToBeAdded);
		// } else {
		// 	this.dispatch('modules/cart/addToCountOfItem', {
		// 		index: indexOfProduct,
		// 		count: productToBeAdded.cartCount
		// 	});
		// }
	},
	autoLoadItems({commit}, data) {
		commit('AUTO_LOAD_ITEMS', data);
	},
	addToCountOfItem({commit}, data) {
		commit('ADD_TO_COUNT_OF_ITEM', data);
	},
	changeCountOfItemInCart({commit}, data) {
		commit('CHANGE_COUNT_OF_ITEM_IN_CART', data);
	},
	removeProductFromCart({commit}, index) {
		commit('REMOVE_PRODUCT_FROM_CART', index);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
const state = () => ({
	addedItems: []
});

const mutations = {
	ADD_ITEM_TO_CART(state, item) {
		state.addedItems.push(item);
	},
	CHANGE_COUNT_OF_ITEM_IN_CART(state, data) {
		let totalCount = state.addedItems[data.index].cartCount + data.count,
			item = state.addedItems[data.index].item,
			product = {item: item, cartCount: totalCount};
		state.addedItems.splice(data.index, 1, product);
	},
	AUTO_LOAD_ITEMS(state, data) {
		state.addedItems = data.savedCartItems;
	}
};

const getters = {
	getCartItems(state) {
		return state.addedItems;
	}
};

const actions = {
	addItemToCart({commit}, data) {
		let productToBeAdded = data.productToBeAdded,
			originalProduct = data.originalProduct,
			currentlyAddedItems = this.getters["modules/cart/getCartItems"],
			productIsInCart = false,
			indexOfProduct = 0;
		if (currentlyAddedItems.length > 0) {
			currentlyAddedItems.forEach(function(product, index) {
				if (JSON.stringify(productToBeAdded.item) === JSON.stringify(product.item)) {
					productIsInCart = true;
					indexOfProduct = index;
				}
			});
		}
		if (!productIsInCart) {
			commit('ADD_ITEM_TO_CART', productToBeAdded);
		} else {
			commit('CHANGE_COUNT_OF_ITEM_IN_CART', {
				index: indexOfProduct,
				count: productToBeAdded.cartCount
			});
		}
	},
	autoLoadItems({commit}, data) {
		commit('AUTO_LOAD_ITEMS', data);
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
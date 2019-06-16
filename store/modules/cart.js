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
            product = { item: item, cartCount: totalCount };
        state.addedItems.splice(data.index, 1, product);
    },
    CHANGE_COUNT_OF_ITEM_IN_CART(state, data) {
        state.addedItems[data.index].cartCount = data.count;
    },
    AUTO_LOAD_ITEMS(state, data) {
        state.addedItems = data.savedCartItems;
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
    addItemToCart({ commit }, data) {
        commit("ADD_ITEM_TO_CART", data.productToBeAdded);
    },
    autoLoadItems({ commit }, data) {
        commit("AUTO_LOAD_ITEMS", data);
    },
    addToCountOfItem({ commit }, data) {
        commit("ADD_TO_COUNT_OF_ITEM", data);
    },
    changeCountOfItemInCart({ commit }, data) {
        commit("CHANGE_COUNT_OF_ITEM_IN_CART", data);
    },
    removeProductFromCart({ commit }, index) {
        commit("REMOVE_PRODUCT_FROM_CART", index);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};

import axios from 'axios';

const state = () => ({
	makes: [],
	models: [],
	bodyTypes: [],
	productTypes: [],
	allProducts: []
});

const mutations = {
	SET_MAKES(state, makes) {
		state.makes = makes;
	},
	SET_MODELS(state, models) {
		state.models = models;
	},
	SET_BODY_TYPES(state, bodyTypes) {
		state.bodyTypes = bodyTypes;
	},
	SET_PRODUCT_TYPES(state, productTypes) {
		state.productTypes = productTypes;
	},
	SET_ALL_PRODUCTS(state, allProducts) {
		state.allProducts = allProducts;
	}
};

const getters = {
	getMakes(state) {
		return state.makes;
	},
	getModels(state) {
		return state.models;
	},
	getBodyTypes(state) {
		return state.bodyTypes;
	},
	getProductTypes(state) {
		return state.productTypes;
	},
	getAllProducts(state) {
		return state.allProducts;
	}
};

const actions = {
	setMakes({ commit }, makes) {
		commit('SET_MAKES', makes);
	},
	setModels({ commit }, models) {
		commit('SET_MODELS', models);
	},
	setBodyTypes({ commit }, bodyTypes) {
		commit('SET_BODY_TYPES', bodyTypes);
	},
	setProductTypes({ commit }, productTypes) {
		commit('SET_PRODUCT_TYPES', productTypes);
	},
	clearProducts({ commit }) {
		commit('SET_ALL_PRODUCTS', []);
	},
	async fetchMakes({ commit }) {
		axios.get(`http://localhost:60918/api/Makes`)
			.then(response => {
				commit('SET_MAKES', response.data);
			})
			.catch(e => {
				console.log("error setMakes -> ", e);
				this.errors.push(e);
			});
	},
	async fetchModels({ commit }, makeId) {
		axios.get('http://localhost:60918/api/Models/GetByMakeId/' + makeId)
			.then(response => {
				commit('SET_MODELS', response.data);
			})
			.catch(e => {
				console.log("error setModels -> ", e);
				this.errors.push(e);
			});
	},
	async fetchBodyTypes({ commit }, reqBody) {
		axios.post('http://localhost:60918/api/BodyTypes/GetByMakeAndModelIds', reqBody)
			.then(response => {
				commit('SET_BODY_TYPES', response.data);
			})
			.catch(e => {
				console.log("error setBodyTypes -> ", e);
				this.errors.push(e);
			});
	},
	async fetchProductTypes({ commit }, reqBody) {
		axios.post('http://localhost:60918/api/Products/GetProductTypes', reqBody)
			.then(response => {
				commit('SET_PRODUCT_TYPES', response.data);
			})
			.catch(e => {
				console.log("error setProductTypes -> ", e);
				this.errors.push(e);
			});
	},
	async searchForProducts({ commit }, reqBody) {
		axios.post('http://localhost:60918/api/Products/FindByVehicleInfo', reqBody)
			.then(response => {
				commit('SET_ALL_PRODUCTS', response.data);
			})
			.catch(e => {
				console.log("error serchForProducts -> ", e);
				this.errors.push(e);
			});
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
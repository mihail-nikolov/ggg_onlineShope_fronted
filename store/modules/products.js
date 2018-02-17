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
		// console.log("allProducts ", allProducts);
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
	setMakes({commit}, makes) {
		commit('SET_MAKES', makes);
	},
	setModels({commit}, models) {
		commit('SET_MODELS', models);
	},
	setBodyTypes({commit}, bodyTypes) {
		commit('SET_BODY_TYPES', bodyTypes);
	},
	setProductTypes({commit}, productTypes) {
		commit('SET_PRODUCT_TYPES', productTypes);
	},
	clearProducts({commit}) {
		commit('SET_ALL_PRODUCTS', []);
	},
	async fetchMakes({commit}) {
		axios.get(`http://localhost:60918/api/Makes`)
			.then(response => {
				if (response && response.data && response.data.length > 0) {
					this.dispatch("modules/general/setSnackbarNotification", {
						message: "Makes successfully fetched.",
						status: "success"
					});
				}
				commit('SET_MAKES', response.data);
			})
			.catch(e => {
				this.dispatch("modules/general/setSnackbarNotification", {
					message: "Makes unsuccessfully fetched. " + e,
					status: "error"
				});
				console.log("error setMakes -> ", e);
			});
	},
	async fetchModels({commit}, make) {
		let store = this;
		store.dispatch('modules/general/activateLoading');
		axios.get('http://localhost:60918/api/Models/GetByMakeId/' + make.Id)
			.then(response => {
				if (response && response.data && response.data.length > 0) {
					this.dispatch("modules/general/setSnackbarNotification", {
						message: make.Name + " models successfully fetched.",
						status: "success"
					});
				}
				store.dispatch('modules/general/deactivateLoading');
				commit('SET_MODELS', response.data);
			})
			.catch(e => {
				store.dispatch('modules/general/deactivateLoading');
				this.dispatch("modules/general/setSnackbarNotification", {
					message: make.Name + " models unsuccessfully fetched. " + e,
					status: "error"
				});
				console.log("error setModels -> ", e);
			});
	},
	async fetchBodyTypes({commit}, data) {
		let store = this;
		store.dispatch('modules/general/activateLoading');
		axios.post('http://localhost:60918/api/BodyTypes/GetByMakeAndModelIds', data.reqBody)
			.then(response => {
				if (response && response.data && response.data.length > 0) {
					this.dispatch("modules/general/setSnackbarNotification", {
						message: "Body types for " + data.makeModelName + " are successfully fetched.",
						status: "success"
					});
				}
				store.dispatch('modules/general/deactivateLoading');
				commit('SET_BODY_TYPES', response.data);
			})
			.catch(e => {
				store.dispatch('modules/general/deactivateLoading');
				this.dispatch("modules/general/setSnackbarNotification", {
					message: "Body types for " + data.makeModelName + " are unsuccessfully fetched. " + e,
					status: "error"
				});
				console.log("error setBodyTypes -> ", e);
			});
	},
	async fetchProductTypes({commit}, data) {
		let store = this;
		store.dispatch('modules/general/activateLoading');
		axios.post('http://localhost:60918/api/Products/GetProductTypes', data.reqBody)
			.then(response => {
				console.log("fetchProductTypes res ", response.data);
				if (response && response.data && response.data.length > 0) {
					this.dispatch("modules/general/setSnackbarNotification", {
						message: "Product types  for " + data.makeModelName + " are successfully fetched.",
						status: "success"
					});
				}
				store.dispatch('modules/general/deactivateLoading');
				commit('SET_PRODUCT_TYPES', response.data);
			})
			.catch(e => {
				store.dispatch('modules/general/deactivateLoading');
				this.dispatch("modules/general/setSnackbarNotification", {
					message: "Product types  for " + data.makeModelName + " are unsuccessfully fetched.",
					status: "error"
				});
				console.log("error setProductTypes -> ", e);
			});
	},
	async searchForProducts({commit}, reqBody) {
		let store = this;
		console.log("reqBody -> ", reqBody);
		store.dispatch('modules/general/activateLoading');
		axios.post('http://localhost:60918/api/Products/FindByVehicleInfo', reqBody)
			.then(response => {
				response.data.forEach(function(product) {
					if (product.Images.length > 0) {
						product.Images.forEach(function(image, index, object) {
							let tempPath = "/Images/" + image + ".jpg";
							object[index] = tempPath;
						});
						if (product.Images.length === 0) {
							product.Images.push("/Images/no-image.png");
						}
					} else {
						product.Images.push("/Images/no-image.png");
					}
				});
				store.dispatch('modules/general/deactivateLoading');
				commit('SET_ALL_PRODUCTS', response.data);
			})
			.catch(e => {
				store.dispatch('modules/general/deactivateLoading');
				console.log("error serchForProducts -> ", e);
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
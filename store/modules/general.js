const state = () => ({
	baseUrl: '',
	userName: ''
});

const mutations = {
	setBaseUrl(state, url) {
		state.baseUrl = url;
	}
};

const getters = {
	getBaseUrl(state) {
		return state.baseUrl;
	}
};

const actions = {};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
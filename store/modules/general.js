const state = () => ({
	baseUrl: 'http://localhost:60918/',
	snackbarNotification:[]
});

const mutations = {
	SET_SNACKBAR_NOTIFICATION(state, {message, status}) {
		state.snackbarNotification.push({message, status});
	},
	CLEAR_NOTIFICATION(state) {
		state.snackbarNotification = [];
	}
};

const getters = {
	getSnackbarNotification(state) {
		return state.snackbarNotification;
	},
	getBaseUrl(state) {
		return state.baseUrl;
	}
};

const actions = {
	setSnackbarNotification({ commit }, {message, status}) {
		commit('SET_SNACKBAR_NOTIFICATION', {message, status});
	},
	clearSnackbarNotification({ commit }) {
		commit('CLEAR_NOTIFICATION');
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
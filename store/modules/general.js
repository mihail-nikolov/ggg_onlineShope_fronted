const state = () => ({
	snackbarNotification: [],
	isLoadingActive: false
});

const mutations = {
	SET_SNACKBAR_NOTIFICATION(state, {message, status}) {
		state.snackbarNotification.push({message, status});
	},
	CLEAR_NOTIFICATION(state) {
		state.snackbarNotification = [];
	},
	ACTIVATE_LOADING(state) {
		state.isLoadingActive = true;
	},
	DEACTIVATE_LOADING(state) {
		state.isLoadingActive = false;
	}
};

const getters = {
	getSnackbarNotification(state) {
		return state.snackbarNotification;
	},
	isLoadingActive(state) {
		return state.isLoadingActive;
	}
};

const actions = {
	setSnackbarNotification({ commit }, {message, status}) {
		this.dispatch("modules/general/clearSnackbarNotification");
		commit('SET_SNACKBAR_NOTIFICATION', {message, status});
	},
	clearSnackbarNotification({ commit }) {
		commit('CLEAR_NOTIFICATION');
	},
	activateLoading({ commit }) {
		commit('ACTIVATE_LOADING');
	},
	deactivateLoading({ commit }) {
		commit('DEACTIVATE_LOADING');
	}
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions
};
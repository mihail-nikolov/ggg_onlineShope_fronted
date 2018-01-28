import axios from 'axios';

const state = () => ({
	userDetails: [],
	token: '',
	isLoggedIn: false
});

const mutations = {
	SET_USER_DETAILS(state, userDetails) {
		state.userDetails = userDetails;
	},
	SET_TOKEN(state, token) {
		state.token = token;
	},
	SET_LOGGED_IN(state, isLoggedIn) {
		state.isLoggedIn = isLoggedIn;
	}
};

const getters = {
	isLoggedIn(state) {
		return state.isLoggedIn;
	}
};

const actions = {
	// nuxtServerInit is called by Nuxt.js before server-rendering every page
	nuxtServerInit({ commit }, { req }) {
		// if (req.session && req.session.authUser) {
		// 	commit('SET_USER', req.session.authUser);
		// }
	},
	async login({ commit }, { email, password }) {
		let baseUrl = this.getters["modules/general/getBaseUrl"],
			postBody = 'Username='+ email + '&Password='+ password +'&grant_type=password';
		try {
			const { data } = await axios.post(baseUrl + 'Token', postBody);
			commit('SET_TOKEN', data.token_type + ' ' + data.access_token);
			commit('SET_LOGGED_IN', true);
			return {message:"Login successful. You'll be automatically redirected to 'Advanced search' page.", status: 'success'};
		} catch (error) {
			if (error.response && (error.response.status === 401 || error.response.status === 400)) {
				return {message:'Bad credentials entered. Please try again.', status: 'error'};
			} else {
				return {message:error, status: 'error'};
			}
		}
	},
	async logout({ commit }) {
		// await axios.post('/api/logout');
		commit('SET_TOKEN', '');
		commit('SET_LOGGED_IN', false);
	}
};

export default {
	namespaced: false,
	getters,
	state,
	mutations,
	actions
};
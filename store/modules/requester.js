import axios from 'axios';

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';

const state = () => ({
	baseUrl: 'http://﻿130.204.36.213/backend/'
});

const getters = {
	getBaseUrl(state) {
		return state.baseUrl;
	}
};

const actions = {
	async request({ commit }, reqData) {
		let baseUrl = this.getters["modules/requester/getBaseUrl"],
			token = this.getters["modules/auth/getToken"] || reqData.token,
			method = reqData.method,
			endpoint = reqData.endpoint,
			body = reqData.body;
		return axios({
			method: method,
			url: baseUrl + endpoint,
			withCredentials: true,
			headers: {
				'Authorization': token,
				'Cache-Control': 'no-cache',
				'Pragma': 'no-cache',
				'Expires': 0
			},
			data: body
		});
	}
};

export default {
	namespaced: true,
	state,
	getters,
	actions
};
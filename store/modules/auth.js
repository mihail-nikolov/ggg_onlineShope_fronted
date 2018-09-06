const state = () => ({
	userDetails: {
		Id: "",
		Email: "",
		Bulstat: null,
		IsDeferredPaymentAllowed: false,
		Name: "",
		PhoneNumber: "",
		DeliveryCountry: "",
		DeliveryTown: "",
		DeliveryAddress: "",
		PercentageReduction: 0
	},
	token: '',
	isLoggedIn: false
});

const mutations = {
	LOGIN(state, data) {
		console.warn(data);
		state.userDetails = data.userDetails;
		state.token = data.token;
		state.isLoggedIn = true;
	},
	LOGOUT(state) {
		state.userDetails = {
			Id: "",
			Email: "",
			Bulstat: null,
			IsDeferredPaymentAllowed: false,
			Name: "",
			PhoneNumber: "",
			DeliveryCountry: "",
			DeliveryTown: "",
			DeliveryAddress: "",
			PercentageReduction: 0
		};
		state.token = '';
		state.isLoggedIn = false;
	},
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
	},
	getToken(state) {
		return state.token;
	},
	getUserDetails(state) {
		return state.userDetails;
	}
};

const actions = {
	autoLogin({ commit }) {
		console.log("AUTOLOGIN");
		const savedCartItems = JSON.parse(sessionStorage.getItem('autoGlassAddedToCartItems'));
		if (savedCartItems) {
			console.log("savedCartItems existing..");
			this.dispatch("modules/cart/autoLoadItems", {savedCartItems:savedCartItems});
		}
		const token = localStorage.getItem('autoGlassToken');
		if (!token) {
			return;
		}
		const expirationDate = new Date(localStorage.getItem('autoGlassExpiresIn'));
		const now = new Date();
		if (now >= expirationDate) {
			localStorage.removeItem('autoGlassToken');
			localStorage.removeItem('autoGlassExpiresIn');
			localStorage.removeItem('autoGlassUserDetails');
			return;
		}
		const userDetails = JSON.parse(localStorage.getItem('autoGlassUserDetails'));
		let expirationPeriodInMillisec = expirationDate.getTime() - now.getTime();
		this.dispatch("modules/auth/setLogoutTimer", expirationPeriodInMillisec);
		commit('LOGIN', {
			userDetails: userDetails,
			token: token
		});
	},
	async login({commit}, {email, password}) {
		let endPoint = 'Token',
			postBody = 'Username=' + email + '&Password=' + password + '&grant_type=password';
		this.dispatch("modules/requester/request", {
			method: 'post',
			endpoint: endPoint, 
			body: postBody, 
			token: ''
		}).then(res => {
			// console.log("login res -> ", res);
			const token = res.data.token_type + ' ' + res.data.access_token,
				now = new Date(),
				expirationDate = new Date(now.getTime() + res.data.expires_in * 1000);
			localStorage.setItem('autoGlassToken', token);
			localStorage.setItem('autoGlassExpiresIn', expirationDate);
			this.dispatch("modules/auth/getUserDetailsFromApi", token);
			this.dispatch("modules/general/setSnackbarNotification", {
				message: "Login successful. You'll be automatically redirected to 'Advanced search' page.",
				status: 'success'
			});
		}).catch(e => {
			console.log("error: ", e);
			this.dispatch("modules/general/setSnackbarNotification", {
				message: e,
				status: 'error'
			});
		});
	},
	logout({commit}) {
		localStorage.removeItem('autoGlassToken');
		localStorage.removeItem('autoGlassExpiresIn');
		localStorage.removeItem('autoGlassUserDetails');
		commit('LOGOUT');
		console.log("in logout...");
		this.dispatch("modules/general/setSnackbarNotification", {
			message: "Logout successful!",
			status: "success"
		});
	},
	async getUserDetailsFromApi({commit}, token) {
		let endPoint = 'api/Account/';
		this.dispatch("modules/requester/request", {
			method: 'get',
			endpoint: endPoint,
			token: token
		}).then(res => {
			// console.log("getUserDetailsFromApi res -> ", res);
			localStorage.setItem('autoGlassUserDetails', JSON.stringify(res.data));
			commit('LOGIN', {
				userDetails: res.data,
				token: token
			});
		}).catch(e => {
			console.log("error: ", e);
		});
	},
	setLogoutTimer({commit}, period) {
		setTimeout(() => {
			this.dispatch("modules/auth/logout");
		}, period);
	},
	async register({commit}, userDetails) {
		let endPoint = "api/Account/Register";
		console.log("register userDetails -> ", userDetails);
		this.dispatch("modules/requester/request", {
			method: 'post',
			endpoint: endPoint, 
			body: userDetails, 
			token: ''
		}).then(res => {
			// console.log("register res -> ", res);
			this.dispatch("modules/general/setSnackbarNotification", {
				message: "Registration successful. Please check your email for confirmation.",
				status: 'success'
			});
		}).catch(e => {
			// console.log("error: ", e.response.data.ModelState[""][1]);
			this.dispatch("modules/general/setSnackbarNotification", {
				message: e.response.data.Message + " " + e.response.data.ModelState && e.response.data.ModelState[""] && e.response.data.ModelState[""][1],
				status: 'error'
			});
		});
	}
};

export default {
	namespaced: false,
	getters,
	state,
	mutations,
	actions
};
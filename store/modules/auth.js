import usersRepository from "~/repositories/usersRepository";
import ordersRepository from "~/repositories/ordersRepository";

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
    token: "",
    isLoggedIn: false,
    usersList: [],
    ordersList: [],
    ordersFilter: "All"
});

const mutations = {
    LOGIN(state, data) {
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
        state.token = "";
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
    },
    SET_USERS_LIST(state, users) {
        state.usersList = users;
    },
    SET_ORDERS_LIST(state, orders) {
        state.ordersList = orders;
    },
    SET_ORDERS_FILTER(state, filter) {
        state.ordersFilter = filter;
    },
    SET_USER_HIGH_COST_VISIBILITY(state, { user, visibility }) {
        const userCached = state.usersList.find(u => u === user);

        userCached.OnlyHighCostVisible = visibility;
    },
    SET_USER_ALLOWED_DEFERRED_PAYMENT(state, { user, allowed }) {
        const userCached = state.usersList.find(u => u === user);

        userCached.IsDeferredPaymentAllowed = allowed;
    },
    SET_USER_PERCENTAGE_REDUCTION(state, { user, percentage }) {
        const userCached = state.usersList.find(u => u === user);

        userCached.PercentageReduction = percentage;
    },
    SET_USER_EMAIL_CONFIRMED(state, { user, confirmed }) {
        const userCached = state.usersList.find(u => u === user);

        userCached.EmailConfirmed = confirmed;
    },
    SET_ADDRESS(state, { city, country, address, phoneNumber }) {
        const user = state.userDetails;

        user.DeliveryCountry = country;
        user.DeliveryTown = city;
        user.DeliveryAddress = address;
        user.PhoneNumber = phoneNumber;
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
    },
    getUsers(state) {
        return state.usersList;
    },
    getOrders(state) {
        return state.ordersList;
    },
    getOrdersFilter(state) {
        return state.ordersFilter;
    }
};

const actions = {
    autoLogin({ commit }) {
        const savedCartItems = JSON.parse(
            sessionStorage.getItem("autoGlassAddedToCartItems")
        );
        if (savedCartItems) {
            this.dispatch("modules/cart/autoLoadItems", {
                savedCartItems: savedCartItems
            });
        }
        const token = localStorage.getItem("autoGlassToken");
        if (!token) {
            return;
        }
        const expirationDate = new Date(
            localStorage.getItem("autoGlassExpiresIn")
        );
        const now = new Date();
        if (now >= expirationDate) {
            localStorage.removeItem("autoGlassToken");
            localStorage.removeItem("autoGlassExpiresIn");
            localStorage.removeItem("autoGlassUserDetails");
            return;
        }
        const userDetails = JSON.parse(
            localStorage.getItem("autoGlassUserDetails")
        );
        let expirationPeriodInMillisec =
            expirationDate.getTime() - now.getTime();
        this.dispatch(
            "modules/auth/setLogoutTimer",
            expirationPeriodInMillisec
        );
        commit("LOGIN", {
            userDetails: userDetails,
            token: token
        });
    },
    async login({ commit }, { email, password }) {
        let endPoint = "Token",
            postBody =
                "Username=" +
                email +
                "&Password=" +
                password +
                "&grant_type=password";
        return this.dispatch("modules/requester/request", {
            method: "post",
            endpoint: endPoint,
            body: postBody,
            token: ""
        })
            .then(res => {
                const token = res.data.token_type + " " + res.data.access_token,
                    now = new Date(),
                    expirationDate = new Date(
                        now.getTime() + res.data.expires_in * 1000
                    );
                localStorage.setItem("autoGlassToken", token);
                localStorage.setItem("autoGlassExpiresIn", expirationDate);
                return this.dispatch(
                    "modules/auth/getUserDetailsFromApi",
                    token
                ).then(() => {
                    this.dispatch("modules/general/setSnackbarNotification", {
                        message: "Успешен вход",
                        status: "success"
                    });
                });
            })
            .catch(e => {
                if (e.response && e.response.data) {
                    const { error_description } = e.response.data;
                    if (error_description === "Account pending approval.") {
                        this.dispatch(
                            "modules/general/setSnackbarNotification",
                            {
                                message: "Регистрацията не е потвърдена",
                                status: "error"
                            }
                        );
                    } else {
                        this.dispatch(
                            "modules/general/setSnackbarNotification",
                            {
                                message: "Грешен имейл или парола",
                                status: "error"
                            }
                        );
                    }
                } else {
                    this.dispatch("modules/general/setSnackbarNotification", {
                        message: "Грешен имейл или парола",
                        status: "error"
                    });
                }

                throw e;
            });
    },
    logout({ commit }) {
        localStorage.removeItem("autoGlassToken");
        localStorage.removeItem("autoGlassExpiresIn");
        localStorage.removeItem("autoGlassUserDetails");
        commit("LOGOUT");
        commit("SET_ORDERS_LIST", []);
        commit("SET_USERS_LIST", []);

        this.dispatch("modules/general/setSnackbarNotification", {
            message: "Изход!",
            status: "success"
        });
    },
    async getUserDetailsFromApi({ commit }, token) {
        let endPoint = "api/Account/";
        return this.dispatch("modules/requester/request", {
            method: "get",
            endpoint: endPoint,
            token: token
        })
            .then(res => {
                localStorage.setItem(
                    "autoGlassUserDetails",
                    JSON.stringify(res.data)
                );
                commit("LOGIN", {
                    userDetails: res.data,
                    token: token
                });
            })
            .catch(e => {
                console.log("error: ", e);
            });
    },
    setLogoutTimer({ commit }, period) {
        setTimeout(() => {
            this.dispatch("modules/auth/logout");
        }, period);
    },
    async register({ commit }, userDetails) {
        let endPoint = "api/Account/Register";
        return this.dispatch("modules/requester/request", {
            method: "post",
            endpoint: endPoint,
            body: userDetails,
            token: ""
        }).then(res => {
            this.dispatch("modules/general/setSnackbarNotification", {
                message:
                    "Registration successful. Please check your email for confirmation.",
                status: "success"
            });
        });
    },
    async getUsers({ commit }, { token }) {
        return usersRepository.getUsers({ token }).then(users => {
            commit("SET_USERS_LIST", users);
        });
    },
    async getOrders({ commit, state }, { token }) {
        return ordersRepository
            .getOrders({ token }, state.ordersFilter)
            .then(orders => {
                commit("SET_ORDERS_LIST", orders);
            });
    },
    async getOrdersAdmin({ commit, state }, { token }) {
        return ordersRepository
            .getOrdersAdmin({ token }, state.ordersFilter)
            .then(orders => {
                commit("SET_ORDERS_LIST", orders);
            });
    },
    setOrdersFilter({ commit }, filter) {
        commit("SET_ORDERS_FILTER", filter);
    },
    async setUserHighCostVisibility({ commit, state }, { user, visibility }) {
        const token = state.token;
        commit("SET_USER_HIGH_COST_VISIBILITY", { user, visibility });
        return usersRepository.setUserHighCostVisibility({
            token,
            user,
            visibility
        });
    },
    async setUserAllowedDeferredPayment({ commit, state }, { user, allowed }) {
        const token = state.token;
        commit("SET_USER_ALLOWED_DEFERRED_PAYMENT", { user, allowed });
        return usersRepository.setUserAllowedDeferredPayment({
            token,
            user,
            allowed
        });
    },
    async setUserPercentageReduction({ commit, state }, { user, percentage }) {
        const token = state.token;
        commit("SET_USER_PERCENTAGE_REDUCTION", { user, percentage });
        return usersRepository.setUserPercentageReduction({
            token,
            user,
            percentage
        });
    },
    async sendUserConfirmationMail({ commit, state }, { user }) {
        const token = state.token;
        const confirmed = true;
        commit("SET_USER_EMAIL_CONFIRMED", { user, confirmed });
        return usersRepository.sendConfirmationMail({ token, user });
    },
    async changeUserPassword(
        { commit, state },
        { OldPassword, NewPassword, ConfirmPassword }
    ) {
        const token = state.token;
        return usersRepository.changeUserPassword({
            token,
            OldPassword,
            NewPassword,
            ConfirmPassword
        });
    },
    async changeUserDetails({ commit, state }, { user }) {
        const token = state.token;
        return usersRepository.changeUserDetails({ token, user });
    },
    async changeUserAddress(
        { commit, state },
        { city, country, address, phoneNumber }
    ) {
        const token = state.token;
        const user = state.userDetails;
        commit("SET_ADDRESS", { city, country, address, phoneNumber });
        return usersRepository.changeUserDetails({ token, user });
    },
    async changeOrderStatus({ commit, state }, { order, status }) {
        const token = state.token;
        commit("SET_ORDER_STATUS", { order, status });
        return ordersRepository.changeStatus({ token, order, status });
    }
};

export default {
    namespaced: false,
    getters,
    state,
    mutations,
    actions
};

import baseRepository from "./baseRepository";


class UsersRepository {
	constructor() {
		this.http = baseRepository;
		this.URL = {
			getUsers: "Administration/ManageUsers",
			updateUser: "Administration/ManageUsers/UpdateUserInfo",
			emailConfirmation: "Administration/ManageUsers/SendEmailConfirmation",
			changePassword: "Account/ChangePassword",
			changeDetails: "Account/UpdateUserInfo",
		};
	}

	getUsers({ token }) {
		return this.http.get(this.URL.getUsers, null, null, { Authorization: token });
	}

	setUserHighCostVisibility({ token, user, visibility }) {
		const updated = { ...user, OnlyHighCostVisible: visibility };
		return this.http.post(this.URL.updateUser, updated, null, { Authorization: token });
	}

	setUserAllowedDeferredPayment({ token, user, allowed }) {
		const updated = { ...user, IsDeferredPaymentAllowed: allowed };
		return this.http.post(this.URL.updateUser, updated, null, { Authorization: token });
	}

	setUserPercentageReduction({ token, user, percentage }) {
		const updated = { ...user, PercentageReduction: percentage };
		return this.http.post(this.URL.updateUser, updated, null, { Authorization: token });
	}

	sendConfirmationMail({ token, user }) {
		return this.http.post(this.URL.emailConfirmation, user, null, { Authorization: token });
	}

	changeUserPassword( { token, OldPassword, NewPassword, ConfirmPassword }) {
		return this.http.post(this.URL.changePassword, { OldPassword, NewPassword, ConfirmPassword }, null, { Authorization: token });
	}

	changeUserDetails( { token, user }) {
		console.log(user);
		return this.http.post(this.URL.changeDetails, user, null , { Authorization: token });
	}
}

const usersRepository = new UsersRepository;

global.users = usersRepository;

export default usersRepository;

import baseRepository from "./baseRepository";


class UsersRepository {
	constructor() {
		this.http = baseRepository;
		this.URL = {
			getUsers: "Administration/ManageUsers"
		};
	}

	getUsers({ token }) {
		console.log(token);
		return this.http.get(this.URL.getUsers, null, null ,{ Authorization: token });
	}
}

const usersRepository = new UsersRepository;

global.users = usersRepository;

export default usersRepository;

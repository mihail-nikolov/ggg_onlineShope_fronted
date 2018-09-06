import baseRepository from "./baseRepository";
import productsRepository from "./productsRepository";

class OrdersRepository {
	constructor() {
		this.http = baseRepository;
		this.URL = {
			getOrders: "Administration/ManageOrderedItems"
		};
	}

	getOrders({ token }, filter = "All") {
		const done = filter === "Done";
		const ordered = filter === "Ordered";
		const pending = filter === "New";

		return this.http.get(this.URL.getOrders, { done, ordered, pending }, null , { Authorization: token });
	}
}

const ordersRepository = new OrdersRepository;

global.orders = ordersRepository;

export default ordersRepository;

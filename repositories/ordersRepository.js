import baseRepository from "./baseRepository";
import productsRepository from "./productsRepository";

class OrdersRepository {
	constructor() {
		this.http = baseRepository;
		this.URL = {
			getOrders: "Administration/ManageOrderedItems",
			changeStatus: "Administration/ManageOrderedItems/update"
		};
	}

	getOrders({ token }, filter = "All") {
		const done = filter === "Done";
		const ordered = filter === "Ordered";
		const pending = filter === "New";

		return this.http.get(this.URL.getOrders, { done, ordered, pending }, null , { Authorization: token });
	}

	changeStatus({ token, order, status }) {
		return this.http.post(this.URL.changeStatus, { Id: order.Id, Status: status }, null , { Authorization: token });
	}
}

const ordersRepository = new OrdersRepository;

global.orders = ordersRepository;

export default ordersRepository;

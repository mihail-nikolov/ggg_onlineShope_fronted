import baseRepository from "./baseRepository";
import productsRepository from "./productsRepository";

class OrdersRepository {
    constructor() {
        this.http = baseRepository;
        this.URL = {
            getOrders: "Account/GetMyOrders",
            getOrdersAdmin: "Administration/ManageOrderedItems",
            changeStatus: "Administration/ManageOrderedItems/update",
            makeOrder: "Orders/order"
        };
    }

    getOrders({ token }, filter = "All") {
        const done = filter === "Done";
        const ordered = filter === "Ordered";
        const pending = filter === "New";

        return this.http.get(
            this.URL.getOrders,
            { done, ordered, pending },
            null,
            { Authorization: token }
        );
    }

    getOrdersAdmin({ token }, filter = "All") {
        const done = filter === "Done";
        const ordered = filter === "Ordered";
        const pending = filter === "New";

        return this.http.get(
            this.URL.getOrdersAdmin,
            { done, ordered, pending },
            null,
            { Authorization: token }
        );
    }

    changeStatus({ token, order, status }) {
        return this.http.post(
            this.URL.changeStatus,
            { Id: order.Id, Status: status },
            null,
            { Authorization: token }
        );
    }

    /*
	*   [Required] string Manufacturer
		[Required] double Price
		[Required] DeliveryStatus Status -> “New”, “Ordered”, “Done”
		[Required] bool WithInstallation
		[Required] bool IsInvoiceNeeded
		[Required] string Description
		string EuroCode
		string OtherCodes
		string DeliveryNotes
		double PaidPrice
		[Required]  string AnonymousUserЕmail
		[Required]  string AnonymousUserInfo
		string UserId – if registered user orders it
		[Required] string FullAddress
	* */
    order({ order, token }) {
        return this.http.post(this.URL.makeOrder, order, null, {
            Authorization: token
        });
    }
}

const ordersRepository = new OrdersRepository();

global.orders = ordersRepository;

export default ordersRepository;

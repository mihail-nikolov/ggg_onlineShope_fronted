<template>
    <v-container>
        <v-card flat class="admin__card">
            <h2 class="admin__title">Поръчки</h2>
            <div class="filters">
                <v-btn
                    :flat="ordersFilter !== ''"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('')"
                >Всички</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Accepted'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Accepted')"
                >Приети</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Ordered'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Ordered')"
                >Поръчани</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Unpaid'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Unpaid')"
                >Неплатени</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Expired'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Expired')"
                >Изтекли</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Denied'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Denied')"
                >Отказани</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Paid'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Paid')"
                >Платени</v-btn>
                <v-btn
                    :flat="ordersFilter !== 'Done'"
                    v-bind:style="{ marginLeft: 0, marginRight: '15px' }"
                    @click="selectOrderFilter('Done')"
                >Завършени</v-btn>
            </div>
        </v-card>
        <div class="orders-list" v-if="orderGroups.length">
            <div v-for="order in listComponentItems" :key="order.Id" class="order-group">
                <!-- <div class="date-delimeter">{{ date }}</div> -->
                <order-card
                    :key="order.Id"
                    :order="order"
                    :editable="isAdmin"
                    @statusChanged="onChangeOrderStatus"
                ></order-card>
            </div>
            <v-container fluid class="text-xs-center"
                v-if="(orderGroups.length > maxElementsToShow)"
            >
                <v-pagination class="pagination" :length.number="paginationLengthOrders"
                    @input="scrollToResults" v-model="pageNumProducts" :total-visible="7"
                ></v-pagination>
            </v-container>
        </div>
        <div v-else>
            <h2 class="no-data-label">Няма намерени поръчки</h2>
        </div>
    </v-container>
</template>

<script>
import OrderCard from "~/components/OrderCard";

const orderStatusMap = {
    Done: "Завършена",
    Unpaid: "Неплатени",
    Paid: "Платени",
    Accepted: "Приети",
    Denied: "Отказани",
    Expired: "Изтекли",
    Ordered: "Поръчани"
};

export default {
    layout: "my",
    components: {
        "order-card": OrderCard
    },
    data() {
        return {
            ordersRequested: false,
            pageNumProducts: 1,
            maxElementsToShow: 10,
            // filteredOrders: []
        };
    },
    computed: {
        token() {
            return this.$store.getters["modules/auth/getToken"];
        },
        isAdmin() {
            const user = this.$store.getters["modules/auth/getUserDetails"];
            return user && user.Email === "admin@admin.com";
        },
        orderGroups() {
            // const orders = 
            return this.$store.getters["modules/auth/getOrders"];
            // const orderGroups = {};
            // let empty = true;

            // orders.forEach(order => {
            //     const orderDateString = this.getDateString(order.CreatedOn);
            //     if (orderGroups[orderDateString]) {
            //         orderGroups[orderDateString].push(order);
            //     } else {
            //         orderGroups[orderDateString] = [order];
            //     }
            //     empty = false;
            // });
            // // console.log(orderGroups);
            // return empty ? null : orderGroups;
        },
        orderStatusModels() {
            const orders = this.$store.getters["modules/auth/getOrders"];
            const statuses = {};

            orders.forEach(order => {
                statuses[order.Id] = order.Status;
            });

            return statuses;
        },
        paginationLengthOrders() {
            if (this.orderGroups.length) {
                return Math.ceil(this.orderGroups.length / this.maxElementsToShow);
            }
        },
        listComponentItems() {
            let startElem = (this.pageNumProducts - 1) * this.maxElementsToShow;
            if (this.orderGroups.length) {
                return this.orderGroups.slice(startElem,this.maxElementsToShow * this.pageNumProducts);
            }
        },
        ordersFilter() {
            return this.$store.getters["modules/auth/getOrdersFilter"];
        }
    },
    watch: {
        token() {
            if (this.token) {
                this.fetchOrders();
            }
        }
    },
    methods: {
        getDateString(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();

            return `${day}.${month}.${year}`;
        },
        scrollToResults() {
            const ordersContainer = document.body.querySelector(
                "main.content .orders-list"
            );

            scrollTo(ordersContainer.offsetTop - 120, 300);
        },
        selectOrderFilter(filter) {
            if (this.token) {
                const token = this.token;
                const action = this.isAdmin
                    ? "modules/auth/getOrdersAdmin"
                    : "modules/auth/getOrders";
                this.$store.dispatch("modules/auth/setOrdersFilter", filter);
                this.$store.dispatch(action, { token });
            }
        },
        mapOrderStatus(status) {
            return orderStatusMap[status] || status;
        },
        fetchOrders() {
            const token = this.token;
            if (token && !this.ordersRequested) {
                const action = this.isAdmin
                    ? "modules/auth/getOrdersAdmin"
                    : "modules/auth/getOrders";
                this.$store.dispatch(action, { token });
                this.ordersRequested = true;
            }
        },
        onChangeOrderStatus({ order, status }) {
            this.$store.dispatch("modules/auth/changeOrderStatus", {
                order,
                status
            });
        }
    },
    created() {
        this.fetchOrders();
    }
};
</script>

<style scoped>
.admin__title {
    display: flex;
    font-size: 30px;
    line-height: 1;
    margin-bottom: 20px;
}
.text-xs-center {
    clear: both;
}

.admin__card {
    padding: 20px;
}

.search-multiselect {
    background-color: transparent;
    display: inline-block;
    width: 100%;
    height: 40px;
}
.pagination {
    margin-top: 10px;
}
.date-delimeter {
    display: flex;
    align-items: center;
    font-size: 21px;
    color: rgba(0, 0, 0, 0.64);
}
.no-data-label {
    font-size: 21px;
    color: rgba(0, 0, 0, 0.64);
}
.date-delimeter::before,
.date-delimeter::after {
    flex: 1;
    content: "";
    height: 1px;
    background: rgba(0, 0, 0, 0.12);
    margin: 0 10px;
}
.order-group {
    padding: 30px 0;
}
</style>

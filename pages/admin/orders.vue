<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Поръчки</h2>
            <div class="filters">
                <v-btn :flat="ordersFilter !== 'All'" v-bind:style="{ marginLeft: 0, marginRight: '15px' }" @click="selectOrderFilter('All')">Всички</v-btn>
                <v-btn :flat="ordersFilter !== 'New'"  v-bind:style="{ marginLeft: 0, marginRight: '15px' }" @click="selectOrderFilter('New')">Нови</v-btn>
                <v-btn :flat="ordersFilter !== 'Done'"  v-bind:style="{ marginLeft: 0, marginRight: '15px' }" @click="selectOrderFilter('Done')">Завършени</v-btn>
            </div>
        </v-card>
        <div class="orders-list" v-if="orderGroups">
            <div v-for="(group, date) in orderGroups" class="order-group">
                <div class="date-delimeter">{{ date }}</div>
                <v-card v-for="order in group" :key="order.Id" class="order">
                    <div>
                        <b>#{{ order.EuroCode }}</b>&nbsp;<span>{{ order.Description }} ({{ order.Manufacturer }})</span> - <span class="order__status">{{ mapOrderStatus(order.Status) }}</span>
                    </div>
                    <div>
                        <span>Потребител: </span>
                        {{ order.UserInfo }} - {{ order.UserЕmail }}
                    </div>
                    <div>
                        <span>Адрес: </span>
                        {{ order.FullAddress }}
                    </div>
                    <div>
                        <span>Описание: </span>
                        {{ order.DeliveryNotes || ' - ' }}
                    </div>
                    <v-flex style="display: flex;">
                        <v-chip v-if="order.WithInstallation">+ Инсталация </v-chip>
                        <v-chip v-if="order.IsInvoiceNeeded">+ Фактура </v-chip>

                        <v-chip v-if="order.PaidPrice">+ Платено: {{ order.PaidPrice }}</v-chip>
                        <v-chip v-else>- Неплатено</v-chip>

                        <v-spacer></v-spacer>

                        <b class="order__price">
                            {{ order.Price }}лв.
                        </b>
                    </v-flex>
                </v-card>
            </div>
        </div>
        <div v-else>
            <h2 class="no-data-label">Все още няма направени поръчки</h2>
        </div>
    </v-container>
</template>

<script>
	import ProductCard from '~/components/ProductCard';

	const orderStatusMap = {
		"Done": "Завършена",
		"New": "Нова",
		"Ordered": "Приета"
	};

	export default {
		layout: 'admin',
		components: {
			'product-card': ProductCard
		},
		computed: {
			token() {
				return this.$store.getters["modules/auth/getToken"];
			},
			orderGroups() {
				const orders = this.$store.getters["modules/auth/getOrders"];
				const orderGroups = {};
				let empty = true;

				orders.forEach(order => {
					const orderDateString = this.getDateString(order.CreatedOn);
					if (orderGroups[orderDateString]) {
						orderGroups[orderDateString].push(order);
					}
					else {
						orderGroups[orderDateString] = [order];
					}
					empty = false;
				});

				return empty ? null : orderGroups;
			},
			ordersFilter() {
				return this.$store.getters["modules/auth/getOrdersFilter"];
			}
		},
		methods: {
			getDateString(dateString) {
				const date = new Date(dateString);
				const year = date.getFullYear();
				const month = date.getMonth();
				const day = date.getDate();

				return `${day}.${month}.${year}`;
			},
			selectOrderFilter(filter) {
				if (this.token) {
					const token = this.token;
					this.$store.dispatch("modules/auth/setOrdersFilter", filter);
					this.$store.dispatch("modules/auth/getOrders", { token });
				}
			},
			mapOrderStatus(status) {
				return orderStatusMap[status] || status;
			}
		},
		created() {
			if (this.token) {
				const token = this.token;
				this.$store.dispatch("modules/auth/getOrders", { token });
			}
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
    .admin__card {
        padding: 20px;
    }

    .date-delimeter {
        display: flex;
        align-items: center;
        font-size: 21px;
        color: rgba(0, 0, 0, .64);
    }
    .no-data-label {
        font-size: 21px;
        color: rgba(0, 0, 0, .64);
    }
    .date-delimeter::before,
    .date-delimeter::after {
        flex: 1;
        content: '';
        height: 1px;
        background: rgba(0, 0, 0, .12);
        margin: 0 10px;
    }
    .order-group {
        padding: 30px 0;
    }
    .order {
        padding: 20px;
        margin-bottom: 25px;
        margin-top: 25px;
    }
    .order > * {
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .orders-list {
        max-height: calc(100vh - 170px);
        margin-left: -5px;
        margin-right: -5px;
        padding-left: 5px;
        padding-right: 5px;
        overflow: scroll;
    }
</style>

<template>
	<v-card class="order">
		<div>
			<b>#{{ order.EuroCode }}</b>&nbsp;<span>{{ order.Description }} ({{ order.Manufacturer }})</span> - <span class="order__status">
			<multiselect class="status-multiselect" v-if="editable" v-model="status" :allow-empty="false" @select="onChangeOrderStatus" :options="orderStatuses" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери статус"></multiselect>
			<span v-else>{{ status }}</span></br>
			<span>други кодове:</span><b>{{ order.OtherCodes }}</b>
		</span>
		</div>
		<div v-if="order.UserInfo || order.UserEmail">
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
			<v-chip v-if="order.WithInstallation">+ Монтаж</v-chip>
			<v-chip v-if="order.IsInvoiceNeeded">+ Фактура</v-chip>

			<v-chip v-if="order.PaidPrice">+ Платено: {{ order.PaidPrice }}</v-chip>
			<v-chip v-else>- Неплатено</v-chip>

			<v-spacer></v-spacer>

			<b class="order__price">
				{{ order.Price }}лв.
			</b>
		</v-flex>
	</v-card>
</template>

<script>
	import Multiselect from 'vue-multiselect';

	const orderStatusMap = {
		"Done": "Завършена",
		"New": "Нова",
		"Ordered": "Приета",
		"Завършена": "Done",
		"Нова": "New",
		"Приета": "Ordered"
	};

	export default {
		name: "orderCard",
		props: [ "order", "editable" ],
		data() {
			return {
				status: null,
				orderStatuses: ["Завършена", "Нова", "Приета"]
			};
		},
		created() {
			this.status = this.mapOrderStatus(this.order.Status);
		},
		methods: {
			mapOrderStatus(status) {
				return orderStatusMap[status] || status;
			},
			onChangeOrderStatus(status) {
				const reverseMapped = this.mapOrderStatus(status);
				console.log(status);
				this.$emit("statusChanged", {
					order: this.order,
					status: reverseMapped
				});
			}
		},
		components: {
			'multiselect': Multiselect
		}
	};
</script>

<style scoped>
	.order {
		padding: 20px;
		margin-bottom: 25px;
		margin-top: 25px;
	}
	.order > * {
		margin-top: 10px;
		margin-bottom: 10px;
	}

	.status-multiselect {
		display: inline-block;
		width: 160px;
		border: none;
	}
</style>
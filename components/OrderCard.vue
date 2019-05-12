<template>
    <v-container fluid grid-list-sm>
        <v-layout row wrap>
            <v-flex>
                <v-card class="ma-3">
                    <v-card-title>{{order.CreatedOn}}</v-card-title>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md3>
                                <span>
                                    <multiselect
                                        class="status-multiselect"
                                        v-if="editable"
                                        v-model="status"
                                        :allow-empty="false"
                                        @select="onChangeOrderStatus"
                                        :options="orderStatuses"
                                        deselect-label="Премахни"
                                        :searchable="true"
                                        :close-on-select="true"
                                        :show-labels="false"
                                        placeholder="Избери статус"
                                    ></multiselect>
                                    <span v-else>{{ status }}</span>
                                </span>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap justify-space-between>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    readonly
                                    label="Обща сума:"
                                    :value="order.Price.toFixed(2)"
                                    suffix="лв."
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    readonly
                                    label="Платена сума:"
                                    :value="order.PaidPrice.toFixed(2)"
                                    suffix="лв."
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md3>
                                <v-text-field
                                    readonly
                                    label="Процент отстъпка:"
                                    :value="order.DiscountPercentage"
                                    suffix="%"
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    readonly
                                    label="Адрес:"
                                    :value="order.FullAddress"
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 offset-md2>
                                <v-text-field
                                    readonly
                                    label="Допълнителна информация за доставката:"
                                    :value="order.DeliveryNotes"
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                    readonly
                                    label="Потребител: "
                                    :value="order.UserЕmail"
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6>
                                <v-text-field
                                    readonly
                                    label="Информация за потребителя: "
                                    :value="order.UserInfo"
                                    outline
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs4 sm2 md1>
                                <v-chip v-if="order.WithInstallation">+ Монтаж</v-chip>
                                <v-chip v-if="order.IsInvoiceNeeded">+ Фактура</v-chip>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-data-table
                        hide-actions
                        :headers="orderItemsHeaders"
                        :items="order.OrderedItems"
                    >
                        <template slot="items" scope="props">
                            <td>{{ props.item.EuroCode }}</td>
                            <td class="text-md-left">{{ props.item.Price.toFixed(2) }}</td>
                            <td class="text-md-left">{{ props.item.Manufacturer }}</td>
                            <td class="text-md-left">{{ props.item.OtherCodes }}</td>
                            <td class="text-md-left">{{ props.item.Description }}</td>
                        </template>
                    </v-data-table>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Multiselect from "vue-multiselect";

const orderStatusMap = {
    Done: "Завършена",
    New: "Нова",
    Ordered: "Приета",
    Завършена: "Done",
    Нова: "New",
    Приета: "Ordered"
};

export default {
    name: "orderCard",
    props: ["order", "editable"],
    data() {
        return {
            status: null,
            orderStatuses: ["Завършена", "Нова", "Приета"],
            orderItemsHeaders: [
                { text: "Еврокод", align: "left", value: "EuroCode" },
                { text: "Цена", value: "Price" },
                { text: "Производител", value: "Manufacturer" },
                { text: "Други кодове", value: "OtherCodes" },
                { text: "Описание", value: "Description" }
            ]
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
            this.$emit("statusChanged", {
                order: this.order,
                status: reverseMapped
            });
        }
    },
    components: {
        multiselect: Multiselect
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
<template>
    <v-content v-if="openDialog" class="details-dialog">
        <v-container fluid style="width: 100%;height: 100px;">
            <no-ssr>
                <v-dialog v-model="openDialog" max-width="650" max-height="450">
                    <v-card>
                        <v-container fluid grid-list-sm>
                            <v-layout wrap>
                                <v-flex xs12 class="details-dialog-carousel-container">
                                    <v-carousel xs12 class="details-dialog-carousel">
                                        <v-carousel-item
                                            v-for="(image,i) in curProductDetails.Images"
                                            :src="image"
                                            :key="i"
                                            contain
                                        ></v-carousel-item>
                                    </v-carousel>
                                </v-flex>
                                <v-flex xs12 column>
                                    <v-flex xs12 column>
                                        <v-card-text>
                                            <div v-if="curProductDetails.Description">
                                                <h4>Описание</h4>
                                                <div>{{curProductDetails.Description}}</div>
                                                <br>
                                            </div>
                                            <div class="text-container">
                                                <div
                                                    v-if="curProductDetails.EuroCode"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Eurocode</h4>
                                                    <div>{{curProductDetails.EuroCode}}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.MaterialNumber"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Material Number</h4>
                                                    <div>{{curProductDetails.MaterialNumber}}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.IndustryCode"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Industry Code</h4>
                                                    <div>{{curProductDetails.IndustryCode}}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.OesCode"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Oes Code</h4>
                                                    <div>{{curProductDetails.OesCode}}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.LocalCode"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Local Code</h4>
                                                    <div>{{curProductDetails.LocalCode}}</div>
                                                    <br>
                                                </div>
                                            </div>
                                            <div style="clear:both">
                                                <h4>Тип</h4>
                                                <div>{{curProductDetails.ProductType}}</div>
                                            </div>
                                            <br>
                                            <div class="text-container" style="clear:both">
                                                <div
                                                    v-if="curProductDetails.Height"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Височина:</h4>
                                                    <div>{{ curProductDetails.Height }}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.Width"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Дължина</h4>
                                                    <div>{{ curProductDetails.Width }}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.FittingTimeHours"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Време за монтаж:</h4>
                                                    <div>{{ curProductDetails.FittingTimeHours }}</div>
                                                    <br>
                                                </div>
                                                <div
                                                    v-if="curProductDetails.Tint"
                                                    class="floating-product-detail"
                                                >
                                                    <h4>Нюанс:</h4>
                                                    <div>{{ curProductDetails.Tint }}</div>
                                                    <br>
                                                </div>
                                                <div style="clear:both">
                                                    <div
                                                        v-if="curProductDetails.ModelDate"
                                                        class="floating-product-detail"
                                                    >
                                                        <h4>Година на модела:</h4>
                                                        <div>{{ curProductDetails.ModelDate }}</div>
                                                        <br>
                                                    </div>
                                                    <div
                                                        v-if="curProductDetails.PartDate"
                                                        class="floating-product-detail"
                                                    >
                                                        <h4>Година на частта:</h4>
                                                        <div>{{ curProductDetails.PartDate }}</div>
                                                        <br>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style="clear:both">
                                                <v-chip
                                                    v-if="curProductDetails.HasFittingMethod"
                                                >{{ "HasFittingMethod" }}</v-chip>
                                                <v-chip
                                                    v-if="curProductDetails.IsAcoustic"
                                                >{{ "IsAcoustic" }}</v-chip>
                                                <v-chip
                                                    v-if="curProductDetails.IsCalibration"
                                                >{{ "IsCalibration" }}</v-chip>
                                            </div>
                                            <div v-if="hasAnyAvailability()">
                                                <v-flex v-if="currentAccessoryAvailability.length">
                                                    <v-flex
                                                        row
                                                        class="text-xs-center"
                                                        style="margin-bottom:20px"
                                                    >
                                                        <h2
                                                            style="text-align:center; padding: 15px;"
                                                        >Производител</h2>
                                                    </v-flex>
                                                    <v-flex
                                                        row
                                                        class="text-xs-center"
                                                        style="margin-bottom:10px"
                                                    >
                                                        <div
                                                            class="group-card"
                                                            v-for="group in currentAccessoryAvailability"
                                                            @click="toggleSelectCartGroup(group)"
                                                            v-bind:class="{
																selected: selectedCartGroup === group.GoodId,
																disabled: !groupHasAvailability(group)
															}"
                                                        >{{ group.Group }} - {{ round(group.Price) }}лв.</div>
                                                    </v-flex>
                                                </v-flex>
                                                <v-flex v-if="selectedCartGroup !== null">
                                                    <v-flex
                                                        row
                                                        class="text-xs-center"
                                                        style="margin-bottom:20px"
                                                    >
                                                        <h2
                                                            style="text-align:center; padding: 15px;"
                                                        >Сервиз</h2>
                                                    </v-flex>
                                                    <v-flex
                                                        row
                                                        class="text-xs-center"
                                                        style="margin-bottom:10px"
                                                    >
                                                        <div
                                                            v-for="group in currentAccessoryAvailability"
                                                            v-if="group.GoodId === selectedCartGroup"
                                                        >
                                                            <div
                                                                class="group-card"
                                                                v-for="(quantity, store)  in group.StoreQUantities"
                                                                @click="quantity !== 0 && toggleSelectCartStore(group, store)"
                                                                v-bind:class="{
																selected: selectedCartStore === store,
																disabled: quantity === 0
															}"
                                                            >{{ store }} - {{ quantity }}бр.</div>
                                                        </div>
                                                    </v-flex>
                                                </v-flex>
                                            </div>
                                            <div v-else>
                                                <v-flex
                                                    row
                                                    class="text-xs-center"
                                                    style="margin-bottom:20px"
                                                >
                                                    <h2
                                                        style="text-align:center; padding: 15px;"
                                                    >Наличност</h2>
                                                </v-flex>
                                                <v-flex
                                                    row
                                                    class="text-xs-center"
                                                    style="margin-bottom:20px"
                                                >Този продукт не е в наличност. Можете да се свържете с нас от
                                                    <a
                                                        target="_blank"
                                                        href="http://www.glassgoldgroup.eu/%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D1%82%D1%8A%D0%BA%D0%BB%D0%B0-%D0%BE%D1%84%D0%B8%D1%81-%D1%81%D0%BE%D1%84%D0%B8%D1%8F-%D1%81%D0%BA%D0%BB%D0%B0%D0%B4-%D0%BF%D0%BB%D0%BE%D0%B2%D0%B4%D0%B8%D0%B2"
                                                    >тук</a>.
                                                </v-flex>
                                            </div>
                                        </v-card-text>
                                    </v-flex>
                                </v-flex>
                                <v-flex style="padding-bottom: 8px;">
                                    <v-card-actions style="padding: 0">
                                        <v-btn
                                            color="primary"
                                            v-bind:disabled="selectedCartGroup === null || selectedCartStore === null"
                                            @click="onAddCartCountDialogClick"
                                            v-if="hasAnyAvailability()"
                                        >
                                            <v-icon left>fa-cart-plus</v-icon>Добави
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                        <v-btn
                                            color="primary"
                                            flat
                                            @click="openDialog = false"
                                            style="padding-right:5px"
                                        >
                                            <v-icon>mdi-close</v-icon>Затвори
                                        </v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-dialog>
            </no-ssr>
        </v-container>
    </v-content>
</template>

<script>
import productsRepository from "~/repositories/productsRepository";

export default {
    name: "ProductDetailsDialog",
    props: ["dialogDetailsOpen", "curProductDetails"],
    data() {
        return {
            openDialog: false,
            selectedCartGroup: null,
            selectedCartStore: null
        };
    },
    computed: {
        currentAccessoryAvailability() {
            return this.$store.getters[
                "modules/products/getCurrentObservedAccessoryAvailability"
            ];
        }
    },
    methods: {
        round: num => num.toFixed(2),
        openAccessoryDialog(acc) {
            this.$emit("onOpenAccessoryDialog", acc);
            productsRepository.getFullProduct(acc).then(console.warn);
        },
        hasAnyAvailability() {
            for (const group of this.currentAccessoryAvailability) {
                if (this.groupHasAvailability(group) > 0) {
                    return true;
                }
            }
            return false;
        },
        toggleSelectCartGroup(group) {
            if (this.groupHasAvailability(group)) {
                if (this.selectedCartGroup === group.GoodId) {
                    this.selectedCartGroup = null;
                } else {
                    this.selectedCartGroup = group.GoodId;
                }
                this.selectedCartStore = null;
            }
        },
        toggleSelectCartStore(group, store) {
            if (this.groupHasAvailability(group)) {
                if (this.selectedCartStore === store) {
                    this.selectedCartStore = null;
                } else {
                    this.selectedCartStore = store;
                }
            }
        },
        groupHasAvailability(group) {
            let quantities = 0;

            for (const store in group.StoreQUantities) {
                const storeQuantity = group.StoreQUantities[store];
                quantities += storeQuantity;
            }

            return quantities > 0;
        },
        onAddCartCountDialogClick() {
            let comp = this,
                product = {};
            product.item = JSON.parse(JSON.stringify(comp.curProductDetails));
            product.cartCount = ~~comp.cartCount;
            product.cartGroupData = JSON.parse(
                JSON.stringify(this.cartGroupData)
            );
            product.selectedCartGroup = this.selectedCartGroup;
            product.selectedCartStore = this.selectedCartStore;
            comp.$store.dispatch("modules/cart/addItemToCart", {
                productToBeAdded: product,
                originalProduct: comp.curProductDetails
            });
            comp.cartCount = 1;
            comp.dialogCartCountOpen = false;
        }
    },
    watch: {
        dialogDetailsOpen(value) {
            this.openDialog = value;
        },
        openDialog(value) {
            if (value === false) {
                this.$emit("onCloseDetailsDialogClick", this.openDialog);
            }
        }
    }
};
</script>

<style lang="css" scoped>
.details-dialog-carousel-container {
    padding: 25px !important;
}
.details-dialog-carousel {
    height: 250px;
}

.details-dialog {
    clear: both;
    position: absolute;
}

.floating-product-detail {
    float: left;
    margin-right: 25px;
}
.codes-container {
    display: flex;
    flex-wrap: wrap;
}

.empty {
    color: rgba(33, 33, 33, 0.32);
}

.availability-container {
    display: flex;
    flex-wrap: wrap;
}

.availability-container .group {
    margin-right: 25px;
    margin-bottom: 25px;
}

.group-card {
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 10px;
    margin: 5px;
    will-change: background-color, opacity, box-shadow;
    transition: background-color 0.3s cubic-bezier(0, 0.5, 0, 0.5),
        opacity 0.3s cubic-bezier(0, 0.5, 0, 0.5),
        box-shadow 0.3s cubic-bezier(0, 0.5, 0, 0.5);
}

.group-card:hover {
    cursor: pointer;
    background-color: #f0f0f0;
}

.group-card.disabled {
    opacity: 0.3;
    cursor: not-allowed;
    background-color: #fff !important;
}

.group-card.selected {
    background-color: rgba(0, 100, 0, 0.15) !important;
    border-color: darkgreen;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.2);
}
</style>

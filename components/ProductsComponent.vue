<template>
    <v-content>
        <div class="products-container">
            <v-container class="products" v-if="foundProducts.length && productsAreFetched">
                <div class="all-products">
                    <product-card
                        class="product product-card"
                        v-for="(product, index) in listComponentItems"
                        :key="product.Id"
                        :product="product"
                        :color="picker(index)"
                        @onAddProductToCart="onAddProductToCart"
                        @onProductDetails="onProductDetails"
                    />
                </div>
                <v-container
                    fluid
                    class="text-xs-center"
                    v-if="(filteredProducts.length !== 0 && filteredProducts.length > maxElementsToShow) || (foundProducts.length > maxElementsToShow && filteredProducts.length === 0)"
                >
                    <v-pagination
                        class="pagination"
                        :length.number="paginationLengthProducts"
                        @input="scrollToResults"
                        v-model="pageNumProducts"
                        :total-visible="7"
                    ></v-pagination>
                </v-container>
            </v-container>
        </div>

        <!-- Details Dialog -->
        <product-details-dialog
            :dialogDetailsOpen="dialogDetailsOpen"
            :curProductDetails="curProductDetails"
            @onCloseDetailsDialogClick="onCloseDetailsDialogClick"
            @onOpenAccessoryDialog="onOpenAccessoryDialog"
        ></product-details-dialog>

        <!-- Acessory Details Dialog -->
        <accessory-details-dialog
            :dialogDetailsOpen="dialogDetailsAccessoryOpen"
            :curProductDetails="curProductAccessory"
            @onCloseDetailsDialogClick="onCloseDetailsAccessoryDialogClick"
        ></accessory-details-dialog>

        <!-- Cart count Dialog -->
        <v-content v-if="dialogCartCountOpen" class="cart-count-container">
            <v-container fluid style="width:100%;height:100px;background-color:white;">
                <no-ssr>
                    <v-dialog
                        v-model="dialogCartCountOpen"
                        :max-width="currentCartProductToAdd.ProductInfos.length ? 650 : 450"
                    >
                        <v-container row wrap align-center style="background-color:white;">
                            <div v-if="currentCartProductToAdd.ProductInfos.length">
                                <v-flex row class="text-xs-center" style="margin-bottom:20px">
                                    <h2 style="text-align:center; padding: 15px;">Производител</h2>
                                </v-flex>
                                <v-flex row class="text-xs-center" style="margin-bottom:10px">
                                    <div style="display: inline-block" v-for="group in this.currentCartProductToAdd.ProductInfos" :key="group.GoodId" >
                                        <span
                                            @click="toggleSelectCartGroup(group.GoodId)"
                                            :class="'group-card tooltip'
                                                    + (groupHasAvailability(group.GoodId) ? ' light-green accent-1' : ' yellow lighten-3')
                                                    + (selectedCartGroupId === group.GoodId ? 'selected' : '')"
                                        >   {{ group.Group }} - {{ round(group.Price) }}лв.
                                            <span class="tooltiptext">{{groupHasAvailability(group.GoodId)? "на склад": "доставка 3-5 работни дни" }} </span>
                                        </span>
                                    </div>
                                </v-flex>
                                <v-flex v-if="selectedCartGroupId !== null && groupHasAvailability(selectedCartGroupId)">
                                    <v-flex row  class="text-xs-center"  style="margin-bottom:20px">
                                        <h2 style="text-align:center; padding: 15px;">Налично в сервиз:</h2>
                                    </v-flex>
                                    <v-flex row class="text-xs-center" style="margin-bottom:10px" >
                                        <div style="display:inline-block"
                                            v-for="(quantity, store) in this.currentCartProductToAdd.ProductInfos.find(x => x.GoodId === selectedCartGroupId).StoreQUantities"                                            
                                            :key="store"
                                        ><span 
                                            @click="toggleSelectCartStore(store)"
                                            :class="'group-card ' + (selectedCartStore === store ? 'selected' : '')"
                                            v-if="quantity > 0">{{store}}</span>
                                        </div>
                                    </v-flex>
                                </v-flex>
                            </div>
                            <div v-else>
                                <v-flex row class="text-xs-center" style="margin-bottom:20px">
                                    <h2 style="text-align:center; padding: 15px;">Наличност</h2>
                                </v-flex>
                                <v-flex row style="margin-bottom:20px">
                                    Този продукт не е в наличност. Можете да се свържете с нас от
                                    <a
                                        target="_blank"
                                        href="http://www.glassgoldgroup.eu/%D0%B0%D0%B2%D1%82%D0%BE%D1%81%D1%82%D1%8A%D0%BA%D0%BB%D0%B0-%D0%BE%D1%84%D0%B8%D1%81-%D1%81%D0%BE%D1%84%D0%B8%D1%8F-%D1%81%D0%BA%D0%BB%D0%B0%D0%B4-%D0%BF%D0%BB%D0%BE%D0%B2%D0%B4%D0%B8%D0%B2"
                                    >тук</a>, или да направите запитване.
                                </v-flex>
                            </div>
                            <v-flex style="display:flex;">
                                <v-btn
                                    color="primary"
                                    v-bind:disabled="!canAddToCart()"
                                    @click="onAddCartCountDialogClick"
                                >
                                    <v-icon left>fa-cart-plus</v-icon>Добави
                                </v-btn>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" flat @click="dialogCartCountOpen = false">
                                    <v-icon left>mdi-close</v-icon>Затвори
                                </v-btn>
                            </v-flex>
                        </v-container>
                    </v-dialog>
                </no-ssr>
            </v-container>
        </v-content>
    </v-content>
</template>

<script>
import ProductCard from "~/components/ProductCard";
import ProductDetailsDialog from "~/components/ProductDetailsDialog";
import AccessoryDetailsDialog from "~/components/AccessoryDetailsDialog";
import scrollTo from "~/utils/scrollTo";

export default {
    components: {
        "product-card": ProductCard,
        "product-details-dialog": ProductDetailsDialog,
        "accessory-details-dialog": AccessoryDetailsDialog
    },
    data() {
        return {
            pageNumProducts: 1,
            maxElementsToShow: 20,
            dialogDetailsOpen: false,
            dialogCartCountOpen: false,
            curProductDetails: null,
            cartCount: 1,
            selectedCartGroupId: null,
            selectedCartStore: null,
            currentCartProductToAdd: null,
            dialogDetailsAccessoryOpen: false,
            curProductAccessory: []
        };
    },
    computed: {
        token() {
            return this.$store.getters["modules/auth/getToken"];
        },
        foundProducts() {
            return this.$store.getters["modules/products/getAllProducts"];
        },
        paginationLengthProducts() {
            if (this.filteredProducts.length > 0) {
                return Math.ceil(
                    this.filteredProducts.length / this.maxElementsToShow
                );
            } else {
                return Math.ceil(
                    this.foundProducts.length / this.maxElementsToShow
                );
            }
        },
        listComponentItems() {
            let startElem = (this.pageNumProducts - 1) * this.maxElementsToShow;

            if (this.filteredProducts.length > 0) {
                return this.filteredProducts.slice(
                    startElem,
                    this.maxElementsToShow * this.pageNumProducts
                );
            } else {
                return this.foundProducts.slice(
                    startElem,
                    this.maxElementsToShow * this.pageNumProducts
                );
            }
        },
        filteredProducts() {
            return this.$store.getters["modules/products/getFilteredProducts"];
        },
        productsAreFetched() {
            return this.$store.getters[
                "modules/products/getProductsAreFetched"
            ];
        }
    },
    methods: {
        scrollToResults() {
            const productsContainer = document.body.querySelector(
                "main.content .products-container"
            );

            scrollTo(productsContainer.offsetTop - 120, 300);
        },
        picker(index) {
            return "white";
        },
        onAddProductToCart(product) {
            this.currentCartProductToAdd = product;
            this.dialogCartCountOpen = true;
        },
        onProductDetails(product) {
            this.$store
                .dispatch("modules/products/getFullProduct", { product })
                .then(() => {
                    this.curProductDetails = this.$store.getters[
                        "modules/products/getAllProducts"
                    ].find(prod => prod.Id === product.Id);
                    this.dialogDetailsOpen = true;
                });
        },
        groupHasAvailability(groupId) {
            let result = false;
            let group = this.currentCartProductToAdd.ProductInfos.find(x => x.GoodId === groupId);
            if (group){
                for (let store in group.StoreQUantities) {
                    if (group.StoreQUantities[store] > 0){
                        result = true;
                        break;
                    }
                }
            }
            return result;
        },
        canAddToCart(){
            let canAdd = false;
            if(this.selectedCartGroupId){
                let selectedGroupHasAvailability = this.groupHasAvailability(this.selectedCartGroupId);
                if(selectedGroupHasAvailability && this.selectedCartStore) canAdd = true;
                else if(!selectedGroupHasAvailability) canAdd = true;
            }

            return canAdd;
        },
        storesWithQuantitiesFromSelectedGroup() {
           let storeQuantities = this.currentCartProductToAdd.ProductInfos
                .find(x => x.GoodId === this.selectedCartGroupId).StoreQUantities;

            var filtered = Object.keys(storeQuantities).reduce(function (filtered, key) {
                if (storeQuantities[key] > 0) filtered[key] = storeQuantities[key];
                return filtered;
            }, {});
        },
        onAddCartCountDialogClick() {
            let comp = this,
                product = {};
            product.item = JSON.parse(
                JSON.stringify(comp.currentCartProductToAdd)
            );
            product.cartCount = ~~comp.cartCount;
            product.cartGroupData = JSON.parse(
                JSON.stringify(this.currentCartProductToAdd.ProductInfos)
            );
            product.selectedCartGroup = this.selectedCartGroupId;
            product.selectedCartStore = this.selectedCartStore;
            comp.$store.dispatch("modules/cart/addItemToCart", {
                productToBeAdded: product,
                originalProduct: comp.currentCartProductToAdd
            });
            comp.cartCount = 1;
            comp.dialogCartCountOpen = false;
        },
        onCloseDetailsDialogClick(value) {
            this.dialogDetailsOpen = value;
        },
        toggleSelectCartGroup(groupId) {
            if (this.selectedCartGroupId === groupId) {
                this.selectedCartGroupId = null;
            } else {
                this.selectedCartGroupId = groupId;
            }
            this.selectedCartStore = null;
        },
        toggleSelectCartStore(store) {
            if (this.selectedCartStore === store) {
                this.selectedCartStore = null;
            } else {
                this.selectedCartStore = store;
            }
        },
        onCloseDetailsAccessoryDialogClick(value) {
            this.dialogDetailsAccessoryOpen = value;
            this.curProductAccessory = [];
        },
        onOpenAccessoryDialog(accessory) {
            this.$store
                .dispatch("modules/products/getAccessory", accessory)
                .then(() => {
                    this.curProductAccessory = this.$store.getters[
                        "modules/products/getCurrentlyObservedProductAcessory"
                    ];
                })
                .then(() => {
                    this.dialogDetailsAccessoryOpen = true;
                });
        },
        round: num => num.toFixed(2)
    },
    watch: {
        filteredProducts(val, old) {
            if (val.length !== old.length) {
                this.pageNumProducts = 1;
            }
        },
        dialogCartCountOpen(value) {
            if (value === false) {
                this.cartCount = 1;
                this.selectedCartGroupId = null;
                this.selectedCartStore = null;
                this.currentCartProductToAdd = null;
            }
        }
    }
};
</script>

<style lang="css" scoped>
/* Tooltip container */
.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

/* Tooltip text */
.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  top: 100%;
  left: 50%; 
  margin-left: -60px;
  background-color: black;
  color: #fff;
  text-align: center;
  padding: 5px 0;
  border-radius: 6px;
 
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.products-container {
    /*display: grid;
		grid-template-areas: "products products products products products";
		grid-column-gap: 40px;
		grid-row-gap: 40px;
		grid-template-columns: 1fr 1fr 1fr 1fr 1fr;*/
    padding: 0 60px;
}

.products-container .products {
    /*grid-area: products;
		display: grid;*/
    margin: 0 auto;
    padding: 0;
}

.products-container .all-products {
    /*display: grid;
		grid-template-columns: repeat( auto-fill, minmax(350px, 1fr) );
		grid-column-gap: 40px;
		grid-row-gap: 40px;*/
    margin: 0;
    padding: 0;
}

.cart-count-container {
    background-color: #f1f1f1;
}

.text-xs-center {
    clear: both;
}

.pagination {
    margin-top: 10px;
}

.product {
    font-size: 20px;
}

.results {
    position: relative;
    overflow: hidden;
    margin-top: 20px;
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

@media all and (max-width: 992px) {
    .products-container {
        padding: 0 200px;
    }
}
/*@media all and (max-width: 780px) {*/
/*.products-container {*/
/*}*/
/*}*/
@media all and (max-width: 820px) {
    .products-container {
        padding: 0 120px;
    }
}
@media all and (max-width: 680px) {
    .products-container {
        padding: 0 80px;
    }
}
@media all and (max-width: 580px) {
    .products-container {
        padding: 0 20px;
    }
}
</style>

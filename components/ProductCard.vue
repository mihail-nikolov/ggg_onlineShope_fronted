<template>
    <v-layout align-center justify-center row wrap>
        <v-flex xs2 @click="onAddProductToCart(product)">
            <v-btn
                class="tooltip right"
                :color="(isInStock() ? 'light-green lighten-1' : 'amber lighten-2')"
            >Наличности
                <span v-if="isInStock()" class="tooltiptext">на склад</span>
                <span v-else class="tooltiptext">доставка</span>
            </v-btn>
        </v-flex>
        <v-flex xs10 class="card" @click="onProductDetails(product)">
            <div class="description-container">
                <div>
                    <v-btn flat icon @click.stop="onProductDetails(product)">
                        <v-icon>mdi-information-outline</v-icon>
                    </v-btn>
                    <b>{{product.EuroCode}}</b>
                    {{product.Description}}
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    props: ["product", "color", "btnColor"],
    methods: {
        onAddProductToCart(product) {
            this.$emit("onAddProductToCart", product);
        },
        onProductDetails(product) {
            console.log(JSON.stringify(product, 4));
            this.$emit("onProductDetails", product);
        },
        isInStock() {
            let isInStock = false;
            if (this.product && this.product.ProductInfos) {
                isInStock = this.product.ProductInfos.some(x =>
                    Object.values(x.StoreQUantities).some(sq => sq != 0)
                );
            }
            return isInStock;
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
  font-size: 10px;
 
  /* Position the tooltip text */
  position: absolute;
  z-index: 1;
}

/* Show the tooltip text when you mouse over the tooltip container */
.tooltip:hover .tooltiptext {
  visibility: visible;
}

.code {
    width: 100px;
    color: black;
}

.card {
    border-radius: 3px;
    border: 1px solid #e8e8e8 !important;
    box-shadow: none;
    transition: box-shadow 0.3s cubic-bezier(0, 0.5, 0, 0.5);
    will-change: box-shadow;
    cursor: pointer;
    text-overflow: visible;
}

.card:hover {
    box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.14),
        0 12px 17px 2px rgba(0, 0, 0, 0.08), 0 5px 22px 4px rgba(0, 0, 0, 0.06);
}

.description-container {
    display: inline-block;
    float: left;
}

.actions {
    display: block;
    float: left;
}
</style>

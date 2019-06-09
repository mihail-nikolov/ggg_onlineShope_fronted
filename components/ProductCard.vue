<template>
    <v-layout>
        <v-flex xs12 class="card" @click="onProductDetails(product)">
            <div class="description-container">
                <div class="actions">
                    <v-btn :color="btnColor" @click.stop="onAddProductToCart(product)">
                        <v-icon center>mdi-cart-outline</v-icon>
                    </v-btn>
                    <v-btn flat icon @click.stop="onProductDetails(product)">
                        <v-icon>mdi-information-outline</v-icon>
                    </v-btn>
                </div>
                <div>
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
            this.$emit("onProductDetails", product);
        }
    }
};
</script>

<style lang="css" scoped>
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

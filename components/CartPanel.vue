<template>
    <v-container class="cart-panel-container">
        <v-container>
            <v-layout row>
                <v-flex sm2 align-content-center>
                    <v-btn color="primary" icon flat @click="slideDrawerOut">
                        <v-icon large>mdi-arrow-right</v-icon>
                    </v-btn>
                </v-flex>
                <v-flex sm8 align-content-center>
                    <div v-if="addedItemsToCartCount">
                        <h2 class="cart-panel-title">Количка</h2>
                        <h3>Цената на аксесоарите не се включва към крайната цена на продукта. Разгледайте ги към всеки продукт и поръчайте, ако желаете</h3>
                    </div>
                    <div v-else>
                        <h2 class="cart-panel-title">Количката е празна</h2>
                    </div>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container
            v-if="activeStep === 1 || activeStep === 3"
            class="cart-panel-card"
            v-for="(cartItem, index) in addedItemsToCart"
            :key="index"
        >
            <v-layout row wrap>
                <v-flex xs12>
                    <v-card class="panel-card" color="blue-grey lighten-5">
                        <v-container fluid>
                            <v-layout row>
                                <v-flex xs4 column>
                                    <v-card-media height="130px" contain left>
                                        <v-carousel
                                            class="panel-card-carousel"
                                            hide-controls
                                            hide-delimiters
                                            interval="3500"
                                        >
                                            <v-carousel-item
                                                v-for="(image,i) in cartItem.item.Images"
                                                :src="image"
                                                :key="i"
                                                contain
                                            ></v-carousel-item>
                                        </v-carousel>
                                    </v-card-media>
                                    <v-btn color="primary" flat @click="onProductDetails(cartItem)">
                                        <v-icon left>mdi-information-outline</v-icon>Детайли
                                    </v-btn>
                                </v-flex>
                                <v-flex xs8>
                                    <v-flex column>
                                        <v-card-title>
                                            <h3
                                                style="width:100%"
                                            >Eurocode: {{cartItem.item.EuroCode}}</h3>
                                            <div style="width:100%">{{cartItem.item.Description}}</div>
                                            <div
                                                style="font-weight:bold;margin-top:10px;width:100%"
                                            >{{ getItemManufacturer(cartItem) }}: Цена: {{ round(getItemPrice(cartItem)) }}лв.</div>
                                        </v-card-title>
                                    </v-flex>

                                    <v-flex column>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                color="primary"
                                                icon
                                                flat
                                                @click="removeProductFromCart(index)"
                                            >
                                                <v-icon>mdi-delete</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-flex>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>

        <v-container v-if="activeStep === 2">
            <v-form class="form-wrapper">
                <form-component
                    elemType="text"
                    v-model="name"
                    fieldName="Име"
                    :hasError="validation.hasError('name')"
                    :firstError="validation.firstError('name')"
                ></form-component>
                <form-component
                    elemType="text"
                    v-model="email"
                    fieldName="Имейл"
                    :disabled="!!(this.user && this.user.Id)"
                    :hasError="validation.hasError('email')"
                    :firstError="validation.firstError('email')"
                ></form-component>
                <form-component
                    elemType="text"
                    v-model="country"
                    fieldName="Държава"
                    :disabled="isAddressPredefined"
                    :hasError="validation.hasError('country')"
                    :firstError="validation.firstError('county')"
                ></form-component>
                <form-component
                    elemType="text"
                    v-model="city"
                    fieldName="Град"
                    :disabled="isAddressPredefined"
                    :hasError="validation.hasError('city')"
                    :firstError="validation.firstError('city')"
                ></form-component>
                <form-component
                    elemType="text"
                    v-model="address"
                    fieldName="Адрес"
                    :disabled="isAddressPredefined"
                    :hasError="validation.hasError('address')"
                    :firstError="validation.firstError('address')"
                ></form-component>
                <form-component
                    elemType="text"
                    v-model="phoneNumber"
                    fieldName="Телефонен Номер"
                    :hasError="validation.hasError('phoneNumber')"
                    :firstError="validation.firstError('phoneNumber')"
                ></form-component>
                <form-component
                    elemType="text"
                    v-model="description"
                    fieldName="Допълнителна информация"
                ></form-component>

                <div style="flex: 1; display: flex;">
                    <v-flex xs-6>
                        <input type="radio" id="noInstallation" value v-model="installation">
                        <label for="noInstallation">Без Монтаж</label>
                        <br>
                        <input
                            type="radio"
                            id="installationInPlace"
                            value="installationInPlace"
                            v-model="installation"
                        >
                        <label for="installationInPlace">Монтаж на място</label>
                        <br>
                        <input
                            type="radio"
                            id="installationInSofia"
                            value="installationInSofia"
                            v-model="installation"
                        >
                        <label for="installationInSofia">Монтаж сервиз София</label>
                        <br>
                        <input
                            type="radio"
                            id="installationInRuse"
                            value="installationInRuse"
                            v-model="installation"
                        >
                        <label for="installationInRuse">Монтаж сервиз Русе</label>
                        <v-layout row>
                            <v-flex xs12>
                                <v-chip v-if="isInvoiceNeeded" @click="removeInvoice()">+ ФАКТУРА</v-chip>
                            </v-flex>
                        </v-layout>
                    </v-flex>
                    <br>
                    <v-btn small @click="addInvoice()" v-if="!this.isInvoiceNeeded">Фактура</v-btn>
                </div>
            </v-form>
        </v-container>
        <v-container v-if="activeStep === 3" class="info-container">
            <v-layout row>
                <h4>Име</h4>:&nbsp;
                <span>{{ name }}</span>
            </v-layout>
            <v-layout row>
                <h4>Имейл</h4>:&nbsp;
                <span>{{ email }}</span>
            </v-layout>
            <v-layout row>
                <h4>Държава</h4>:&nbsp;
                <span>{{ country }}</span>
            </v-layout>
            <v-layout row>
                <h4>Град</h4>:&nbsp;
                <span>{{ city }}</span>
            </v-layout>
            <v-layout row>
                <h4>Адрес</h4>:&nbsp;
                <span>{{ address }}</span>
            </v-layout>
            <v-layout row>
                <h4>Телефонен Номер</h4>:&nbsp;
                <span>{{ phoneNumber }}</span>
            </v-layout>
            <v-layout row>
                <h4>Допълнителна Информация</h4>:&nbsp;
                <span>{{ description }}</span>
            </v-layout>
        </v-container>

        <v-container v-if="activeStep === 3" class="ways-to-pay">
            <v-layout row>
                <h4>Начин за плащане:</h4>
            </v-layout>
            <v-layout row>
                <v-radio-group v-model="wayToPay">
                    <v-radio value="cash-on-delivery" label="Наложен платеж" color="primary"></v-radio>
                    <v-radio value="epay" label="Ипей" color="primary"></v-radio>
                </v-radio-group>
            </v-layout>
        </v-container>

        <v-container>
            <v-layout row>
                <v-flex xs6 offset-xs6>
                    <h3 class="total-sum-text">Общо: {{ round(totalSum) }}лв.</h3>
                    <h3 class="total-sum-text" v-if="user.PercentageReduction">
                        Намаление:
                        <span class="success-color">{{ user.PercentageReduction }}%</span>
                    </h3>
                    <h3
                        class="total-sum-text"
                    >Доставка: цената на доставката е описана подробно в секция "Общи Условия" и се доплаща на място</h3>
                    <br>
                    <h2 class="total-sum-text">
                        Крайна сума:
                        <span
                            v-bind:class="{'success-color': !!user && user.PercentageReduction}"
                        >{{ round(reducedSum) }}лв.</span>
                    </h2>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container>
            <v-layout row>
                <v-flex>
                    <v-card-actions>
                        <v-btn flat @click="onPrevStep" v-if="activeStep > 1">Назад</v-btn>
                        <v-spacer></v-spacer>
                        <v-btn v-if="activeStep === 3" color="primary" @click="onCheckout">Изпрати</v-btn>
                        <v-btn v-else color="primary" @click="onNextStep">Продължи</v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script>
import SimpleVueValidation from "simple-vue-validator";
import FormInputComponent from "~/components/Form/FormInputComponent";
import cart from "../store/modules/cart";
const Validator = SimpleVueValidation.Validator;
import ordersRepository from "~/repositories/ordersRepository";

export default {
    name: "CartPanel",
    data() {
        return {
            country: "",
            city: "",
            address: "",
            phoneNumber: "",
            name: "",
            email: "",
            description: "",
            isInvoiceNeeded: false,
            installation: "",
            steps: 3,
            activeStep: 1,
            wayToPay: "cash-on-delivery"
        };
    },
    components: {
        "form-component": FormInputComponent
    },
    computed: {
        addedItemsToCart() {
            return this.$store.getters["modules/cart/getCartItems"];
        },
        addedItemsToCartCount() {
            let count = 0;
            this.$store.getters["modules/cart/getCartItems"].forEach(function(
                product
            ) {
                count += product.cartCount;
            });
            return count;
        },
        isAddressPredefined() {
            return (
                this.installation == "installationInSofia" ||
                this.installation == "installationInRuse"
            );
        },
        totalSum() {
            let sum = 0;

            this.$store.getters["modules/cart/getCartItems"].forEach(
                cartItem => {
                    sum += this.getItemPrice(cartItem) * cartItem.cartCount;
                }
            );

            return sum;
        },
        reducedSum() {
            let sum = this.totalSum;
            if (this.user && this.user.PercentageReduction) {
                return sum - sum * (this.user.PercentageReduction / 100);
            } else {
                return sum;
            }
        },
        user() {
            return this.$store.getters["modules/auth/getUserDetails"];
        },
        token() {
            return this.$store.getters["modules/auth/getToken"];
        }
    },
    created() {
        if (this.user) {
            this.setUserData(this.user);
        }
    },
    watch: {
        addedItemsToCart(value) {
            sessionStorage.removeItem("autoGlassAddedToCartItems");
            sessionStorage.setItem(
                "autoGlassAddedToCartItems",
                JSON.stringify(value)
            );
        },
        user() {
            if (this.user) {
                this.setUserData(this.user);
            }
        },
        installation(value) {
            if (value == "installationInSofia") {
                this.address = "гр. София Ж.К Слатина, ул.Гео Милев 171";
                this.city = "София";
                this.country = "България";
            } else if (value == "installationInRuse") {
                this.address = "гр. Русе, бул. България 115";
                this.city = "София";
                this.country = "България";
            }
        }
    },
    methods: {
        onPrevStep() {
            if (this.activeStep <= 1) {
                return;
            }
            this.activeStep -= 1;
        },
        onNextStep() {
            if (this.activeStep >= 3) {
                return;
            }
            if (this.activeStep === 2) {
                this.$validate().then(success => {
                    if (success) {
                        this.activeStep += 1;
                    }
                });
            } else {
                this.activeStep += 1;
            }
        },
        decreaseProductQuantity(product, index) {
            if (product.cartCount > 1) {
                let count = parseInt(product.cartCount) - 1;
                this.$store.dispatch("modules/cart/changeCountOfItemInCart", {
                    index: index,
                    count: count
                });
            }
        },
        increaseProductQuantity(product, index) {
            let count = parseInt(product.cartCount) + 1;
            this.$store.dispatch("modules/cart/changeCountOfItemInCart", {
                index: index,
                count: count
            });
        },
        removeProductFromCart(index) {
            this.$store.dispatch("modules/cart/removeProductFromCart", index);
        },
        onCheckout() {
            let order = {
                FullAddress: `${this.country}; ${this.city}; ${this.address}`,
                Status: "Unpaid",
                DeliveryNotes: this.description,
                WithInstallation: this.installation != "",
                InstallationRuse: this.installation == "installationInRuse",
                InstallationSofia: this.installation == "installationInSofia",
                IsInvoiceNeeded: this.isInvoiceNeeded,
                PaidPrice: 0,
                Price: 0,
                DiscountPercentage: this.user.PercentageReduction,
                UserЕmail: this.email,
                UserInfo: this.name,
                UserId: (this.user && this.user.Id) || null,
                OrderedItems: [],
                WayToPay: this.wayToPay
            };

            const token = this.token;

            while (this.addedItemsToCart.length) {
                const cartItem = this.addedItemsToCart[0];
                const orderedItem = this.createOrder(cartItem);
                order.OrderedItems.push(orderedItem);
                this.removeProductFromCart(0);
            }
            order.Price = order.OrderedItems.map(x => x.Price)
                .reduce((a, b) => a + b, 0)
                .toFixed(2);

            ordersRepository.order({ order, token }).then(data => {
                if (this.wayToPay == "epay") {
                    this.$router.push({
                        name: "paymentrequest",
                        params: { id: data.Id, amount: data.Price }
                    });
                }
            });
        },
        slideDrawerOut() {
            this.$emit("slideDrawerOut");
        },
        onProductDetails(product) {
            this.$emit("cartPanelDetailsButtonClicked", product);
        },
        getItemPrice(cartItem) {
            const group = this.getItemGroup(cartItem);

            return group.Price;
        },
        getItemManufacturer(cartItem) {
            const group = this.getItemGroup(cartItem);

            return group.Group;
        },
        getItemGroup(cartItem) {
            return cartItem.cartGroupData.find(
                group => group.GoodId === cartItem.selectedCartGroup
            );
        },
        addInvoice() {
            this.isInvoiceNeeded = true;
        },
        removeInvoice() {
            this.isInvoiceNeeded = false;
        },
        setUserData(user) {
            this.name = user.Name;
            this.email = user.Email;
            this.address = user.DeliveryAddress;
            this.country = user.DeliveryCountry;
            this.city = user.DeliveryTown;
            this.phoneNumber = user.PhoneNumber;
        },
        createOrder(cartItem) {
            const order = {
                Manufacturer: "",
                Eurocode: null,
                OtherCodes: "",
                Description: "",
                Price: 0
            };

            order.Manufacturer = this.getItemManufacturer(cartItem);
            order.Description = cartItem.item.Description;
            if (cartItem.item.EuroCode) {
                order.Eurocode = cartItem.item.EuroCode;
            }
            if (cartItem.item.OesCode) {
                order.OtherCodes += `${cartItem.item.OesCode};`;
            }
            if (cartItem.item.MaterialNumber) {
                order.OtherCodes += `${cartItem.item.MaterialNumber};`;
            }
            if (cartItem.item.LocalCode) {
                order.OtherCodes += `${cartItem.item.LocalCode};`;
            }
            order.Price = this.getItemPrice(cartItem);

            return order;
        },
        round: num => num.toFixed(2)
    },
    validators: {
        name(value) {
            return Validator.value(value).required();
        },
        email(value) {
            return Validator.value(value)
                .required()
                .email();
        },
        country(value) {
            return Validator.value(value).required();
        },
        city(value) {
            return Validator.value(value).required();
        },
        address(value) {
            return Validator.value(value).required();
        },
        phoneNumber(value) {
            return Validator.value(value).required();
        }
    }
};
</script>

<style lang="css" scoped>
.product-quantity {
    font-size: 20px;
    width: 70px;
    display: inline-block;
    text-align: center;
}

.action-title {
    text-align: center;
    font-weight: bold;
}

.total-product-sum {
    text-align: center;
    font-size: 20px;
}

.total-sum-text {
    padding-left: 10px;
}

.panel-card-carousel {
    height: 130px;
}

.cart-panel-title {
    text-align: center;
}

.info-container h4 {
    display: inline-block;
    width: auto;
}

.success-color {
    color: darkgreen;
}
</style>

<template>
    <v-container>
        <form action="http://demo.epay.bg/" method="POST">
            <input type="radio" name="PAGE" value="paylogin" v-model="page"> Нормално плащане
            <br>
            <input type="radio" name="PAGE" value="credit_paydirect" v-model="page"> Директно плащане с кредитна карта
            <br>
            <input type="hidden" name="ENCODED" :value="encoded">
            <input type="hidden" name="CHECKSUM" :value="checksum">
            <input type="submit" class="buttonBlue big-btn buttonBlue:hover">
        </form>
    </v-container>
</template>

<script>
import CryptoJS from "crypto-js";

export default {
    name: "PaymentRequest",
    computed: {
        encoded() {
            const min = process.env.VUE_APP_PAYMENT_MIN;

            let paymentData = {
                MIN: min,
                INVOICE: this.invoice,
                AMOUNT: this.amount,
                EXP_TIME: this.expirationDate
            };

            let encoded = Buffer.from(JSON.stringify(paymentData)).toString(
                "base64"
            );

            return encoded;
        },
        checksum() {
            const userSecret = process.env.VUE_APP_PAYMENT_SECRET;
            let checksum = CryptoJS.HmacSHA1(this.encoded, userSecret);

            return checksum;
        }
    },
    props: ["invoice", "amount", "expirationDate"],
    data() {
        return {
            page: "paylogin"
        };
    }
};
</script>

<style scoped>
.buttonBlue {
    background: #37474f;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
    color: white;
    margin: 5px 0;
}

.big-btn {
    width: 80px;
    height: 35px;
}

.buttonBlue:hover {
    background: #4f5d64;
}
</style>

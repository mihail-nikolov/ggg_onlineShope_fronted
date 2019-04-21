<template>
    <v-container>
        <payment-request
            :invoice="this.$route.params.id"
            :amount="this.$route.params.amount"
            :expirationDate="getDateAfterTomorrow"
        />
    </v-container>
</template>

<script>
import PaymentRequest from "~/components/PaymentRequestComponent";
export default {
    layout: "default",
    components: {
        PaymentRequest
    },
    computed: {
        getDateAfterTomorrow() {
            let myDate = new Date();
            myDate.setDate(myDate.getDate() + 3);

            return myDate.toLocaleDateString("bg-BG").slice(0, 10);
        }
    }
};
</script>

<style scoped>
</style>

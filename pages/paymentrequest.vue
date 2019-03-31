<template>
    <v-container>
        <payment-request
            min="testMin"
            invoice="testInvoice"
            amount="24.00"
            expirationDate="24.01.2020"
        />
    </v-container>
</template>

<script>
import PaymentRequest from "~/components/PaymentRequestComponent";
export default {
    layout: "default",
    components: {
        PaymentRequest
    }
};
</script>

<style scoped>
</style>

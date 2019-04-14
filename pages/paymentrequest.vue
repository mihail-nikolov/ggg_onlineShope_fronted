<template>
    <v-container>
        <payment-request invoice="78521542" amount="24.00" expirationDate="24.01.2020"/>
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

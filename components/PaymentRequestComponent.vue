<template>
    <v-container>
        <button
            type="button"
            class="button buttonBlue"
            @click="onSubmit"
        >Изпращане на искане за плащане</button>
    </v-container>
</template>

<script>
import FormInputComponent from "~/components/Form/FormInputComponent";
import paymentsRepository from "~/repositories/paymentsRepository";
export default {
    name: "PaymentRequest",
    components: {
        "form-input": FormInputComponent
    },
    computed: {
        user() {
            return this.$store.getters["modules/auth/getUserDetails"];
        },
        token() {
            return this.$store.getters["modules/auth/getToken"];
        }
    },
    props: ["min", "invoice", "amount", "expirationDate"],
    data() {
        return {};
    },
    methods: {
        onSubmit() {
            paymentsRepository.paymentRequest(
                this.min,
                this.invoice,
                this.amount,
                this.expirationDate
            );
        }
    }
};
</script>

<style scoped>
.btn-fat {
    margin: 5px 0;
}

.buttonBlue {
    background: #37474f;
    text-shadow: 1px 1px 0 rgba(39, 110, 204, 0.5);
}

.buttonBlue:hover {
    background: #4f5d64;
}
</style>

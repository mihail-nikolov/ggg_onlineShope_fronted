<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm9 class="pr-3">
                <div
                    :class="isSuccessful?'headline green--text':'headline red--text'"
                >{{responseStatus}}</div>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    layout: "default",
    data() {
        return {
            responseStatus: null,
            isSuccessful: true
        };
    },
    methods: {
        confirmEmail: function() {
            this.$store
                .dispatch("modules/auth/confirmEmail", {
                    userId: this.$route.query.userid,
                    code: this.$route.query.code
                })
                .then(
                    result => {
                        this.responseStatus =
                            "Имейл адресът е потвърден успешно!";
                        this.isSuccessful = true;
                    },
                    error => {
                        this.responseStatus =
                            "Имейл адресът не е потвърден успешно!";
                        this.isSuccessful = false;
                    }
                );
        }
    },
    beforeMount() {
        this.confirmEmail();
    }
};
</script>

<style scoped>
</style>
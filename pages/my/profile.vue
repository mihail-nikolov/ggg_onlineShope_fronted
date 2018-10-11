<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Профил <v-spacer></v-spacer> <v-btn flat>Изтрии</v-btn></h2>
            <div class="profile-table">
                <div class="profile-table-row" v-for="(value, key) in user" v-if="keyInUserIsAllowed(key)">
                    <div class="profile-table-row__key">{{ mapUserKey(key) }}</div>
                    <div class="profile-table-row__value">{{ value }}</div>
                </div>
            </div>
        </v-card>
        <admin-navigation-buttons></admin-navigation-buttons>
    </v-container>
</template>

<script>
	const allowedUserKeys = ["Email", "Bulstat", "Name", "PhoneNumber", "DeliveryCountry", "DeliveryTown", "DeliveryAddress", "IsDeferredPaymentAllowed", "PercentageReduction" ];
	const userKeyMap = {
		"Email": "Имейл",
		"Bulstat": "Булстат",
		"Name": "Име",
		"PhoneNumber": "Телефонен номер",
		"DeliveryCountry": "Държава",
		"DeliveryTown": "Град",
		"DeliveryAddress": "Адрес",
		"IsDeferredPaymentAllowed": "Разсрочено плащане",
		"PercentageReduction": "Отстъпка (%)"
	};

	import adminNavigationButtons from '~/components/adminNavigationButtons';

	export default {
		layout: 'my',
		components: {
			"admin-navigation-buttons": adminNavigationButtons
		},
		computed: {
			user() {
				return this.$store.getters["modules/auth/getUserDetails"];
			}
		},
		methods: {
			keyInUserIsAllowed(key) {
				return allowedUserKeys.includes(key);
			},
			mapUserKey(key) {
				return userKeyMap[key] || key;
			}
		}
	};
</script>

<style scoped>
    .admin__title {
        display: flex;
        font-size: 30px;
        line-height: 1;
        margin-bottom: 20px;
    }
    .admin__card {
        padding: 20px;
    }
    .profile-table {
        display: table;
        border-collapse: collapse;
        width: 100%;
    }
    .profile-table-row {
        display: table-row;
        height: 40px;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .profile-table-row__key {
        width: 200px;
        display: table-cell;
        padding-left: 20px;
        font-weight: bold;
        vertical-align: middle;
    }
    .profile-table-row__value {
        display: table-cell;
        vertical-align: middle;
    }
</style>

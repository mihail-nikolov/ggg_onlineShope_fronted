<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Потребители</h2>
            <div class="users-table">
                <div class="users-table__user" v-if="users.length > 0">
                    <span v-for="key in availableUserKeys" v-if="isKeyAllowed(key)">
                        {{ mapUserKey(key) }}
                    </span>
                </div>
                <div class="users-table__user" v-for="user in users" v-if="user.Email !== 'admin@admin.com'">
                    <span v-for="key in availableUserKeys" v-if="isKeyAllowed(key)">
                        <v-btn small v-if="key === 'EmailConfirmed' && !user[key]" v-bind:style="{ margin: 0 }" @click="confirmUser(user)">Потвърди</v-btn>
                        <span v-else>{{ mapUserKeyValue(key, user[key]) }}</span>
                    </span>
                </div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
const allowedUserKeys = ["Name", "Email", "Bulstat", "PhoneNumber", "EmailConfirmed", "OnlyHighCostVisible", "EmailConfirmed"];
const userKeysMap = {
	"Name": "Име",
	"Email": "Имейл",
	"Bulstat": "Булстат",
	"PhoneNumber": "Телефонен номер",
	"EmailConfirmed": "Потвърден",
	"OnlyHighCostVisible": "Само горен клас"
};
const userKeyPriorityMap = {
	"Name": 100,
	"Email": 90,
	"PhoneNumber": 90
};

export default {
	layout: 'admin',
	components: {
	},
	computed: {
		user() {
			console.warn(this.$store.getters["modules/auth/getUserDetails"]);
			return this.$store.getters["modules/auth/getUserDetails"];
		},
		token() {
			return this.$store.getters["modules/auth/getToken"];
		},
		users() {
			return this.$store.getters["modules/auth/getUsers"];
		},
		availableUserKeys() {
			const keys = new Set;

			this.$store.getters["modules/auth/getUsers"].forEach(user => {
				Object.keys(user).forEach(key => {
					keys.add(key);
				});
			});
			keys.add("EmailConfirmed");

			const sortedKeys = [...keys].sort((key, nextKey) => {
				const current = userKeyPriorityMap[key] || -1;
				const next = userKeyPriorityMap[nextKey] || -1;

				return next - current;
			});

			return sortedKeys;
		}
	},
	methods: {
		isKeyAllowed(key) {
			return allowedUserKeys.includes(key);
		},
		mapUserKey(key) {
			return userKeysMap[key] || key;
		},
		mapUserKeyValue(key, value) {
			if (key === "OnlyHighCostVisible" || key === "EmailConfirmed") {
				const negative = !value;
				return (!negative) ? "Да" : "Не";
			}
			else {
				return value;
			}
		},
		confirmUser(user) {

		}
	},
	created() {
		if (this.token) {
			const token = this.token;
			this.$store.dispatch("modules/auth/getUsers", { token });
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

    .users-table {
        display: table;
        border-collapse: collapse;
        width: 100%;
    }
    .users-table__user {
        display: table-row;
        height: 40px;
        border-bottom: 1px solid rgba(0, 0, 0, .12);
    }
    .users-table__user > * {
        display: table-cell;
        padding-left: 20px;
        box-sizing: content-box;
        vertical-align: middle;
    }
    .users-table__user:first-child {
        font-weight: bold;
    }
</style>

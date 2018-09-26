<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Потребители</h2>
            <!--<div class="users-table">-->
                <!--<div class="users-table__user" v-if="users.length > 0">-->
                    <!--<span v-for="key in availableUserKeys" v-if="isKeyAllowed(key)">-->
                        <!--{{ mapUserKey(key) }}-->
                    <!--</span>-->
                <!--</div>-->
                <!--<div class="users-table__user" v-for="user in users" v-if="user.Email !== 'admin@admin.com'">-->
                    <!--<span v-for="key in availableUserKeys" v-if="isKeyAllowed(key)">-->
                        <!--<v-btn small v-if="key === 'EmailConfirmed' && !user[key]" v-bind:style="{ margin: 0 }" @click="sendUserConfirmationEmail(user)">Потвърди</v-btn>-->
                        <!--<v-btn small v-else-if="key === 'OnlyHighCostVisible'" v-bind:style="{ margin: 0 }" @click="changeUserHighCostVisibility(user, !user[key])">-->
                            <!--{{ mapUserKeyValue(key, user[key]) }}-->
                        <!--</v-btn>-->
                        <!--<span v-else>{{ mapUserKeyValue(key, user[key]) }}</span>-->
                    <!--</span>-->
                <!--</div>-->
            <!--</div>-->
            <div class="user" v-for="user in users" v-if="user.Email !== 'admin@admin.com'">
                <div class="section">
                    <p style="font-weight: bold;">{{ user.Name }} <span v-if="user.Bulstat"><v-icon>mdi-pound</v-icon>&nbsp;{{ user.Bulstat }}</span></p>
                    <p><v-icon>mdi-cellphone-iphone</v-icon>&nbsp;{{ user.PhoneNumber }}</p>
                    <p><v-icon>mdi-at</v-icon>&nbsp;{{ user.Email }}</p>
                    <p v-if="user['EmailConfirmed']" style="width: 90px; text-align: center">{{ mapUserKey('EmailConfirmed') }}</p>
                    <v-btn v-else small color="primary" v-bind:style="{ margin: 0, width: 90 }" @click="sendUserConfirmationEmail(user)">Потвърди</v-btn>
                </div>
                <div class="section section-centered">
                    <div style="width: 210px; position: relative;right: -10px;bottom: -13px;">
                        <vuex-switch v-bind:label="mapUserKey('OnlyHighCostVisible')" :model="user['OnlyHighCostVisible']" @change="changeUserHighCostVisibility(user, ...arguments)"></vuex-switch>
                    </div>
                </div>
                <div class="section section-centered">
                    <div style="width: 230px; position: relative;right: -10px;bottom: -13px;">
                        <vuex-switch v-bind:label="mapUserKey('IsDeferredPaymentAllowed')" :model="user['IsDeferredPaymentAllowed']" @change="changeUserAllowedDeferredPayment(user, ...arguments)"></vuex-switch>
                    </div>
                </div>
                <div class="section section-centered">
                    <p>Намаление:&nbsp;</p>
                    <vuex-input :model="user.PercentageReduction" :styles="{width: '2em', fontSize: '1.5em'}" @change="changeUserPercentageReduction(user, ...arguments)"></vuex-input>
                    <p>%</p>
                </div>
            </div>
        </v-card>
    </v-container>
</template>

<script>
import VuexSwitch from '~/components/Form/VuexSwitch';
import VuexInput from '~/components/Form/VuexInput';
import _ from 'lodash';

const allowedUserKeys = ["Name", "Email", "Bulstat", "PhoneNumber", "EmailConfirmed", "OnlyHighCostVisible", "EmailConfirmed"];
const userKeysMap = {
	"Name": "Име",
	"Email": "Имейл",
	"Bulstat": "Булстат",
	"PhoneNumber": "Телефонен номер",
	"EmailConfirmed": "Потвърден",
	"OnlyHighCostVisible": "Само горен клас",
	"IsDeferredPaymentAllowed": "Отложена поръчка"
};
const userKeyPriorityMap = {
	"Name": 100,
	"Email": 90,
	"PhoneNumber": 90
};

export default {
	layout: 'my',
	data() {
		return {
			usersRequested: false
		};
	},
	components: {
		"vuex-switch": VuexSwitch,
		"vuex-input": VuexInput
	},
	computed: {
		user() {
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
			if (key === "OnlyHighCostVisible" || key === "EmailConfirmed" || key === "IsDeferredPaymentAllowed") {
				return value ? "Да" : "Не";
			}
			else {
				return value;
			}
		},
		sendUserConfirmationEmail(user) {
			this.$store.dispatch("modules/auth/sendUserConfirmationMail", { user });
		},
		changeUserHighCostVisibility: _.debounce(function (user, visibility) {
			this.$store.dispatch("modules/auth/setUserHighCostVisibility", { user, visibility });
		}, 300),
		fetchUsers() {
			if (this.token && !this.usersRequested) {
				const token = this.token;
				this.$store.dispatch("modules/auth/getUsers", { token });
				this.usersRequested = true;
			}
		},
		changeUserAllowedDeferredPayment: _.debounce(function (user, allowed) {
			this.$store.dispatch("modules/auth/setUserAllowedDeferredPayment", { user, allowed });
		}, 300),
		changeUserPercentageReduction: _.debounce(function (user, percentage) {
			this.$store.dispatch("modules/auth/setUserPercentageReduction", { user, percentage });
		}, 300)
	},
	watch: {
		token() {
			if (this.token) {
				this.fetchUsers();
			}
		}
	},
	created() {
		const token = this.token;
		console.log(this.user);

		if (token && !this.usersRequested) {
			this.fetchUsers();
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

    .user {
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 15px;
        padding-top: 15px;
        border-top: 1px solid rgba(0, 0, 0, .12);
    }

    .user p {
        margin-top: 10px;
        margin-bottom: 10px;
    }

    .user .section {
        flex: 1 0 auto;
        border-right: 1px solid rgba(0, 0, 0, .12);
    }
    .user div.section:first-child {
        width: 250px;
    }
    .user div.section:last-child {
        border-right: none;
    }

    .user .section.section-centered {
        display: flex;
        align-content: center;
        justify-content: center;
        justify-items: center;
        align-items: center;
    }
</style>

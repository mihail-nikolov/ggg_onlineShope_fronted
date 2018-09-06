<template>
    <v-container>
        <v-card class="admin__card">
            <h2 class="admin__title">Потребители</h2>
        </v-card>
    </v-container>
</template>

<script>
	export default {
		layout: 'admin',
		components: {
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
</style>

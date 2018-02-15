<template>
	<v-container align-center class="search-component-container">

		<h2 class="advanced-search">Advanced search</h2>
		<v-container align-center class="search-selectors-container">

				<multiselect class="search-multiselect" v-model="makeValue" :options="makeOptions" track-by="Id" label="Name" deselect-label="Click to remove" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Make"></multiselect>
			
				<multiselect class="search-multiselect" v-model="modelValue" :options="modelOptions" track-by="Id" label="Name" deselect-label="Click to remove" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Model"></multiselect>

				<multiselect class="search-multiselect" v-model="bodyTypeValue" :options="bodyTypeOptions" track-by="Id" label="Description" deselect-label="Click to remove" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select body type"></multiselect>

		</v-container>
	</v-container>
</template>

<script>
	import Multiselect from 'vue-multiselect';
	export default {
		components: {
			Multiselect
		},
		data: function() {
			return {
				makeValue: null,
				modelValue: null,
				bodyTypeValue: null,
				productTypeValue: null
			};
		},
		computed: {
			makeOptions() {
				return this.$store.getters["modules/products/getMakes"];
			},
			modelOptions() {
				return this.$store.getters["modules/products/getModels"];
			},
			bodyTypeOptions() {
				return this.$store.getters["modules/products/getBodyTypes"];
			},
			productTypeOptions() {
				return this.$store.getters["modules/products/getProductTypes"];
			}
		},
		methods: {},
		watch: {
			makeValue() {
				if (this.makeValue && this.makeValue.Id) {
					this.$store.dispatch("modules/products/fetchModels", this.makeValue);
					this.modelValue = null;
				}
				if (this.makeValue === null) {
					this.modelValue = null;
					this.$store.dispatch("modules/products/setModels", []);
					this.$store.dispatch("modules/products/clearProducts");
				}
			},
			modelValue() {
				if (this.modelValue && this.modelValue.Id) {
					let reqBody = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id
					};
					this.$store.dispatch("modules/products/fetchBodyTypes", {reqBody:reqBody, makeModelName: this.makeValue.Name + " " + this.modelValue.Name});
					this.bodyTypeValue = null;
				}
				if (this.modelValue === null) {
					this.bodyTypeValue = null;
					this.$store.dispatch("modules/products/setBodyTypes", []);
					this.$store.dispatch("modules/products/clearProducts");
				}
			},
			bodyTypeValue() {
				if (this.bodyTypeValue && this.bodyTypeValue.Id) {
					let reqBody = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id,
						BodyTypeId: this.bodyTypeValue.Id
					};
					this.$store.dispatch("modules/products/fetchProductTypes", {reqBody:reqBody, makeModelName: this.makeValue.Name + " " + this.modelValue.Name + " " + this.bodyTypeValue.Description});
					this.$store.dispatch("modules/products/searchForProducts", reqBody);
					this.productTypeValue = null;
				}
				if (this.bodyTypeValue === null) {
					this.productTypeValue = null;
					this.$store.dispatch("modules/products/setProductTypes", []);
					this.$store.dispatch("modules/products/clearProducts");
				}
			},
			productTypeValue() {
				if (this.productTypeValue) {
					let reqBody = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id,
						BodyTypeId: this.bodyTypeValue.Id,
						ProductType: this.productTypeValue
					};
					this.$store.dispatch("modules/products/searchForProducts", reqBody);
				}
			}
		},
		async created() {
			this.$store.dispatch("modules/products/fetchMakes");
		}
	};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style lang="css" scoped>
	.advanced-search {
		width: 100%;
		text-align: center;
		font-size: 60px;
		margin-bottom: 50px;
	}
	
	.search-component-container {
		margin-top: 20vh;
		font-family: "JosefinSansBold";
		text-align: center;
	}
	
	.search-multiselect {
		background-color: transparent;
		display: inline-block;
		width: 350px;
		height: 100px;
	}
	
	.search-labels {
		/*margin-left: 10px;*/
	}
	
	.search-results {
		width: 100vw;
	}
	
	.search-selectors-container {
		height: 250px;
		/*margin-left: 100px;*/
	}
</style>

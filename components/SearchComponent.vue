<template>
	<div class="search-component-container">

		<h2 class="advanced-search">Advanced search</h2>
		<div class="search-selectors-container">
			<div class="search-multiselect">
				<label class="search-labels">Makes</label>
				<multiselect v-model="makeValue" :options="makeOptions" track-by="Id" label="Name" deselect-label="Click to remove" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Make"></multiselect>
			</div>
			<div class="search-multiselect">
				<label class="search-labels">Models</label>
				<multiselect v-model="modelValue" :options="modelOptions" track-by="Id" label="Name" deselect-label="Click to remove" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select Model"></multiselect>
			</div>
			<div class="search-multiselect">
				<label class="search-labels">Body types</label>
				<multiselect v-model="bodyTypeValue" :options="bodyTypeOptions" track-by="Id" label="Description" deselect-label="Click to remove" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Select body type"></multiselect>
			</div>
		</div>

	</div>
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
			makeOptions () {
				return this.$store.getters["modules/products/getMakes"];
			},
			modelOptions () {
				return this.$store.getters["modules/products/getModels"];
			},
			bodyTypeOptions () {
				return this.$store.getters["modules/products/getBodyTypes"];
			},
			productTypeOptions () {
				return this.$store.getters["modules/products/getProductTypes"];
			}
		},
		methods: {},
		watch: {
			makeValue() {
				if (this.makeValue && this.makeValue.Id) {
					this.$store.dispatch("modules/products/fetchModels", this.makeValue.Id);
					this.modelValue = null;
				}
				if (this.makeValue === null) {
					this.modelValue = null;
					this.$store.dispatch("modules/products/setModels", []);
				}
			},
			modelValue() {
				if (this.modelValue && this.modelValue.Id) {
					let reqBody = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id
					};
					this.$store.dispatch("modules/products/fetchBodyTypes", reqBody);
					this.bodyTypeValue = null;
				}
				if (this.modelValue === null) {
					this.bodyTypeValue = null;
					this.$store.dispatch("modules/products/setBodyTypes", []);
				}
			},
			bodyTypeValue() {
				if (this.bodyTypeValue && this.bodyTypeValue.Id) {
					let reqBody = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id,
						BodyTypeId: this.bodyTypeValue.Id
					};
					this.$store.dispatch("modules/products/fetchProductTypes", reqBody);
					this.$store.dispatch("modules/products/searchForProducts", reqBody);
					this.productTypeValue = null;
				}
				if (this.bodyTypeValue === null) {
					this.productTypeValue = null;
					this.$store.dispatch("modules/products/setProductTypes", []);
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
			// console.log("store - > ", this.$store);
			// this.$store.dispatch("modules/cart/addItemToCart", "ko staa");
			// app.$store.getters["modules/products/getMakes"];
			// this.$store.state.modules.cart.addedItems.forEach(function(elem, index) {
			// 	console.log("item " + index, elem);
			// });
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
		font-family: "JosefinSansBold";
	}
	.search-multiselect {
		display: inline-block;
		margin-left: 10px;
		width: 350px;
		height: 100px;
	}
	.search-labels {
		margin-left: 10px;
	}
	.search-results {
		width: 100vw;
	}
	.search-selectors-container {
		height: 250px;
		margin-left: 100px;
	}
</style>

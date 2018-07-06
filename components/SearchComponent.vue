<template>
	<v-container align-center class="search-component-container">
		<h2 class="advanced-search">ТЪРСЕНЕ</h2>
		<v-container align-center fluid>
			<v-layout row justify-center>
				<v-flex xs6>
					<v-text-field color="primary" name="searchByCode" v-model="codeForSearch" label="Eurocode / Material number / Oes code / Industry code"></v-text-field>
				</v-flex>
				<v-flex xs1>
					<v-btn flat color="primary" @click="onCodeSearchClicked">
						<v-icon left>fa-search</v-icon>
						ТЪРСИ
					</v-btn>
				</v-flex>
			</v-layout>
			<h2>ИЛИ</h2>
		</v-container>
		<v-container align-center class="search-selectors-container">
			<multiselect class="search-multiselect" v-model="makeValue" :options="makeOptions" track-by="Id" label="Name" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери марка"></multiselect>
			<multiselect class="search-multiselect" v-model="modelValue" :options="modelOptions" track-by="Id" label="Name" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери модел"></multiselect>
			<multiselect class="search-multiselect" v-model="bodyTypeValue" :options="bodyTypeOptions" track-by="Id" label="Description" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери част"></multiselect>
		</v-container>
		<v-flex class="car-container" align-center>
			<glasses-svg class="glasses-svg"></glasses-svg>
		</v-flex>

		<div v-if="foundProducts.length > 0">
			<div class="count">Намерени резултати: <span v-if="foundProducts.length == 0" style="color:#ce1414">{{foundProducts.length}}</span><span v-if="foundProducts.length" style="color:#089148">{{foundProducts.length}}</span></div>

			<v-btn flat class="circle-btn" color="primary" @click="scrollToResults()">
				<v-icon center>fa-angle-down</v-icon>
			</v-btn>
		</div>
	</v-container>
</template>

<script>
	import Multiselect from 'vue-multiselect';
	import GlassesSVG from '~/components/GlassesSVG';
	import scrollTo from "~/utils/scrollTo";

	export default {
		components: {
			'multiselect': Multiselect,
			'glasses-svg': GlassesSVG
		},
		data: function() {
			return {
				makeValue: null,
				modelValue: null,
				bodyTypeValue: null,
				productTypeValue: null,
				codeForSearch: ''
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
			},
			foundProducts() {
				return this.$store.getters["modules/products/getAllProducts"];
			}
		},
		methods: {
			scrollToResults() {
				const productsContainer = document.body.querySelector("main.content .products-container");

				scrollTo(productsContainer.offsetTop - 120, 300);
			},
			onCodeSearchClicked() {
				this.$store.dispatch("modules/products/searchForCode", this.codeForSearch);
				this.codeForSearch = '';
			},
			onSvgReady() {
				console.log("SVG READY");
			},
			search() {
				let reqBody = {
					"MakeId": this.makeValue && this.makeValue.Id || null,
					"ModelId": this.modelValue && this.modelValue.Id || null,
					"BodyTypeId": this.bodyTypeValue && this.bodyTypeValue.Id || null,
					"ProductType": this.productTypeValue && this.productTypeValue.Id || null
				};
				this.$store.dispatch("modules/products/searchForProducts", reqBody);
			}
		},
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
					this.$store.dispatch("modules/products/fetchBodyTypes", {
						reqBody: reqBody,
						makeModelName: this.makeValue.Name + " " + this.modelValue.Name
					});
					this.bodyTypeValue = null;
					this.search();
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
					this.$store.dispatch("modules/products/fetchProductTypes", {
						reqBody: reqBody,
						makeModelName: this.makeValue.Name + " " + this.modelValue.Name + " " + this.bodyTypeValue.Description
					});
					this.productTypeValue = null;
					this.search();
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
		text-align: center;
		color: #37474F;
	}
	
	.search-multiselect {
		background-color: transparent;
		display: inline-block;
		width: 100%;
		height: 40px;
	}
	
	.search-results {
		width: 100vw;
	}
	
	.search-selectors-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		grid-column-gap: 15px;
		grid-row-gap: 15px;
	}

	.car-container {
		display: flex;
		justify-content: center;
	}

	.count {
		width: 100%;
		margin-bottom: 5px;
		height: 42px;
		color: #37474F;
		font-weight: 700;
		text-align: center;
		font-size: 26px;
	}

	.circle-btn {
		height: 90px;
		width: 90px;
		border-radius: 100%;
	}
</style>

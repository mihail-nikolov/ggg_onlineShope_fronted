<template>
	<div class="search-component-container">

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

		<div class="result-count-container">
			<button class="result-count-button" v-on:click="showProducts = !showProducts">Found products: {{foundProducts.length}}</button>
		</div>

		<div class="search-results" v-if="showProducts" v-for="(product, index) in foundProducts">
			<div class="product-container">
				<span>{{index + 1}}.</span>
				<div class="eurocode-container">
					<label>Eurocode: </label>
					<span>{{product.EuroCode}}</span>
				</div>
				<div class="material-number-container">
					<label>Material number: </label>
					<span>{{product.MaterialNumber}}</span>
				</div>
				<div class="industry-code-container">
					<label>Industry code: </label>
					<span>{{product.IndustryCode}}</span>
				</div>

			</div>
		</div>

	</div>
</template>

<script>
	import Multiselect from 'vue-multiselect';
	import axios from 'axios';
	export default {
		components: {
			Multiselect
		},
		data: function() {
			return {
				counter: 0,
				makeOptions: [],
				makeValue: null,
				modelOptions: [],
				modelValue: null,
				bodyTypeOptions: [],
				bodyTypeValue: null,
				foundProducts: [],
				showProducts: false
			};
		},
		props: {
			'Makes': []
		},
		methods: {},
		watch: {
			makeValue() {
				if (this.makeValue && this.makeValue.Id) {
					axios.get('http://localhost:60918/api/Models/GetByMakeId/' + this.makeValue.Id).then(response => {
						this.modelOptions = response.data;
						this.modelValue = null;
					}).catch(e => {
						console.log("error GetByMakeId -> ", e);
					});
				}
				if (this.makeValue === null) {
					this.modelOptions = [];
					this.modelValue = null;
				}
			},
			modelValue() {
				console.log("this.makeValue.Id", this.makeValue.Id);
				console.log("this.modelValue.Id", this.modelValue.Id);
				if (this.modelValue && this.modelValue.Id) {
					let body = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id
					};
					axios.post('http://localhost:60918/api/BodyTypes/GetByMakeAndModelIds', body).then(response => {
						this.bodyTypeOptions = response.data;
						if (response.data.length === 0) {
							let body = {
								MakeId: this.makeValue.Id,
								ModelId: this.modelValue.Id
							};
							axios.post('http://localhost:60918/api/Products/FindByVehicleInfo', body).then(response => {
								this.foundProducts = response.data;
								console.log("foundProducts ", this.foundProducts);
							}).catch(e => {
								console.log("error FindByVehicleInfo -> ", e);
							});
						}
					}).catch(e => {
						console.log("error GetByMakeAndModelIds -> ", e);
					});
				}
				if (this.modelValue === null) {
					this.bodyTypeOptions = [];
					this.bodyTypeValue = null;
				}
			},
			bodyTypeValue() {
				if (this.bodyTypeValue && this.bodyTypeValue.Id) {
					let body = {
						MakeId: this.makeValue.Id,
						ModelId: this.modelValue.Id,
						BodyTypeId: this.bodyTypeValue.Id
					};
					axios.post('http://localhost:60918/api/Products/FindByVehicleInfo', body).then(response => {
						this.foundProducts = response.data;
						console.log("foundProducts ", this.foundProducts);
					}).catch(e => {
						console.log("error FindByVehicleInfo -> ", e);
					});
				}
				if (this.bodyTypeValue === null) {
					this.showProducts = false;
					this.foundProducts = [];
				}
			}
		},
		async created() {
			// axios.get(`http://localhost:60918/api/Makes`).then(response => {
			// 	this.makeOptions = response.data;
			// }).catch(e => {
			// 	this.errors.push(e);
			// });
			try {
				const response = await axios.get('http://localhost:60918/api/Makes');
				this.makeOptions = response.data;
			} catch (e) {
				this.errors.push(e);
			}
		}
	};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>
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
	
	.product-container {
		height: 100px;
		margin-left: 15px;
		font-size: 20px;
	}
	
	.eurocode-container,
	.material-number-container,
	.industry-code-container {
		margin-left: 10px;
		display: inline-block;
	}
	
	.result-count-container {
		margin-top: 30px;
		margin-left: 720px;
		width: 200px;
	}
	
	.result-count-button {
		width: 150px;
		height: 60px;
		background-color: #292F36;
		color: #FFFFFF;
		font-weight: 700;
		font-size: 16px;
	}
	
	.result-count-button:hover {
		color: #008C4E;
	}
	
	.search-selectors-container {
		margin-left: 250px;
	}
	
	.scrollable {
		display: block;
		padding: 19px 39px 18px 39px;
		color: #FFF;
		background: #4C4C4C;
		font-size: 18px;
		font-style: normal;
		border: 1px solid #4C4C4C;
		border-width: 1px 1px 3px;
		margin-bottom: 10px;
		overflow-y: auto !important;
		width: 500px;
		height: 65px !important;
		margin-bottom: 20px;
		margin-left: 232px;
		border-radius: 10px;
	}
</style>

<template>
	<v-container align-center class="search-component-container">
		<h2 class="advanced-search">ТЪРСЕНЕ</h2>
		<v-container align-center fluid>
			<v-layout row justify-center>
				<div style="max-width: 600px; display: flex; flex-wrap: wrap;align-items: center; justify-content: center;">
					<v-text-field color="primary" name="searchByCode" v-model="codeForSearch" label="Код" style="width: 220px; min-width: 220px;"></v-text-field>
					<switch-group :options="codeTypes" :model="selectedCodeType" @onSelect="onSelectCodeType"></switch-group>
					<v-btn flat color="primary" @click="onCodeSearchClicked">
						<v-icon left>fa-search</v-icon>
						ТЪРСИ
					</v-btn>
				</div>
			</v-layout>
			<h3>ИЛИ</h3>
		</v-container>
		<v-container align-center class="search-selectors-container">
			<multiselect class="search-multiselect" v-model="makeValue" :options="makeOptions" track-by="Id" label="Name" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери марка"></multiselect>
			<multiselect class="search-multiselect" v-model="modelValue" :options="modelOptions" track-by="Id" label="Name" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери модел"></multiselect>
			<multiselect class="search-multiselect" v-model="bodyTypeValue" :options="bodyTypeOptions" track-by="Id" label="Description" deselect-label="Премахни" :searchable="true" :close-on-select="true" :show-labels="false" placeholder="Избери част"></multiselect>
		</v-container>

		<v-flex class="car-container" align-center>
			<glasses-svg class="glasses-svg" :selected-windows="selectedWindows" :available-windows="availableWindows" v-on:selectElement="onSelectWindowType"></glasses-svg>
		</v-flex>

        <v-flex class="images-container" align-center>
            <img alt="" width="100" height="100" class="image-preview"
                 v-for="image in allImages" :src="image"
                 v-bind:class="{
                    selected: selectedImages.includes(image),
                    disabled: filteredImages.length && !filteredImages.includes(image)
                    }"
                 @click="toggleSelectImage(image);">
        </v-flex>

		<div v-if="foundProducts.length > 0 && productsAreFetched">
			<div class="count">РЕЗУЛТАТИ: <span style="color:#089148">{{ filteredProducts.length }}</span></div>
			<v-btn v-if="filteredProducts.length > 0" flat class="circle-btn" color="primary" @click="scrollToResults()">
				<v-icon center>fa-angle-down</v-icon>
			</v-btn>
		</div>
	</v-container>
</template>

<script>
	import Multiselect from 'vue-multiselect';
	import GlassesSVG from '~/components/GlassesSVG';
	import SwitchGroup from '~/components/SwitchGroup';
	import scrollTo from "~/utils/scrollTo";

	export default {
		components: {
			Multiselect,
			SwitchGroup,
			'glasses-svg': GlassesSVG
		},
		data: function() {
			return {
				makeValue: null,
				modelValue: null,
				bodyTypeValue: null,
				productTypeValue: null,
				codeForSearch: '',
				selectedWindows: [],
				codeTypes: ['eurocode', 'oescode'],
				selectedCodeType: 'eurocode'
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
			},
			availableWindows() {
				return this.$store.getters["modules/products/getWindowTypes"];
			},
			filteredProducts() {
				return this.$store.getters["modules/products/getFilteredProducts"];
			},
			allImages() {
				return this.$store.getters["modules/products/getAllImages"];
			},
			filteredImages() {
				return this.$store.getters["modules/products/getFilteredImages"];
			},
			selectedImages() {
				return this.$store.getters["modules/products/getSelectedImages"];
			},
			productsAreFetched() {
				return this.$store.getters["modules/products/getProductsAreFetched"];
			}
		},
		methods: {
			scrollToResults() {
				const productsContainer = document.body.querySelector("main.content .products-container");

				scrollTo(productsContainer.offsetTop - 120, 300);
			},
			onCodeSearchClicked() {
				this.$store.dispatch("modules/products/searchForCode", {
					code: this.codeForSearch,
					type: this.selectedCodeType
				});
				this.makeValue = null;
				this.modelValue = null;
				this.bodyTypeValue = null;
				this.productTypeValue = null;
			},
			onSelectWindowType(windowTypes) {
				this.$store.dispatch("modules/products/setSelectedWindowTypes", [...windowTypes]);
				this.$store.dispatch("modules/products/filterImages");
				this.$store.dispatch("modules/products/setSelectedImages", []);
				this.$store.dispatch("modules/products/filterProducts");
			},
			toggleSelectImage(image) {
				const selectedImages = this.selectedImages.slice();
				const index = selectedImages.indexOf(image);

				if (index !== -1) {
					selectedImages.splice(index, 1);
				}
				else {
					selectedImages.push(image);
				}

				this.$store.dispatch("modules/products/setSelectedImages", selectedImages);
				this.$store.dispatch("modules/products/filterProducts");
			},
			search() {
				let reqBody = {
					"MakeId": this.makeValue && this.makeValue.Id || null,
					"ModelId": this.modelValue && this.modelValue.Id || null,
					"BodyTypeId": this.bodyTypeValue && this.bodyTypeValue.Id || null,
					"ProductType": this.productTypeValue && this.productTypeValue.Id || null
				};
				this.$store.dispatch("modules/products/searchForProducts", reqBody);
			},
			onSelectCodeType(type) {
				this.selectedCodeType = type;
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

				this.codeForSearch = '';
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

				this.codeForSearch = '';
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

				this.codeForSearch = '';
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

				this.codeForSearch = '';
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
		font-size: 50px;
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

    .image-preview {
        border: 1px solid #ccc;
        border-radius: 3px;
        margin: 5px;
        object-fit: contain;
        will-change: background-color, opacity, box-shadow;
        transition: background-color .3s cubic-bezier(0, .5, 0, .5), opacity .3s cubic-bezier(0, .5, 0, .5), box-shadow .3s cubic-bezier(0, .5, 0, .5);
    }

    .image-preview:hover {
        cursor: pointer;
        background-color: #f0f0f0;
    }

    .image-preview.disabled {
        opacity: .3;
        cursor: not-allowed;
        background-color: #fff !important;
    }

    .image-preview.selected {
        background-color: rgba(0, 100, 0, .15) !important;
        border-color: darkgreen;
        box-shadow: 0 3px 3px rgba(0,0,0, .2);
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

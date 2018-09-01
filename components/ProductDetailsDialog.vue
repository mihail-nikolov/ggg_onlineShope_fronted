<template>
	<v-content v-if="openDialog" class="details-dialog">
		<v-container fluid style="width: 100%;height: 100px;">
			<no-ssr>
				<v-dialog v-model="openDialog" max-width="1150" max-height="550">
					<v-card>
						<v-container fluid grid-list-sm>
							<v-layout wrap>
								<v-flex xs12 sm12 md6 class="details-dialog-carousel-container">
									<v-carousel xs12 class="details-dialog-carousel">
										<v-carousel-item v-for="(image,i) in curProductDetails.Images" :src="image" :key="i" contain></v-carousel-item>
									</v-carousel>
								</v-flex>
								<v-flex xs12 sm12 md6 column>
									<v-flex xs12 column>
										<v-card-text>
											<div v-if="curProductDetails.Description">
												<h4>Описание</h4>
												<div>{{curProductDetails.Description}}</div>
												<br>
											</div>
											<div class="text-container">
												<div v-if="curProductDetails.EuroCode" class="floating-product-detail">
													<h4>Eurocode</h4>
													<div>{{curProductDetails.EuroCode}}</div>
													<br>
												</div>
												<div v-if="curProductDetails.MaterialNumber" class="floating-product-detail">
													<h4>Material Number</h4>
													<div>{{curProductDetails.MaterialNumber}}</div>
													<br>
												</div>
												<div v-if="curProductDetails.IndustryCode" class="floating-product-detail">
													<h4>Industry Code</h4>
													<div>{{curProductDetails.IndustryCode}}</div>
													<br>
												</div>
												<div v-if="curProductDetails.OesCode" class="floating-product-detail">
													<h4>Oes Code</h4>
													<div>{{curProductDetails.OesCode}}</div>
													<br>
												</div>
											</div>
											<div style="clear:both">
												<h4>Тип</h4>
												<div>{{curProductDetails.ProductType}}</div>
											</div>
											<br>
											<div>
												<h4>Наличност</h4>
												<div class="availability-container">
													<div class="group" v-for="group in currentProductAvailability">
														<h5>{{ group.Group }} - {{ round(group.Price) }}лв</h5>
														<div v-for="(quantity, store) in group.StoreQUantities" v-bind:class="{ empty: quantity === 0 }">
															{{ store }} - {{ quantity }}бр.
														</div>
													</div>
												</div>
											</div>
										</v-card-text>
									</v-flex>
									<v-flex>
										<v-card-actions style="padding: 0">
											<v-spacer></v-spacer>
											<v-btn color="primary" flat @click="openDialog = false" style="padding-right:5px">
												<v-icon>mdi-close</v-icon>
												Затвори
											</v-btn>
										</v-card-actions>
									</v-flex>
								</v-flex>
							</v-layout>
						</v-container>
					</v-card>
				</v-dialog>
			</no-ssr>
		</v-container>
	</v-content>
</template>

<script>
	export default {
		name: 'ProductDetailsDialog',
		props: ['dialogDetailsOpen', 'curProductDetails'],
		data() {
			return {
				openDialog: false
			};
		},
		computed: {
			currentProductAvailability() {
				return this.$store.getters["modules/products/getCurrentObservedProductAvailability"];
			}
		},
		methods: {
			round: num => num.toFixed(2)
		},
		watch: {
			dialogDetailsOpen(value) {
				console.log(value, this.openDialog);
				this.openDialog = value;
			},
			openDialog(value) {
				if (value === false) {
					this.$emit("onCloseDetailsDialogClick", this.openDialog);
				}
			}
		}
	};
</script>

<style lang="css" scoped>
	.details-dialog-carousel-container {
		padding: 25px !important;
	}
	.details-dialog-carousel {
		height: 450px;
	}
	
	.details-dialog {
		clear: both;
		position: absolute;
	}
	
	.floating-product-detail {
		float: left;
		margin-right: 25px;
	}
	.codes-container {
		display: flex;
		flex-wrap: wrap;
	}

	.empty {
		color: rgba(33,33,33, .32);
	}

	.availability-container {
		display: flex;
		flex-wrap: wrap;
	}

	.availability-container .group {
		margin-right: 25px;
		margin-bottom: 25px;
	}
</style>

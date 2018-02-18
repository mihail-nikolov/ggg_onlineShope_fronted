<template>
	<v-content v-if="openDialog" class="details-dialog">
		<v-container fluid style="width: 100%;height: 100px;">
			<no-ssr>
				<v-dialog v-model="openDialog" persistent max-width="1300">
					<v-card>
						<v-container fluid>
							<v-layout row>
								<v-flex xs6>
									<v-carousel class="details-dialog-carousel">
										<v-carousel-item v-for="(image,i) in curProductDetails.Images" :src="image" :key="i" contain></v-carousel-item>
									</v-carousel>
								</v-flex>
								<v-flex xs6>
									<v-flex xs12 column style="height:93%">
										<v-card-text>
											<div v-if="curProductDetails.Description">
												<h4>Description</h4>
												<div>{{curProductDetails.Description}}</div>
												<br>
											</div>
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
											<div style="clear:both">
												<h4>Type</h4>
												<div>{{curProductDetails.ProductType}}</div>
											</div>
											<br>
											<div>
												<h4>Availability</h4>
												<div></div>
											</div>
										</v-card-text>
									</v-flex>
									<v-flex xs2 offset-xs9 column>
										<v-card-actions>
											<v-btn color="primary" flat @click="onCloseDetailsDialogClick" style="padding-right:5px">
												<v-icon>mdi-close</v-icon>
												Close
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
			onCloseDetailsDialogClick() {
				this.openDialog = false;
				this.$emit("onCloseDetailsDialogClick", this.openDialog);
			}
		},
		watch: {
			dialogDetailsOpen(value) {
				this.openDialog = value;
			}
		}
	};
</script>

<style lang="css" scoped>
	.details-dialog-carousel {
		height: 650px;
	}
	
	.details-dialog {
		clear: both;
		position: absolute;
	}
	
	.floating-product-detail {
		float: left;
		margin-right: 25px;
	}
</style>

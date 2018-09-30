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
                        <div v-if="curProductDetails.LocalCode" class="floating-product-detail">
                          <h4>Local Code</h4>
                          <div>{{curProductDetails.LocalCode}}</div>
                          <br>
                        </div>
                      </div>
                      <div style="clear:both">
                        <h4>Тип</h4>
                        <div>{{curProductDetails.ProductType}}</div>
                      </div>
                      <br>
                      <div class="text-container" style="clear:both">
                        <div v-if="curProductDetails.Height" class="floating-product-detail">
                          <h4>Височина: </h4>
                          <div>{{ curProductDetails.Height }} мм</div>
                          <br>
                        </div>
                        <div v-if="curProductDetails.Width" class="floating-product-detail">
                          <h4>Дължина </h4>
                          <div>{{ curProductDetails.Width }} мм</div>
                          <br>
                        </div>
                        <div v-if="curProductDetails.FittingTimeHours" class="floating-product-detail">
                          <h4>Време за монтаж: </h4>
                          <div>{{ curProductDetails.FittingTimeHours }} ч</div>
                          <br>
                        </div>
                        <div v-if="curProductDetails.Tint" class="floating-product-detail">
                          <h4>Нюанс: </h4>
                          <div>{{ curProductDetails.Tint }}</div>
                          <br>
                        </div>
                        <div style="clear:both">
                          <div v-if="curProductDetails.ModelDate" class="floating-product-detail">
                            <h4>Година на модела: </h4>
                            <div>{{ curProductDetails.ModelDate }}</div>
                            <br>
                          </div>
                          <div v-if="curProductDetails.PartDate" class="floating-product-detail">
                            <h4>Година на частта: </h4>
                            <div>{{ curProductDetails.PartDate }}</div>
                            <br>
                          </div>
                        </div>
                      </div>
                      <!--<div v-if="currentProductAvailability.length">-->
                      <!--<h4>Наличност</h4>-->
                      <!--<div class="availability-container">-->
                      <!--<div class="group" v-for="group in currentProductAvailability">-->
                      <!--<h5>{{ group.Group }} - {{ round(group.Price) }}лв</h5>-->
                      <!--<div v-for="(quantity, store) in group.StoreQUantities" v-bind:class="{ empty: quantity === 0 }">-->
                      <!--{{ store }} - {{ quantity }}бр.-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <!--</div>-->
                      <div v-if="curProductDetails.Characteristics.length" style="clear:both">
                        <h4>Характеристики</h4>
                        <div class="availability-container">
                          <span v-for="(characteristic, index) in curProductDetails.Characteristics">
                            <span>{{characteristic}}</span><span v-if="index+1 < curProductDetails.Characteristics.length">, </span>
                          </span>
                          <!--<h5 class="pointer" v-for="characteristic in curProductDetails.Characteristics">{{ characteristic }}</h5>-->
                        </div>
                      </div>
                      <br>
                      <div v-if="curProductDetails.Accessories.length" style="clear:both">
                        <h4>Аксесоари</h4>
                        <div class="availability-container">
                          <h5 class="pointer" v-for="accessory in curProductDetails.Accessories" @click="openAccessoryDialog(accessory)">{{ accessory.Description }}</h5>
                        </div>
                      </div>
                      <div v-if="curProductDetails.InterchangeableParts.length" style="clear:both">
                        <h4>Взаимнозаменяеми части</h4>
                        <div class="availability-container">
                          <h5 class="pointer" v-for="part in curProductDetails.InterchangeableParts" @click="onOpenInterchangeableDialog(part)">{{ part.Description }}</h5>
                        </div>
                      </div>
                    </v-card-text>
									</v-flex>
								</v-flex>
                                <v-flex style="padding-bottom: 8px;">
                                    <v-card-actions style="padding: 0">
                                        <v-spacer></v-spacer>
                                        <v-btn color="primary" flat @click="openDialog = false" style="padding-right:5px">
                                            <v-icon>mdi-close</v-icon>
                                            Затвори
                                        </v-btn>
                                    </v-card-actions>
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
	import productsRepository from "~/repositories/productsRepository";

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
			round: num => num.toFixed(2),
			openAccessoryDialog(acc) {
				this.$emit("onOpenAccessoryDialog", acc);
				productsRepository.getFullProduct(acc)
					.then(console.warn);
			},
			onOpenInterchangeableDialog(interchangeablePart) {
				this.$emit("onOpenInterchangeableDialog", interchangeablePart);
				productsRepository.getFullProduct(interchangeablePart)
					.then(console.warn);
			}
		},
		watch: {
			dialogDetailsOpen(value) {
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
	.pointer {
		cursor: pointer;
	}
</style>

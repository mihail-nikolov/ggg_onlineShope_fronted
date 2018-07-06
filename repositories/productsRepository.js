import baseRepository from "./baseRepository";


class ProductsRepository {
	constructor() {
		this.http = baseRepository;
		this.URL = {
			productsByCode: "Products/Get",
			productsByDetails: "Products/FindByVehicleInfo",
			product: "Products/GetItemByFullCode",
			productTypes: "Products/GetProductTypes"
		};
	}


	/**
	 @param data: {
	 	code ?: string,

		MakeId: number,
		ModelId ?: number,
		BodyTypeId ?: number
		ProductType ?: string
	 } - request data object

	 @return Promise<
		Array<{
			Id: number,
			Description: string,
			EuroCode: string,
			OesCode: string,
			MaterialNumber: string,
			LocalCode: string,
			IndustryCode: string,
			ProductType: string
			Images: Array<number>
		}>
	>
	*/
	getProducts(data) {
		if (data.MakeId === void 0 && data.code === void 0) {
			return Promise.reject("invalid params");
		}

		if (data.code !== void 0) {
			const { code } = data;
			const requestParams = { code };

			return this.http.get(this.URL.productsByCode, requestParams);
		}
		else {
			const { MakeId, ModelId, BodyTypeId, ProductType } = data;
			const requestData = { MakeId, ModelId, BodyTypeId, ProductType };

			return this.http.post(this.URL.productsByDetails, requestData);
		}
	}

	/**
	@param data: {
		EuroCode ?: string,
		OesCode ?: string,
		MaterialNumber ?: string,
		IndustryCode ?: string
	}
	*/
	getProduct(data) {
		if (data.EuroCode !== void 0) {
			return this.http.get(this.URL.product, { EuroCode: data.EuroCode });
		}
		else if (data.OesCode !== void 0) {
			return this.http.get(this.URL.product, { OesCode: data.OesCode });
		}
		else if (data.MaterialNumber !== void 0) {
			return this.http.get(this.URL.product, { MaterialNumber: data.MaterialNumber });
		}
		else if (data.IndustryCode !== void 0) {
			return this.http.get(this.URL.product, { IndustryCode: data.IndustryCode });
		}
		else {
			return Promise.reject("invalid code", data);
		}
	}

	/**
	@param data: {
		id ?: number,
		EuroCode ?: string,
		oescode ?: string,
		code ?: string
	} - request data object

	@return Array<string>
	*/
	getProductTypes(data) {
		return this.http.post(this.URL.productTypes, data);
	}

	/**
	@param data: {
		id: number
	}

	@return Promise<{
		Id: number,
		Description: string,
		EuroCode: string,
		OesCode: string,
		ModelDate: string,
		PartDate: string,
		ProductType: String,
		Modification: string,
		Tint: string,
		FittingTimeHours ?: number,
		FittingType: string,
		Height ?: number,
		Width ?: number,
		isAcousting ?: boolean,
		IsCalibration: boolean,
		IsAccessory: bool,
		MaterialNumber: string,
		LocalCode: string,
		IndustryCode: string,
		HasFittingMethod: boolean,
		FeaturedImageId: number,
		IsYesGlass: bool,
		Images: Array<number>,
		Characteristics: Array<string>,
		Accessories: Array<Accessory>,
		InterchangeableParts: Array<InterchangeablePart>
	}>
	*/
	getProductTypeById(data) {
		if (data.id === void 0) {
			return Promise.reject("no id");
		}

		return this.http.post(this.URL.productTypes, data);
	}
	/**
	@param data: {
		id: number
	}
	*/
	getProductAvailability(data) {

	}
}

const productsRepository = new ProductsRepository;

global.products = productsRepository;

export default productsRepository;

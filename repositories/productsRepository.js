import baseRepository from "./baseRepository";

class ProductsRepository {
    constructor() {
        this.http = baseRepository;
        this.URL = {
            clean: "Products",
            productsByCode: "Products/Get",
            position: "Products/GetPositions",
            productsByDetails: "Products/FindByVehicleInfo",
            product: "Products/GetItemByFullCode",
            fullProduct: "Products/GetDetailedInfo"
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

            return this.http
                .get(`${this.URL.clean}?${data.type}=${data.code}`)
                .then(products => {
                    products.forEach(product => {
                        this.inflateProduct(product);
                    });
                    return products;
                });
        } else {
            const { MakeId, ModelId, BodyTypeId, ProductType } = data;
            const requestData = { MakeId, ModelId, BodyTypeId, ProductType };

            return this.http
                .post(this.URL.productsByDetails, requestData)
                .then(products => {
                    products.forEach(product => {
                        this.inflateProduct(product);
                    });
                    return products;
                });
        }
    }

    getPosition({ Id }) {
        console.warn(!!Id);

        return this.http.post(this.URL.position, { makeId: Id });
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
        } else if (data.OesCode !== void 0) {
            return this.http.get(this.URL.product, { OesCode: data.OesCode });
        } else if (data.MaterialNumber !== void 0) {
            return this.http.get(this.URL.product, {
                MaterialNumber: data.MaterialNumber
            });
        } else if (data.IndustryCode !== void 0) {
            return this.http.get(this.URL.product, {
                IndustryCode: data.IndustryCode
            });
        } else {
            return Promise.reject("invalid code", data);
        }
    }

    getFullProduct(data) {
        let id = data.Id || "",
            eurocode = "",
            localCode = "",
            materialNumber = "",
            industryCode = "";

        if (
            data.hasOwnProperty("CleanEurocode") &&
            data.CleanEurocode !== void 0
        ) {
            eurocode = data.CleanEurocode;
        } else if (data.EuroCode !== void 0) {
            eurocode = data.EuroCode;
        }

        if (data.OesCode !== void 0) {
            localCode = data.localCode;
        }
        if (data.MaterialNumber !== void 0) {
            materialNumber = data.MaterialNumber;
        }
        if (data.IndustryCode !== void 0) {
            industryCode = data.IndustryCode;
        }

        return this.http
            .get(this.URL.fullProduct, {
                id,
                eurocode,
                localCode,
                materialNumber,
                industryCode
            })
            .then(product => {
                return this.inflateProduct(product);
            });
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
    /**
	@param data: {
		id: number
	}
	*/

    inflateProduct(product) {
        if (product.Images.length > 0) {
            product.Images = product.Images.map(image => {
                const imagePath = "/Images/" + image + ".jpg";
                return imagePath;
            });
        } else {
            product.Images.push("/Images/no-image.png");
        }

        return product;
    }
}

const productsRepository = new ProductsRepository();

global.products = productsRepository;

export default productsRepository;

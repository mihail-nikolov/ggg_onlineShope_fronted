import Vue from "vue";
import axios from "axios";
import productsRepository from "~/repositories/productsRepository";

const state = () => ({
    makes: [],
    models: [],
    bodyTypes: [],
    productTypes: [],
    allProducts: [],
    filteredProducts: [],
    currentlyObservedProductAcessory: null,
    windowTypes: [],
    selectedWindowTypes: [],
    allImages: [],
    filteredImages: [],
    selectedImages: [],
    productsAreFetched: false
});

const baseUrl = "http://﻿130.204.36.213/backend/";

const mutations = {
    SET_MAKES(state, makes) {
        state.makes = makes;
    },
    SET_MODELS(state, models) {
        state.models = models;
    },
    SET_BODY_TYPES(state, bodyTypes) {
        state.bodyTypes = bodyTypes;
    },
    SET_PRODUCT_TYPES(state, productTypes) {
        state.productTypes = productTypes;
    },
    SET_ALL_PRODUCTS(state, allProducts) {
        state.allProducts = allProducts;
    },
    SET_WINDOW_TYPES(state, types) {
        state.windowTypes = types;
    },
    SET_SELECTED_WINDOW_TYPES(state, types) {
        state.selectedWindowTypes = types;
    },
    SET_ALL_IMAGES(state, images) {
        state.allImages = images;
        // console.warn("all", images);
    },
    SET_FILTERED_IMAGES(state, images) {
        state.filteredImages = images;
        // console.warn("filtered", images);
    },
    SET_SELECTED_IMAGES(state, images) {
        state.selectedImages = images;
        // console.warn("selected", images);
    },
    SET_FILTERED_PRODUCTS(state, filteredProducts) {
        state.filteredProducts = filteredProducts;
    },
    UPDATE_PRODUCT(state, product) {
        const prodInAll = state.allProducts.find(
            prod => prod.Id === product.Id
        );
        const prodInFiltered = state.filteredProducts.find(
            prod => prod.Id === product.Id
        );
        const keys = Object.keys(product).filter(x => {
            return x !== "FeaturedImageId" && x !== "Images";
        });

        if (prodInAll) {
            for (const key of keys) {
                Vue.set(prodInAll, key, product[key]);
            }
        } else {
            state.allProducts = [product];
        }
        if (prodInFiltered) {
            for (const key of keys) {
                Vue.set(prodInFiltered, key, product[key]);
            }
        }
    },
    SET_PRODUCTS_ARE_FETCHED(state, fetched) {
        state.productsAreFetched = fetched;
    },
    SET_CURRENT_OBSERVED_PRODUCT_ACCESSORY(state, accessory) {
        state.currentlyObservedProductAcessory = accessory;
    }
};

const getters = {
    getMakes(state) {
        return state.makes;
    },
    getModels(state) {
        return state.models;
    },
    getBodyTypes(state) {
        return state.bodyTypes;
    },
    getAllProducts(state) {
        return state.allProducts;
    },
    getFilteredProducts(state) {
        return state.filteredProducts;
    },
    getWindowTypes(state) {
        return state.windowTypes;
    },
    getAllImages(state) {
        return state.allImages;
    },
    getFilteredImages(state) {
        return state.filteredImages;
    },
    getSelectedImages(state) {
        return state.selectedImages;
    },
    getSelectedWindowTypes(state) {
        return state.selectedWindowTypes;
    },
    getProductsAreFetched(state) {
        return state.productsAreFetched;
    },
    getCurrentlyObservedProductAcessory(state) {
        return state.currentlyObservedProductAcessory;
    }
};

const actions = {
    setMakes({ commit }, makes) {
        commit("SET_MAKES", makes);
    },
    setModels({ commit }, models) {
        commit("SET_MODELS", models);
    },
    setBodyTypes({ commit }, bodyTypes) {
        commit("SET_BODY_TYPES", bodyTypes);
    },
    setProductTypes({ commit }, productTypes) {
        commit("SET_PRODUCT_TYPES", productTypes);
    },
    clearProducts({ commit }) {
        commit("SET_ALL_PRODUCTS", []);
        commit("SET_WINDOW_TYPES", []);
        commit("SET_SELECTED_WINDOW_TYPES", []);
        commit("SET_ALL_IMAGES", []);
        commit("SET_FILTERED_IMAGES", []);
        commit("SET_SELECTED_IMAGES", []);
    },
    setSelectedWindowTypes({ commit }, types) {
        commit("SET_SELECTED_WINDOW_TYPES", types);
    },
    setAllImages({ commit }, images) {
        commit("SET_ALL_IMAGES", images);
    },
    setFilteredImages({ commit }, images) {
        commit("SET_FILTERED_IMAGES", images);
    },
    setSelectedImages({ commit }, images) {
        commit("SET_SELECTED_IMAGES", images);
    },
    setFilteredProducts({ commit }, products) {
        commit("SET_FILTERED_PRODUCTS", products);
    },
    filterProducts({ commit, getters }) {
        const products = getters.getAllProducts;
        const windowTypes = getters.getSelectedWindowTypes;
        const selectedImages = getters.getSelectedImages;

        let filteredProducts = products;

        if (windowTypes.length || selectedImages.length) {
            filteredProducts = products.filter(product => {
                if (windowTypes.length && selectedImages.length) {
                    if (windowTypes.includes(product.Position)) {
                        for (const image of product.Images) {
                            if (selectedImages.includes(image)) {
                                return true;
                            }
                        }
                        return false;
                    }
                } else if (windowTypes.length) {
                    return windowTypes.includes(product.Position);
                } else if (selectedImages.length) {
                    for (const image of product.Images) {
                        if (selectedImages.includes(image)) {
                            return true;
                        }
                    }
                    return false;
                }

                return false;
            });
        }

        commit("SET_FILTERED_PRODUCTS", filteredProducts);
    },
    filterImages({ commit, getters }) {
        const windowTypes = getters.getSelectedWindowTypes;
        const products = getters.getAllProducts;
        const filteredImages = new Set();

        if (windowTypes.length) {
            for (const product of products) {
                if (windowTypes.includes(product.Position)) {
                    for (const img of product.Images) {
                        filteredImages.add(img);
                    }
                }
            }
        } else {
            for (const product of products) {
                for (const img of product.Images) {
                    filteredImages.add(img);
                }
            }
        }

        commit("SET_FILTERED_IMAGES", Array.from(filteredImages));
    },
    async fetchMakes({ commit }) {
        axios
            .get(baseUrl + "api/Makes")
            .then(response => {
                if (response && response.data && response.data.length > 0) {
                    this.dispatch("modules/general/setSnackbarNotification", {
                        message: "Makes successfully fetched.",
                        status: "success"
                    });
                }
                commit("SET_MAKES", response.data);
            })
            .catch(e => {
                this.dispatch("modules/general/setSnackbarNotification", {
                    message: "Makes unsuccessfully fetched. " + e,
                    status: "error"
                });
            });
    },
    async fetchModels({ commit }, make) {
        let store = this;
        store.dispatch("modules/general/activateLoading");
        axios
            .get(baseUrl + "api/Models/GetByMakeId/" + make.Id)
            .then(response => {
                if (response && response.data && response.data.length > 0) {
                    this.dispatch("modules/general/setSnackbarNotification", {
                        message: make.Name + " models successfully fetched.",
                        status: "success"
                    });
                }
                store.dispatch("modules/general/deactivateLoading");
                commit("SET_MODELS", response.data);
            })
            .catch(e => {
                store.dispatch("modules/general/deactivateLoading");
                this.dispatch("modules/general/setSnackbarNotification", {
                    message: make.Name + " models unsuccessfully fetched. " + e,
                    status: "error"
                });
            });
    },
    async fetchBodyTypes({ commit }, data) {
        let store = this;
        store.dispatch("modules/general/activateLoading");
        axios
            .post(
                baseUrl + "api/BodyTypes/GetByMakeAndModelIds",
                data.reqBody
            )
            .then(response => {
                if (response && response.data && response.data.length > 0) {
                    this.dispatch("modules/general/setSnackbarNotification", {
                        message:
                            "Body types for " +
                            data.makeModelName +
                            " are successfully fetched.",
                        status: "success"
                    });
                }
                store.dispatch("modules/general/deactivateLoading");
                commit("SET_BODY_TYPES", response.data);
            })
            .catch(e => {
                store.dispatch("modules/general/deactivateLoading");
                this.dispatch("modules/general/setSnackbarNotification", {
                    message:
                        "Body types for " +
                        data.makeModelName +
                        " are unsuccessfully fetched. " +
                        e,
                    status: "error"
                });
            });
    },
    async searchForProducts({ commit }, reqBody) {
        let store = this;
        store.dispatch("modules/general/activateLoading");

        productsRepository
            .getProducts(reqBody)
            .then(products => {
                const productTypes = new Set();
                const images = new Set();

                products.forEach(function(product) {
                    productTypes.add(product.Position);

                    if (product.FeaturedImageId !== null) {
                        const imagePath =
                            "/Images/" + product.FeaturedImageId + ".jpg";
                        images.add(imagePath);
                    }
                });

                // console.warn(products);

                store.dispatch("modules/general/deactivateLoading");
                commit("SET_WINDOW_TYPES", [...productTypes]);
                commit("SET_SELECTED_WINDOW_TYPES", []);
                commit("SET_ALL_IMAGES", Array.from(images));
                commit("SET_FILTERED_IMAGES", []);
                commit("SET_SELECTED_IMAGES", []);
                commit("SET_ALL_PRODUCTS", products);
                commit("SET_FILTERED_PRODUCTS", products);
            })
            .catch(e => {
                store.dispatch("modules/general/deactivateLoading");
            })
            .then(x => {
                commit("SET_PRODUCTS_ARE_FETCHED", true);
            });
    },
    async getFullProduct({ commit }, { product }) {
        this.dispatch("modules/general/activateLoading");
        return productsRepository
            .getFullProduct(product)
            .then(fullProduct => {
                commit("UPDATE_PRODUCT", fullProduct);
                this.dispatch("modules/general/deactivateLoading");
            })
            .catch(e => {
                this.dispatch("modules/general/deactivateLoading");
            });
    },
    async getAccessory({ commit }, accessory) {
        return productsRepository
            .getFullProduct(accessory)
            .then(accessoryProduct => {
                commit(
                    "SET_CURRENT_OBSERVED_PRODUCT_ACCESSORY",
                    accessoryProduct
                );
                this.dispatch("modules/general/deactivateLoading");
            })
            .catch(e => {
                this.dispatch("modules/general/deactivateLoading");
            });
    },
    async searchForCode({ commit }, { code, type }) {
        let store = this;
        store.dispatch("modules/general/activateLoading");
        productsRepository
            .getProducts({ code, type })
            .then(products => {
                const productTypes = new Set();
                const images = new Set();

                products.forEach(function(product) {
                    productTypes.add(product.Position);

                    if (product.FeaturedImageId !== null) {
                        const imagePath =
                            "/Images/" + product.FeaturedImageId + ".jpg";
                        images.add(imagePath);
                    }
                });

                store.dispatch("modules/general/deactivateLoading");
                commit("SET_WINDOW_TYPES", [...productTypes]);
                commit("SET_SELECTED_WINDOW_TYPES", []);
                commit("SET_ALL_IMAGES", Array.from(images));
                commit("SET_FILTERED_IMAGES", []);
                commit("SET_SELECTED_IMAGES", []);
                commit("SET_ALL_PRODUCTS", products);
                commit("SET_FILTERED_PRODUCTS", products);
            })
            .catch(e => {
                store.dispatch("modules/general/deactivateLoading");
            })
            .then(x => {
                commit("SET_PRODUCTS_ARE_FETCHED", true);
            });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};

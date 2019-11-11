"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stores_controller_1 = require("../controllers/stores.controller");
const router = express_1.Router();
router.route('/addnewstore')
    .post(stores_controller_1.addNewStore);
router.route('/addstoreproducts')
    .post(stores_controller_1.addStoreProducts);
router.route('/storeinfo')
    .post(stores_controller_1.fetchAllStores);
router.route('/storeinfo/storeproducts')
    .post(stores_controller_1.fetchStoreProductsById);
router.route('/storeinfo/storeorders')
    .post(stores_controller_1.fetchStoreOrdersById);
router.route('/storeinfo/storeorderproducts/:orderId')
    .get(stores_controller_1.fetchStoreOrderProductsById);
// router.route('/storeinfo/storeproducts/:storeProductMappingId')
//     .get(fetchStoreProductById)
//     .put(updateStoreProductById)
// .delete(deleteStoreProductById);
router.route('/storeinfo/:storeId')
    .get(stores_controller_1.fetchStoreById)
    .put(stores_controller_1.updateStore);
// .delete(deleteStore);
// router.route('/:page_number/:page_size')
//     .get(fetchAllStores);
exports.default = router;

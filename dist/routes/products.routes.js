"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const products_controller_1 = require("../controllers/products.controller");
const router = express_1.Router();
router.route('/')
    .post(products_controller_1.addProduct);
router.route('/category/:categoryId')
    .get(products_controller_1.getcategoryProductInfo);
router.route('/productsearch/:productName')
    .get(products_controller_1.searchProductByName);
// .put(updateProduct)
// .delete(deleteProduct);
router.route('/:productId')
    .get(products_controller_1.getProduct)
    .put(products_controller_1.updateProduct)
    .delete(products_controller_1.deleteProduct);
router.route('/fetchProducts')
    .post(products_controller_1.getProducts);
exports.default = router;

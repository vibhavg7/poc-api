"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("../database");
// import { Customer } from '../interfaces/Product';
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // setTimeout(() => {
        //     console.log('Hiii')
        // }, 4000);
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_PRODUCTSINFO(?,?,?)`;
        yield conn.query(sql, [+req.body.page_number, +req.body.page_size, req.body.filterBy], function (err, products) {
            if (err) {
                // console.log("error: ", err);
                res.json({
                    "message": "Problem fetching Products list ",
                    "status": 400,
                    "product_id": 0
                });
            }
            else {
                res.json({
                    "message": "Product list",
                    "products": products[0],
                    "products_total_count": products[1][0]
                });
            }
        });
    });
}
exports.getProducts = getProducts;
function searchProductByName(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL FILTER_PRODUCTS_BYNAME(?)`;
        yield conn.query(sql, [req.params.productName], function (err, products) {
            if (err) {
                // console.log("error: ", err);
                res.json({
                    "message": "product information not found",
                    "status": 400,
                    "product_id": 0
                });
            }
            else {
                res.json({
                    "message": "products information",
                    "products": products[0],
                    "products_total_count": products[1][0]
                });
            }
        });
    });
}
exports.searchProductByName = searchProductByName;
function getcategoryProductInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_CATEGORY_PRODUCTS_INFO(?)`;
        yield conn.query(sql, [req.params.categoryId], function (err, products) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                res.json({
                    "message": "Category products Information",
                    "products": products[0]
                });
            }
        });
    });
}
exports.getcategoryProductInfo = getcategoryProductInfo;
function addProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(req.body);
        const newProduct = req.body;
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL ADD_PRODUCT_DETAIL(?,?,?,?,?,?,?,?,?)`;
        let product_name = req.body.product_name;
        let product_price = +req.body.product_price;
        let weight_type = +req.body.weight_type;
        let category_id = +req.body.category_id;
        let product_code = req.body.product_code;
        let product_description = req.body.product_description;
        let product_rating = +req.body.product_rating;
        let product_weight = +req.body.product_weight;
        let status = +req.body.status;
        // console.log(product_name + '-' + product_price + '-' + weight_type + '-' + category_id
        // + '-' + product_code + '-' + product_description + '-' + product_rating + '-' + status);
        yield conn.query(sql, [product_name, product_price, weight_type, category_id,
            product_code, product_description, product_rating, status, product_weight], function (err, product) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "message": "product not added",
                    "status": 400,
                    "product_id": 0
                });
            }
            else {
                console.log(JSON.stringify(product));
                res.json({
                    "status": 200,
                    "message": "Product added",
                    "product_id": product[0][0]['product_id']
                });
            }
        });
    });
}
exports.addProduct = addProduct;
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log('getProduct');
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL GET_PRODUCT_DETAIL(?)`;
        yield conn.query(sql, [req.params.productId], function (err, product) {
            // console.log(product);
            if (err) {
                console.log("error: ", err);
            }
            else {
                res.json({
                    "message": "Product detail",
                    "product": product[0][0]
                });
            }
        });
    });
}
exports.getProduct = getProduct;
function deleteProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        yield conn.query("DELETE FROM products WHERE product_id = ? ", req.params.productId, function (err, product) {
            if (err) {
                console.log("error: ", err);
            }
            else {
                console.log(JSON.stringify(product));
                res.json(product);
            }
        });
    });
}
exports.deleteProduct = deleteProduct;
function updateProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL UPDATE_PRODUCT_INFO(?,?,?,?,?,?,?,?,?,?)`;
        let product_id = +req.body.product_id;
        let product_name = req.body.product_name;
        let product_price = +req.body.product_price;
        let weight_type = +req.body.weight_type;
        let category_id = +req.body.category_id;
        let product_code = req.body.product_code;
        let product_description = req.body.product_description;
        let product_rating = +req.body.product_rating;
        let product_weight = +req.body.product_weight;
        let status = +req.body.status;
        yield conn.query(sql, [product_id, product_name, product_price, status,
            weight_type, product_code, product_description, product_rating, category_id, product_weight], function (err, updatedProduct) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "status": 400,
                    "message": "Product not updated",
                    "product_id": 0
                });
            }
            else {
                res.json({
                    "status": 200,
                    "message": "Product detail",
                    "product": updatedProduct[0][0]["last_updated_product_id"]
                });
            }
        });
    });
}
exports.updateProduct = updateProduct;
function updateProductImages(productId, imageUrl, req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const conn = yield database_1.connect_aws_grostep();
        let sql = `CALL UPDATE_PRODUCT_IMAGES(?,?,?)`;
        let product_id = +productId;
        let image_url = imageUrl;
        let status = 1;
        yield conn.query(sql, [product_id, image_url, status], function (err, updatedProduct) {
            if (err) {
                console.log("error: ", err);
                res.json({
                    "status": 400,
                    "message": "Product images not updated",
                    "product_id": 0
                });
            }
            else {
                res.json({
                    "status": 200,
                    "message": "Product detail",
                    "product": updatedProduct[0][0]
                });
            }
        });
    });
}
exports.updateProductImages = updateProductImages;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const path = require('path');
var bodyParser = require("body-parser");
var multer = require('multer');
const products_controller_1 = require("../controllers/products.controller");
const category_controller_1 = require("../controllers/category.controller");
const stores_controller_1 = require("../controllers/stores.controller");
const file_upload_1 = require("../services/file-upload");
var app = express();
const singleUpload = file_upload_1.uploadImage.single('image');
app.post('/products/:productId', (req, res) => {
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', key: process.env.secretAccessKey, key2: process.env.accessKeyId, key3: process.env.region, detail: err.message }] });
        }
        products_controller_1.updateProductImages(req.params.productId, req.file.location, req, res);
    });
});
app.post('/category/:categoryid', (req, res) => {
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        category_controller_1.updateStoreCategoryImages(req.params.categoryid, req.file.location, req, res);
    });
});
app.post('/merchants/:merchantId', (req, res) => {
    singleUpload(req, res, function (err) {
        if (err) {
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        stores_controller_1.updateStoreImages(req.params.merchantId, req.file.location, req, res);
    });
});
// app.post('/bannerImages/:bannerId', upload.array('uploadedImages[]', 12), (req: any, res: any) => {
//     try {
//         res.send(req.files);
//     } catch(error) {
//           console.log(error);
//            res.send(400);
//     }
// });
exports.default = app;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
const path = require('path');
var bodyParser = require("body-parser");
var multer = require('multer');
const uuidv4 = require('uuid/v4');
const products_controller_1 = require("../controllers/products.controller");
const category_controller_1 = require("../controllers/category.controller");
const stores_controller_1 = require("../controllers/stores.controller");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/uploads');
    },
    filename: function (req, file, cb) {
        // console.log(file.originalname.substr(0, file.originalname.indexOf('.')));
        console.log(path.extname(file.originalname));
        // + "_"+ req.params.productId
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
var app = express();
app.post('/products/:productId', upload.array('uploadedImages[]', 12), (req, res) => {
    try {
        products_controller_1.updateProductImages(req.params.productId, req.files[0].originalname, req, res);
        // res.send(req.files);
    }
    catch (error) {
        console.log(error);
        res.send(400);
    }
});
app.post('/category/:categoryid', upload.array('uploadedImages[]', 12), (req, res) => {
    try {
        req.body.image_url = req.files[0].originalname;
        req.body.store_category_id = req.params.categoryid;
        category_controller_1.updateStoreCategoryImages(req, res);
        // res.send(req.files);
    }
    catch (error) {
        console.log(error);
        res.send(400);
    }
});
app.post('/merchants/:merchantId', upload.array('uploadedImages[]', 12), (req, res) => {
    try {
        req.body.image_url = req.files[0].originalname;
        req.body.store_id = req.params.merchantId;
        stores_controller_1.updateStoreImages(req, res);
    }
    catch (error) {
        console.log(error);
        res.send(400);
    }
});
app.post('/bannerImages/:bannerId', upload.array('uploadedImages[]', 12), (req, res) => {
    try {
        res.send(req.files);
    }
    catch (error) {
        console.log(error);
        res.send(400);
    }
});
exports.default = app;

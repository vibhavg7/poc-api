var express = require("express");
const path = require('path')
var bodyParser = require("body-parser");
var multer = require('multer');
const uuidv4 = require('uuid/v4');
import { updateProductImages } from '../controllers/products.controller';
import { updateStoreCategoryImages } from '../controllers/category.controller';
import { updateStoreImages } from '../controllers/stores.controller';

var storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, './dist/uploads');
    },
    filename: function (req: any, file: any, cb: any) {
        // console.log(file.originalname.substr(0, file.originalname.indexOf('.')));
        console.log(path.extname(file.originalname));
        // + "_"+ req.params.productId
        cb(null, file.originalname);
    }
});
var upload = multer({ storage: storage });
var app = express();

app.post('/products/:productId', upload.array('uploadedImages[]', 12), (req: any, res: any) => {
    try {
        updateProductImages(req.params.productId,req.files[0].originalname,req,res);
        // res.send(req.files);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});

app.post('/category/:categoryid', upload.array('uploadedImages[]', 12), (req: any, res: any) => {
    try {
        req.body.image_url = req.files[0].originalname;
        req.body.store_category_id = req.params.categoryid;
        updateStoreCategoryImages(req,res);
        // res.send(req.files);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});

app.post('/merchants/:merchantId', upload.array('uploadedImages[]', 12), (req: any, res: any) => {
    try {
        req.body.image_url = req.files[0].originalname;
        req.body.store_id = req.params.merchantId;
        updateStoreImages(req,res);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});

app.post('/bannerImages/:bannerId', upload.array('uploadedImages[]', 12), (req: any, res: any) => {
    try {
        res.send(req.files);
    } catch(error) {
          console.log(error);
           res.send(400);
    }
});

export default app;

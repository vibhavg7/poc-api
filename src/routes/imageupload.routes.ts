var express = require("express");
const path = require('path')
var bodyParser = require("body-parser");
var multer = require('multer');

import { updateProductImages } from '../controllers/products.controller';
import { updateStoreCategoryImages } from '../controllers/category.controller';
import { updateStoreImages } from '../controllers/stores.controller';
import { uploadImage } from '../services/file-upload';


var app = express();

const singleUpload = uploadImage.single('image');

app.post('/products/:productId', (req: any, res: any) => {
    singleUpload(req, res, function (err: any) {
        if (err) {            
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        updateProductImages(req.params.productId, req.file.location, req, res);        
    })
});


app.post('/category/:categoryid',(req: any, res: any) => {

    singleUpload(req, res, function (err: any) {
        if (err) {            
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        updateStoreCategoryImages(req.params.categoryid, req.file.location, req, res);        
    });
});

app.post('/merchants/:merchantId', (req: any, res: any) => {

    singleUpload(req, res, function (err: any) {
        if (err) {            
            return res.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
        }
        updateStoreImages(req.params.merchantId, req.file.location, req, res);        
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

export default app;

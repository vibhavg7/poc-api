import { Request, Response } from 'express';
import { connect, connect_grostep } from '../database';
import { stat } from 'fs';
var multer = require('multer');

// var storage = multer.diskStorage({
//     // destination
//     destination: function (req: any, file: any, cb: any) {
//         cb(null, './uploads/')
//     },
//     filename: function (req: any, file: any, cb: any) {
//         cb(null,file.fieldname + '-' + Date.now());
//     }
// });

var upload = multer({dest:'./uploads/'});

export function addImages(req: any, res: any,next:any) {
    console.log(typeof upload);
    // upload(req, res, function (err:any) {
    //     if (err) {
    //       // This is a good practice when you want to handle your errors differently
    
    //       return
    //     }
    
    //     // Everything went fine 
    //   }) 
}

// console.log('Hey');
// upload(req, res, function (err: any) {
//    if (err) {
//        res.status(501).json({ error: err });
//    }
//    console.log('files', req.files);
//    res.send(req.files);
//    // res.json({ product_id: req.params.productId, orignal_name: req.file.originalname, upload_name: req.file.filename });
// })
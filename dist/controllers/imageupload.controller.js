"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var upload = multer({ dest: './uploads/' });
function addImages(req, res, next) {
    console.log(typeof upload);
    // upload(req, res, function (err:any) {
    //     if (err) {
    //       // This is a good practice when you want to handle your errors differently
    //       return
    //     }
    //     // Everything went fine 
    //   }) 
}
exports.addImages = addImages;
// console.log('Hey');
// upload(req, res, function (err: any) {
//    if (err) {
//        res.status(501).json({ error: err });
//    }
//    console.log('files', req.files);
//    res.send(req.files);
//    // res.json({ product_id: req.params.productId, orignal_name: req.file.originalname, upload_name: req.file.filename });
// })

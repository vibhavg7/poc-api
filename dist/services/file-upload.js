"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
aws.config.update({
    secretAccessKey: process.env.secretAccessKey,
    accessKeyId: process.env.accessKeyId,
    region: process.env.region
    //'k0jdez7T9AGSGh38kOlnSGEvdQOBYitbFANka1uF', //'AKIAJJLPFNJDMII4ITPQ',//'us-east-2'
});
const s3 = new aws.S3();
const fileFilter = (req, file, cb) => {
    if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
        cb(null, true);
    }
    else {
        cb(new Error("Invalid mime type, only jpeg and png allowed"), false);
    }
};
exports.uploadImage = multer({
    fileFilter: fileFilter,
    storage: multerS3({
        s3: s3,
        bucket: 'grostep-upload',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'TESTING_META_DETA!' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString());
        }
    })
});
// module.exports = upload;

const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')

aws.config.update({
    secretAccessKey:'k0jdez7T9AGSGh38kOlnSGEvdQOBYitbFANka1uF',
    accessKeyId:'AKIAJJLPFNJDMII4ITPQ',
    region:'us-east-2'
})


const s3 = new aws.S3();

const fileFilter = (req:any,file:any,cb:any) =>{
    if((file.mimetype === 'image/jpeg') ||(file.mimetype === 'image/png')){
        cb(null,true);
    }
    else {
        cb(new Error("Invalid mime type, only jpeg and png allowed"),false);
    }
}
 
export const uploadImage = multer({
  fileFilter :fileFilter,
  storage: multerS3({
    s3: s3,
    bucket: 'grostep-upload',
    acl: 'public-read',
    metadata: function (req:any, file:any, cb:any) {
      cb(null, {fieldName: 'TESTING_META_DETA!'});
    },
    key: function (req:any, file:any, cb:any) {
      cb(null, Date.now().toString())
    }
  })
})

// module.exports = upload;

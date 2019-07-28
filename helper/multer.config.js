const aws = require("aws-sdk"), 
  multer = require("multer"), 
  multerS3 = require("multer-s3");
require("custom-env").env();

var maxSize = 1 * 1000 * 1000;

aws.config.update({
  secretAccessKey: process.env.accessKeyId,
  accessKeyId: process.env.accessKeyId,
  region: process.env.region
});

s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    limits: { fileSize: maxSize },

    bucket: "socialfacebookconnector",
    key: function(req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
      console.log(file);
    }
  })
});
module.exports = upload;
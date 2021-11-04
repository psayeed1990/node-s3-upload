const AWS = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const s3 = new AWS.S3();

AWS.config.getCredentials(function (err) {
    if (err) console.log(err);
    // credentials not loaded
    else {
        console.log("Access key:", AWS.config.credentials.accessKeyId);
    }
});

//using multer
var upload = multer({
    //storage using multer-s3
    storage: multerS3({
        s3: s3,
        bucket: "upload-from-node",
        acl: "public-read",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },

        //generates key
        key: function (req, file, cb) {
            const ext = file.mimetype.split("/")[1];
            cb(null, Date.now().toString() + "." + ext);
        },
    }),
});
exports.uploadImage = upload.single("img");

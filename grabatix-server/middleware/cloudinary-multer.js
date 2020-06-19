const cloudinary = require(`cloudinary`).v2
const multer = require(`multer`)
const Datauri = require('datauri');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const imageStore = {
  uploadToCloud(req, res, next) {
    if (!req.file) {
      return next()
    }

    const dUri = new Datauri();
    /**
     * @description This function converts the buffer to data url
     * @param {Object} req containing the field object
     * @return {String} The data url from the string buffer
     */
    const dataUri = (req) =>
      dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

    const file = dataUri(req).content
    cloudinary.uploader
      .upload(file, {
        transformation: {
          width: 512,
          height: 512,
          crop: `limit`,
          quality: `auto`,
        },
        folder: `images/${req.params.id}`,
        allowed_formats: [`jpg`, `jpeg`, `png`, `svg`],
      })
      .then((image) => {
        req.image = image
      })
      .then((result) => {
        return next()
      })
      .catch((err) => {
        console.log(err)
        next(err)
      })
  },
}
const storage = multer.memoryStorage()
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 2 }
})

module.exports = {
  upload,
  imageStore,
}

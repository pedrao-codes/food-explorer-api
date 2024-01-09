const path = require("path")
const multer = require("multer")

const TMP_FOLDER = path.resolve(__dirname, "..", "..", "tmp")
const UPLOADS_FOLDER = path.resolve(TMP_FOLDER, "uploads")

const MULTER = {
    Storage: multer.diskStorage({
        destination: TMP_FOLDER,
        filename(request, file, callback) {
            return callback(null, file.originalname)
        }
    })
}

module.exports = { TMP_FOLDER, UPLOADS_FOLDER, MULTER }
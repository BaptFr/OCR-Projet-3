const multer = require('multer')

const MIME_TYPE = {
	'image/jpg': 'jpg',
	'image/jpeg': 'jpg',
	'image/png': 'png',
	'image/webp': 'webp',
}

const storage = multer.memoryStorage();

const fileFilter = (req, file, callback) => {
  const isValid = !!MIME_TYPE[file.mimetype];
  const error = isValid ? null : new Error('Invalid mime type');
  callback(error, isValid);
};

module.exports = multer({ storage, fileFilter }).single('image');

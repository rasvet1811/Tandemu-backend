const express = require('express');
const router = express.Router();
const multer = require('multer');
const materiasFilesController = require('../controllers/materiasFilesController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('archivo'), materiasFilesController.createFile);
router.get('/:user_id', materiasFilesController.getFiles);

module.exports = router;

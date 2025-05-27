const express = require('express');
const router = express.Router();
const multer = require('multer');
const userProfilesController = require('../controllers/userProfilesController');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

router.post('/', upload.single('imagen'), userProfilesController.upsertProfile);
router.get('/:user_id', userProfilesController.getProfile);

module.exports = router;

const express = require('express');
const router = express.Router();
const multer = require('multer');
const postsController = require('../controllers/postsController');

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// Crear publicación (con archivo)
router.post('/', upload.single('archivo'), postsController.createPost);

// Obtener todas las publicaciones
router.get('/', postsController.getPosts);

module.exports = router;
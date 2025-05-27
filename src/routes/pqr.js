const express = require('express');
const router = express.Router();
const pqrController = require('../controllers/pqrController');

router.post('/', pqrController.createPQR);
router.get('/:user_id', pqrController.getPQRs);

module.exports = router;

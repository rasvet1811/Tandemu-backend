const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.post('/', calendarController.createEvent);
router.get('/:user_id', calendarController.getEvents);

module.exports = router;

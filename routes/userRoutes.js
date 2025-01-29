const express = require('express');
const { protect, roleCheck } = require('../middlewares/auth');
const { createStaff } = require('../controllers/userController');

const router = express.Router();

router.post('/staff', protect, roleCheck(['admin']), createStaff);

module.exports = router;

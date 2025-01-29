const express = require('express');
const router = express.Router();
const { createProduct } = require('../controllers/productController');
const { protect, roleCheck } = require('../middlewares/auth');
const { getAllUsers, getAllVendors, getAllStaff } = require('../controllers/adminController');
const { assignVendorsToStaff } = require('../controllers/adminController');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '..', 'uploads', 'products');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });

const upload = multer({ storage });

router.post('/products', protect, roleCheck(['admin', 'staff']), upload.array('images', 5), createProduct);
router.get('/users', protect, roleCheck(['admin']), getAllUsers);
router.get('/vendors', protect, roleCheck(['admin']), getAllVendors);
router.get('/staffs', protect, roleCheck(['admin']), getAllStaff);
router.post('/assign-vendors', protect, roleCheck(['admin']), assignVendorsToStaff);

module.exports = router;
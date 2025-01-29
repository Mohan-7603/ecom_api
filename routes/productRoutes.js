const express = require('express');
const { createProduct, getProducts } = require('../controllers/productController');
const { protect, roleCheck } = require('../middlewares/auth');
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
const router = express.Router();

router.post('/create', protect, roleCheck(['vendor','staff', 'admin']), upload.array('images', 5), createProduct);

router.get('/', protect, getProducts);

module.exports = router;

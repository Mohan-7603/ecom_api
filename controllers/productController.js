const Product = require('../models/Product');

const createProduct = async (req, res) => {
  let { name, description, category, scheduledStartDate, oldPrice, newPrice, freeDelivery, deliveryAmount ,vendorId } = req.body;

  try {
    if (!name || !description || !category || !scheduledStartDate || oldPrice === undefined || newPrice === undefined ) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    if (!freeDelivery && !deliveryAmount) {
      return res.status(400).json({ message: 'Delivery amount is required' });
    }
    
    if (req.user.role === 'vendor') {
      vendorId = req.user._id;
    }

    if  ((req.user.role === 'admin' && !vendorId) || (req.user.role === 'staff' && !vendorId)) {
      return res.status(400).json({ message: 'Vendor ID is required for admin to create a product' });
    }

     if (req.user.role === 'staff' && !req.user.assignedVendors.includes(vendorId)) {
      return res.status(403).json({ message: 'You are not authorized to add products for this vendor' });
    }

    freeDelivery = JSON.parse(freeDelivery); 
    deliveryAmount = Number(deliveryAmount);
    
    const expiryDate = new Date(scheduledStartDate);
    expiryDate.setDate(expiryDate.getDate() + 7);

    const slug = `${name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;

    const images = req.files ? req.files.map((file) => file.path) : [];

    const product = new Product({
      name,
      description,
      category,
      scheduledStartDate,
      expiryDate,
      oldPrice,
      newPrice,
      freeDelivery,
      deliveryAmount: freeDelivery ? 0 : deliveryAmount || 0,
      slug,
      images,
      vendor : vendorId,
    });

    await product.save();
    res.status(201).json(product);

  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getProducts = async (req, res) => {
  const { page = 1, limit = 10, search } = req.query;

  try {
    const query = search ? { name: { $regex: search, $options: 'i' } } : {};

    if (req.user.role === 'staff') {
      query.vendor = { $in: req.user.assignedVendors };
    }
    
    if (req.user.role === 'vendor') {
      query.vendor = req.user._id; 
    }
    
    const products = await Product.find(query)
      .populate('vendor', 'name email')   
      .skip((page - 1) * limit)
      .limit(Number(limit));

      const productsWithDiscount = products.map(product => {
        const discountAmount = product.oldPrice > product.newPrice ? (product.oldPrice - product.newPrice).toFixed(2) : "0.00";
        const discountPercent = product.oldPrice > product.newPrice ? (((product.oldPrice - product.newPrice) / product.oldPrice) * 100).toFixed(2) : "0.00";
        return { ...product._doc, discountAmount, discountPercent };
      });

    res.json(productsWithDiscount);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = { createProduct, getProducts };

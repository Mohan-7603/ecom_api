// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  scheduledStartDate: { 
    type: Date, 
    required: true 
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  oldPrice: {
    type: Number,
    required : true,
  },
  newPrice: {
    type: Number,
    required : true,
  },
  freeDelivery: {
    type: Boolean,
    default: false,
  },
  deliveryAmount: {
    type: Number,
    default: 0,
  },
  slug: { 
    type: String, 
    unique: true, 
    required: true 
  },
  images: [{ 
    type: String 
  }],
  vendor: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  expired: { 
    type: Boolean, 
    default: false 
  },
});

module.exports = mongoose.model('Product', productSchema);

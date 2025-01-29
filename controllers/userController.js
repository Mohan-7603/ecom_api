const User = require('../models/User');
const Product = require('../models/Product');

const createStaff = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const staffExists = await User.findOne({ email });
    if (staffExists) {
      return res.status(400).json({ message: 'Staff already exists' });
    }

    const staff = await User.create({ name, email, password, role: 'staff', createdBy: req.user._id });
    res.status(201).json(staff);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { createStaff };

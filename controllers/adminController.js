const User = require('../models/User');

const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const users = await User.find().select('-password').skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const assignVendorsToStaff = async (req, res) => {
  const { staffId, vendorIds } = req.body;

  try {
    const staff = await User.findById(staffId);

    if (!staff || staff.role !== 'staff') {
      return res.status(400).json({ message: 'Invalid staff member' });
    }

    const vendors = await User.find({ _id: { $in: vendorIds }, role: 'vendor' });

    if (vendors.length !== vendorIds.length) {
      return res.status(400).json({ message: 'Some vendors were not found' });
    }

    staff.assignedVendors.push(...vendors.map(vendor => vendor._id));
    await staff.save();

    res.status(200).json({ message: 'Vendors assigned successfully' });
  } catch (error) {
    console.error('Error assigning vendors:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllVendors = async (req, res) => {
  try {
      const vendors = await User.find({ role: 'vendor' }).select('-password');
      res.status(200).json(vendors);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllStaff = async (req, res) => {
  try {
      const staff = await User.find({ role: 'staff' }).select('-password');
      res.status(200).json(staff);
  } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};

module.exports = { getAllUsers, getAllVendors, getAllStaff, assignVendorsToStaff };

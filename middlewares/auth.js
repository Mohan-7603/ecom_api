const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.id);
            next();
        } catch (err) {
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    } else {
        res.status(401).json({ message: 'No token provided' });
    }
};

const roleCheck = (roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Access forbidden: Insufficient permissions' });
        }

         if (req.user.role === 'vendor' && req.body.vendorId && req.body.vendorId !== req.user._id.toString()) {
            return res.status(403).json({ message: "Vendors can only create products for themselves" });
        }

        next();
    };
};

module.exports = { protect, roleCheck };

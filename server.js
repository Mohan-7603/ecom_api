const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const adminRoutes = require('./routes/adminRoutes');


dotenv.config();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/admin', adminRoutes);

const insertSuperAdmin = async () => {
    const User = require('./models/User');  
  
    try {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (!existingAdmin) {
        const superAdmin = await User.create({
          name: 'Super Admin',
          email: 'admin@gmail.com',
          password: 'Admin@123',
          role: 'admin',
        });
        console.log(`Super Admin created: ${superAdmin.email}`);
      } else {
        console.log('Super Admin already exists');
      }
    } catch (error) {
      console.error('Error creating Super Admin:', error.message);
    }
  };

connectDB().then(async () => {
    await insertSuperAdmin(); 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

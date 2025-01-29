# E-Commerce API

## Overview
This project is an E-Commerce API built using **Node.js** and **MongoDB**. The API supports different user roles: **Admin, Staff, Vendor, and Buyer**, each with specific functionalities. The system ensures proper authentication, authorization, and data validation.

## Features
- **User Authentication**: Secure signup and login with hashed passwords.
- **Role-Based Access Control (RBAC)**: Admin, Staff, Vendors, and Users have different permissions.
- **Product Management**:
  - Admin can create and manage all products.
  - Vendors can add and view their own products.
  - Staff can add products for assigned vendors.
  - Users can browse products.
- **Product Expiry**: Products expire 7 days after the scheduled start date.
- **Unique Product URLs**: Each product has a unique URL.
- **Pricing and Discounts**:
  - Old and new prices are stored.
  - Discounts are dynamically calculated.
  - Prices are handled as floating values with up to two decimal places.
- **Search & Pagination**: Efficient product search with server-side pagination.
- **Image Uploads**: Product images can be uploaded.

## Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)
- **File Upload**: Multer

## Installation & Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/Mohan-7603/ecom_api.git
   cd ecom_api
   ```
2. **Install Dependencies:**
   ```sh
   npm install
   ```
3. **Create a `.env` File:**
   ```sh
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secret_key
   ```
4. **Run the Server using Nodemon:**
   ```sh
   npm start
   ```
   The API will be running at `http://localhost:5000`.

## API Endpoints
### Authentication
- `POST /api/auth/signup` - User Signup (Admin, Staff, Vendor, Buyer)
- `POST /api/auth/login` - User Login

### Admin Routes
- `GET /api/admin/users` - Get all users (Admins, Staff, Vendors, Buyers)
- `GET /api/admin/vendors` - Get all vendors
- `GET /api/admin/staffs` - Get all staffs
- `POST /api/admin/products` - Create a product
- `POST /api/admin/assign-vendors` - Assigns vendors to staff
- `POST /api/users/staff` - Create a staff

### Staff Routes
- `POST /api/products/create` - Add a product for an assigned vendor
- `GET /api/products` - View assigned vendor products

### Vendor Routes
- `POST /api/products/create` - Add a product
- `GET /api/products` - View own products

### Buyer Routes
- `GET /api/products` - View all products

### Search & Pagination
- `GET /api/products/search?q=keyword&page=1&limit=10` - Search products with pagination

## Folder Structure
```
Ecom-API/
│-- models/        # Mongoose models
│-- routes/        # Express routes
│-- controllers/   # Route handlers
│-- middlewares/   # Auth & validation middlewares
│-- uploads/       # Uploaded product images
│-- config/        # Config files (database, env setup)
│-- server.js      # Entry point
```

## Postman Collection
A Postman collection with all API endpoints is included in the repository under the `postman/` folder.



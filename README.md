# E-Commerce Web Application

## Project Overview
This Is A Full-Stack E-Commerce Web Application Built Using The MERN Stack (MongoDB, Express.js, React.js, Node.js). The Application Provides A Complete Shopping Experience With User Authentication, Product Management, Shopping Cart Functionality, And Order Processing.

## Features

### User Features
- User Registration And Authentication
- Product Browsing And Searching
- Shopping Cart Management
- Order Placement And Tracking
- User Profile Management
- Address Management
- Order History View

### Admin Features
- Product Management (Add, Edit, Delete)
- Order Management
- User Management
- Category And Brand Management
- Stock Management

## Technical Stack

### Frontend
- React.js For Building User Interface
- Redux For State Management
- React Router For Navigation
- Axios For API Requests
- Material-UI For Styling

### Backend
- Node.js And Express.js For Server
- MongoDB For Database
- JWT For Authentication
- Multer For File Uploads
- Mongoose For Database Operations

## Project Structure
```
E-Commerce-App/
├── Client/                 # Frontend React Application
│   ├── Public/            # Static Files
│   └── Src/               # Source Files
│       ├── Components/    # Reusable Components
│       ├── Pages/         # Page Components
│       ├── Store/         # Redux Store
│       └── Utils/         # Utility Functions
│
└── Server/                # Backend Node.js Application
    ├── Controllers/       # Route Controllers
    ├── Models/           # Database Models
    ├── Routes/           # API Routes
    └── Utils/            # Utility Functions
```

## Setup Instructions

### Prerequisites
- Node.js (Version 14 Or Higher)
- MongoDB
- NPM Or Yarn

### Installation Steps
1. Clone The Repository
```bash
git clone https://github.com/yourusername/e-commerce-app.git
```

2. Install Dependencies
```bash
# Install Server Dependencies
cd server
npm install

# Install Client Dependencies
cd ../client
npm install
```

3. Environment Setup
- Create A `.env` File In The Server Directory
- Add The Following Environment Variables:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

4. Run The Application
```bash
# Start The Server
cd server
npm start

# Start The Client
cd ../client
npm start
```

## API Endpoints

### Authentication
- POST /api/auth/register - User Registration
- POST /api/auth/login - User Login
- GET /api/auth/profile - Get User Profile

### Products
- GET /api/products - Get All Products
- GET /api/products/:id - Get Product By ID
- POST /api/products - Create New Product (Admin)
- PUT /api/products/:id - Update Product (Admin)
- DELETE /api/products/:id - Delete Product (Admin)

### Orders
- POST /api/orders - Create New Order
- GET /api/orders - Get User Orders
- GET /api/orders/:id - Get Order Details

## Contributing
1. Fork The Repository
2. Create Your Feature Branch
3. Commit Your Changes
4. Push To The Branch
5. Create A New Pull Request

## License
This Project Is Licensed Under The MIT License - See The LICENSE File For Details.

## Contact
For Any Queries Or Support, Please Contact:
- Email: your.email@example.com
- GitHub: [Your GitHub Profile]

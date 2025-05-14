const { MongoClient } = require('mongodb');

// MongoDB connection URL
const url = 'mongodb://localhost:27017';
const dbName = 'mern-ecommerce';

// Products array with 15 products across categories and brands
const products = [
  // Men's category
  {
    title: "Black Casual T-Shirt",
    description: "Black Casual Cotton T-Shirt For Everyday Wear",
    category: "men",
    brand: "zara",
    price: 150,
    salePrice: 100,
    totalStock: 15,
    averageReview: 0,
    image: "/data/products/black-casual-t-shirt.jpg",
  },
  {
    title: "Blue Denim Jeans",
    description: "Classic Blue Denim Jeans With Straight Fit",
    category: "men",
    brand: "levis",
    price: 250,
    salePrice: 200,
    totalStock: 20,
    averageReview: 0,
    image: "/data/products/blue-denim-jeans.jpg",
  },
  {
    title: "White Polo Shirt",
    description: "Premium White Polo Shirt With Embroidered Logo",
    category: "men",
    brand: "nike",
    price: 180,
    salePrice: 150,
    totalStock: 12,
    averageReview: 0,
    image: "/data/products/white-polo-shirt.jpg",
  },
  
  // Women's category
  {
    title: "Floral Print Dress",
    description: "Beautiful Floral Print Summer Dress With Short Sleeves",
    category: "women",
    brand: "h&m",
    price: 220,
    salePrice: 180,
    totalStock: 18,
    averageReview: 0,
    image: "/data/products/floral-print-dress.jpg",
  },
  {
    title: "Black Slim Fit Pants",
    description: "Elegant Black Slim Fit Pants For Professional Wear",
    category: "women",
    brand: "zara",
    price: 280,
    salePrice: 240,
    totalStock: 15,
    averageReview: 0,
    image: "/data/products/black-slim-fit-pants.jpg",
  },
  {
    title: "Casual Hoodie",
    description: "Comfortable Casual Hoodie With Front Pocket",
    category: "women",
    brand: "puma",
    price: 190,
    salePrice: 150,
    totalStock: 25,
    averageReview: 0,
    image: "/data/products/casual-hoodie.jpg",
  },
  
  // Kids' category
  {
    title: "Cartoon Print T-Shirt",
    description: "Colorful Cartoon Print T-Shirt For Kids",
    category: "kids",
    brand: "h&m",
    price: 120,
    salePrice: 90,
    totalStock: 30,
    averageReview: 0,
    image: "/data/products/cartoon-print-t-shirt.jpg",
  },
  {
    title: "Denim Shorts",
    description: "Durable Denim Shorts For Active Kids",
    category: "kids",
    brand: "levis",
    price: 140,
    salePrice: 110,
    totalStock: 22,
    averageReview: 0,
    image: "/data/products/denim-shorts.jpg",
  },
  {
    title: "Sports Tracksuit",
    description: "Comfortable Sports Tracksuit For Children",
    category: "kids",
    brand: "adidas",
    price: 180,
    salePrice: 150,
    totalStock: 18,
    averageReview: 0,
    image: "/data/products/sports-tracksuit.jpg",
  },
  
  // Accessories category
  {
    title: "Classic Leather Belt",
    description: "Premium Quality Leather Belt With Metal Buckle",
    category: "accessories",
    brand: "levis",
    price: 90,
    salePrice: 75,
    totalStock: 40,
    averageReview: 0,
    image: "/data/products/classic-leather-belt.jpg",
  },
  {
    title: "Sports Cap",
    description: "Adjustable Sports Cap With Embroidered Logo",
    category: "accessories",
    brand: "nike",
    price: 85,
    salePrice: 70,
    totalStock: 35,
    averageReview: 0,
    image: "/data/products/sports-cap.jpg",
  },
  {
    title: "Fashion Sunglasses",
    description: "Trendy Fashion Sunglasses With UV Protection",
    category: "accessories",
    brand: "zara",
    price: 120,
    salePrice: 100,
    totalStock: 25,
    averageReview: 0,
    image: "/data/products/fashion-sunglasses.jpg",
  },
  
  // Footwear category
  {
    title: "Running Shoes",
    description: "Lightweight Running Shoes With Cushioned Sole",
    category: "footwear",
    brand: "nike",
    price: 320,
    salePrice: 280,
    totalStock: 15,
    averageReview: 0,
    image: "/data/products/running-shoes.jpg",
  },
  {
    title: "Leather Casual Shoes",
    description: "Premium Leather Casual Shoes For Everyday Use",
    category: "footwear",
    brand: "adidas",
    price: 290,
    salePrice: 250,
    totalStock: 12,
    averageReview: 0,
    image: "/data/products/leather-casual-shoes.jpg",
  },
  {
    title: "Canvas Sneakers",
    description: "Comfortable Canvas Sneakers With Rubber Sole",
    category: "footwear",
    brand: "puma",
    price: 180,
    salePrice: 150,
    totalStock: 20,
    averageReview: 0,
    image: "/data/products/canvas-sneakers.jpg",
  }
];

// Features array with 4 featured items
const features = [
  {
    id: "6824f6c4278719bc3e0fc73d",
    image: "/data/featured/feature1.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6824f6c4278719bc3e0fc73e",
    image: "/data/featured/feature2.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6824f6c4278719bc3e0fc73f",
    image: "/data/featured/feature3.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: "6824f6c4278719bc3e0fc740",
    image: "/data/featured/feature4.jpg",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function insertProducts() {
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB server');
    
    const db = client.db(dbName);
    const productsCollection = db.collection('products');
    const featuresCollection = db.collection('features');
    
    let insertedProductsCount = 0;
    let skippedProductsCount = 0;
    
    // Insert products
    for (const product of products) {
      const existingProduct = await productsCollection.findOne({ title: product.title });
      
      if (!existingProduct) {
        const productWithTimestamps = {
          ...product,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        
        await productsCollection.insertOne(productWithTimestamps);
        insertedProductsCount++;
        console.log(`Inserted product: ${product.title}`);
      } else {
        skippedProductsCount++;
        console.log(`Skipped product (already exists): ${product.title}`);
      }
    }

    // Insert features
    for (const feature of features) {
      const existingFeature = await featuresCollection.findOne({ id: feature.id });
      
      if (!existingFeature) {
        await featuresCollection.insertOne(feature);
        console.log(`Inserted feature with id: ${feature.id}`);
      } else {
        console.log(`Skipped feature (already exists): ${feature.id}`);
      }
    }
    
    console.log(`\nInserted ${insertedProductsCount} products`);
    console.log(`Skipped ${skippedProductsCount} products (already exist in database)`);
    
  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await client.close();
    console.log('MongoDB connection closed');
  }
}

// Run the function
insertProducts().catch(console.error); 
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');

mongoose.connect('mongodb://localhost/fruitvegmarket', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use(cors()); // Use the cors middleware

const productSchema = new mongoose.Schema({
    name: String,
    type: String,
    description: String,
    price: Number,
    image: String,
});

const Product = mongoose.model('Product', productSchema);

// Function to seed initial data into the database
const seedDatabase = async () => {
    try {
        await Product.deleteMany(); // Clear existing data

        const products = [
            {
                name: 'Chickpea',
                type: 'Fruit',
                description: 'Fresh and crispy',
                price: 180,
                image: 'https://t3.ftcdn.net/jpg/02/83/97/16/360_F_283971637_l01oKnCdtSDjeSrr0HzsK35wQtx91CNc.jpg',
            },
            {
                name: 'Horse gram',
                type: 'Fruit',
                description: 'Rich in potassium',
                price: 90,
                image: 'https://t3.ftcdn.net/jpg/05/59/00/94/360_F_559009411_2CAcrHqjuVA6W07AOgxyEmpWelBBSeWR.jpg',
            },
            {
                name: 'Mansoor dal',
                type: 'Fruit',
                description: 'Packed with vitamin C',
                price: 150,
                image: 'https://t4.ftcdn.net/jpg/00/53/57/79/360_F_53577988_cQcwO2YgG981GIbPunnKYekK9WxjLWtn.jpg',
            },
            {
                name: 'Greengram',
                type: 'Vegetable',
                description: 'Healthy and crunchy',
                price: 80,
                image: 'https://t4.ftcdn.net/jpg/03/23/92/35/360_F_323923529_TkDiqEOJWQRTdJrGMMnxRb1Zq1IbPc4j.jpg',
            },
        ];

        await Product.insertMany(products);
        console.log('Database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    }
};

// Seed the database on server startup
seedDatabase();

// Define API endpoint for fetching all products
app.get('/api/products', async (req, res) => {
    try {
        // Fetch all products from the database
        const allProducts = await Product.find();

        // Send the entire products array as JSON response
        res.json(allProducts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
const user = "lblin";
const password = "info734";
const adress = "193.48.125.44";

const url = `mongodb://${user}:${password}@${adress}:27017/?authMechanism=DEFAULT&authSource=admin`;
const dbName = "puissance4";

app.use(bodyParser.json());

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
try {
    client.connect();

    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Define User collection
    const userCollection = db.collection('users');

    // Register endpoint
    app.post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the collection
            await userCollection.insertOne({
                username,
                password: hashedPassword,
            });

            res.json({ message: 'User registered successfully' });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;

            // Find user in the collection
            const user = await userCollection.findOne({ username });

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            // Create a JWT token for authentication
            const token = jwt.sign({ username: user.username }, 'your-secret-key');

            res.json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });}catch (e){
    console.error(e);
}

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });


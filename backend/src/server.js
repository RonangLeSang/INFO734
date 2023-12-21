const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { MongoClient } = require('mongodb');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const app = express();
const port = 3000;
const user = "lblin";
const password = "info734";
const adress = "193.48.125.44";

const url = `mongodb://${user}:${password}@${adress}:27017/?authMechanism=DEFAULT&authSource=admin`;
const dbName = "puissance4";

app.use(session({
    secret: 'pommedapi', // Change this to a strong, random key
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ url: url+"/"+dbName }) // If using MongoDB for session storage
    }));
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
    const gamesCollection = db.collection('games');

    // Register endpoint
    app.post('/register', async (req, res) => {
        try {
            const { username, password } = req.body;
            if (await userCollection.findOne({ username })){
                res.status(400).json({ message: 'User already exist' });
                return;
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the collection
            await userCollection.insertOne({
                username ,
                password: hashedPassword,
                gameCount: 0,
                victoryCount:0,
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
    });
    app.post('/createGame',async (req,res) =>{
        try{
            const { idPlayer } = req.body;
            // Create a new document with the specified fields
            const newGame = {
            id1: idPlayer,
            id2: 'none',
            gray : [[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0],[0,0,0,0,0,0,0]],
            nextplayer: 'id1',
            };

            // Insert the new document into the "game" collection
            const result = await gamesCollection.insertOne(newGame);
        res.json({ message: 'game successfully creat' });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

    });
    app.post('/logout', (req, res) => {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.send('Logout failed');
            }

            res.send('Logout successful');
        });
    });
}catch (e){
    console.error(e);
}

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });


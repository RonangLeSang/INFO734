const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {MongoClient} = require('mongodb');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const port = 3000;
const user = "lblin";
const password = "info734";
const adress = "193.48.125.44";

const url = `mongodb://${user}:${password}@${adress}:27017/?authMechanism=DEFAULT&authSource=admin`;
const dbName = "puissance4";


// creating 12 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 12;

//session middleware
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: {maxAge: oneDay},
    resave: false
}));
// parsing the incoming data

app.use(express.urlencoded({extended: true}));

//serving public file
app.use(express.static(__dirname));
app.use(bodyParser.json());

// cookie parser middleware
app.use(cookieParser());

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
            const {username, password} = req.body;
            if (await userCollection.findOne({username})) {
                res.status(400).json({message: 'User already exist'});
                return;
            }

            // Hash the password before saving it to the database
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user into the collection
            await userCollection.insertOne({
                username,
                password: hashedPassword,
                gameCount: 0,
                victoryCount: 0,
            });

            res.json({message: 'User registered successfully'});
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    });

    // Login endpoint
    app.post('/login', async (req, res) => {
        try {
            const {username, password} = req.body;

            // Find user in the collection
            const user = await userCollection.findOne({username});

            if (!user) {
                return res.status(401).json({message: 'Invalid username or password'});
            }

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
                return res.status(401).json({message: 'Invalid username or password'});
            }
            session = req.session;
            session.userid = req.body.username;
            res.json({session});
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({error: 'Internal Server Error'});
        }
    });
    app.get('/logout', async (req, res) => {
        req.session.destroy();
        res.redirect('/');
    });

    app.post('/createGame', async (req, res) => {
        if (req.session.userid != null) {
            try {
                const user = req.session.userid;
                // Create a new document with the specified fields
                const newGame = {
                    id1: user,
                    id2: 'none',
                    gray: [[0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]],
                    nextPlayer: 'id1',
                    winner: 'none',
                };

            // Insert the new document into the "game" collection
            const result = await gamesCollection.insertOne(newGame);
                session = req.session;
                session.idGame = result.insertedId;
                res.json({session});
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }} else {
            res.status(400).json({error: 'you are not logged'});
        }

    });
    app.post('/logout', async (req, res) => {
        // Destroy the session
        req.session.destroy(err => {
            if (err) {
                console.error('Error destroying session:', err);
                return res.send('Logout failed');
            }

            res.send('Logout successful');
        });
    });
    app.post('/makeAMove',async (req, res) => {
        try {
            const { move } = req.body;

            const user = req.session.userid;
            console.log(user)
            const idGame = req.session.idGame;
            console.log(idGame)

            // Find user in the collection

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }


        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    app.post('/listGameInWait',async(req,res)=>{
        try{
            const result = await gamesCollection.find({id2:'none'}).toArray();
            return res.json(result);
        }catch (error){
            res.status(500).json({error: 'Internal Server Error'});
        }
    })
} catch (e) {
    console.error(e);
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


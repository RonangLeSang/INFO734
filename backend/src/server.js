const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {MongoClient, ObjectId} = require('mongodb');
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

// grid
let tab= [[0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0],
                [0,0,-1,0,1,0,0],
                [0,1,1,1,-1,0,0]];

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


function getDownLeft(pos){
    let i = 0;
    while(tab[pos[0]+i][pos[1]-i] === tab[pos[0]][pos[1]]){
        i++;
    }
    return i;
}


function getUpRight(pos){
    let i = 0;
    while(tab[pos[0]-i][pos[1]+i] === tab[pos[0]][pos[1]]){
        i++;
    }
    return i;
}


function diagRL(pos){
    return (getUpRight(pos) + getDownLeft(pos) + 1) > 3;
}


function getDownRight(pos){
    let i = 0;
    while(tab[pos[0]+i][pos[1]+i] === tab[pos[0]][pos[1]]){
        i++;
    }
    return i;
}


function getUpLeft(pos){
    let i = 0;
    while(tab[pos[0]-i][pos[1]-i] === tab[pos[0]][pos[1]]){
        i++;
    }
    return i;
}


function diagLR(pos){
    return (getUpLeft(pos) + getDownRight(pos) + 1) > 3;
}


function getUp(pos){
    let i = pos[0];
    while(tab[i+1][pos[1]] === tab[pos[0]][pos[1]]){
        i++;
    }
    return i - pos[0];
}


function getDown(pos){
    let i = pos[0];
    while(tab[i-1][pos[1]] === tab[pos[0]][pos[1]]){
        i--;
    }
    return pos[0] - i;
}


function col(pos){
    return (getUp(pos) + getDown(pos) + 1) > 3;
}


function getRight(pos){
    let i = pos[1];
    while(tab[pos[0]][i+1] === tab[pos[0]][pos[1]]){
        i++;
    }
    return i - pos[1];
}


function getLeft(pos){
    let i = pos[1];
    while(tab[pos[0]][i-1] === tab[pos[0]][pos[1]]){
        i--;
    }
    return pos[1] - i;
}


function line(pos){
    return (getLeft(pos) + getRight(pos) + 1) > 3;
}


function isWon(pos){
    return line(pos) || col(pos) || diagLR(pos) || diagRL(pos);
}


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
            const user = await userCollection.findOne({"username":username});

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

            let playerColor =1;

            for (let i = tab.length-1; i >= 0; i--){
                if(tab[i][move]===0){
                    tab[i][move] = playerColor;
                    isWon([i, move])
                    break;
                }
            }
            res.json(tab)
        } catch (error) {
            console.error('Error during move:', error);
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
    });
    app.post('/joinGame',async(req,res)=>{
        try{
            const { idGame } = req.body;
            const user = req.session.userid;
            const id = new ObjectId(idGame)
            const game = await gamesCollection.findOne({_id: id});
            console.log(user);
            if(user !== undefined && user !== game.id1) {
                await gamesCollection.updateOne(
                    {_id: id},  // Filtrez le document que vous souhaitez mettre à jour
                    {$set: {"id2": user}}
                );
                return res.json(idGame);
            }else {
                res.status(500).json({error: "you can't join game"});
            }

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


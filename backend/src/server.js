const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const {MongoClient, ObjectId} = require('mongodb');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const app = express();
const cors = require('cors');
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

function getDownLeft(pos, tab) {
    let i = 0;
    while (pos[0] + i < 6 && pos[1] - i > -1 && tab[pos[0] + i][pos[1] - i] === tab[pos[0]][pos[1]]) {
        i++;
    }
    return i;
}

function getUpRight(pos, tab) {
    let i = 0;
    while (pos[0] - i > -1 && pos[1] + i < 7 && tab[pos[0] - i][pos[1] + i] === tab[pos[0]][pos[1]]) {
        i++;
    }
    return i;
}

function diagRL(pos, tab) {
    return (getUpRight(pos, tab) + getDownLeft(pos, tab) + 1) > 3;
}

function getDownRight(pos, tab) {
    let i = 0;
    while (pos[0] + i < 6 && pos[1] + i < 7 && tab[pos[0] + i][pos[1] + i] === tab[pos[0]][pos[1]]) {
        i++;
    }
    return i;
}

function getUpLeft(pos, tab) {
    let i = 0;
    while (pos[0] - i > -1 && pos[1] - i > -1 && tab[pos[0] - i][pos[1] - i] === tab[pos[0]][pos[1]]) {
        i++;
    }
    return i;
}

function diagLR(pos, tab) {
    return (getUpLeft(pos, tab) + getDownRight(pos, tab) + 1) > 3;
}

function getUp(pos, tab) {
    let i = pos[0];
    while (i + 1 < 6 && tab[i + 1][pos[1]] === tab[pos[0]][pos[1]]) {
        i++;
    }
    return i - pos[0];
}

function getDown(pos, tab) {
    let i = pos[0];
    while (i - 1 > -1 && tab[i - 1][pos[1]] === tab[pos[0]][pos[1]]) {
        i--;
    }
    return pos[0] - i;
}

function col(pos, tab) {
    return (getUp(pos, tab) + getDown(pos, tab) + 1) > 3;
}

function getRight(pos, tab) {
    let i = pos[1];
    while (i + 1 < 7 && tab[pos[0]][i + 1] === tab[pos[0]][pos[1]]) {
        i++;
    }
    return i - pos[1];
}

function getLeft(pos, tab) {
    let i = pos[1];
    while (i - 1 > -1 && tab[pos[0]][i - 1] === tab[pos[0]][pos[1]]) {
        i--;
    }
    return pos[1] - i;
}

function line(pos, tab) {
    console.log("ok");
    return (getLeft(pos, tab) + getRight(pos, tab) + 1) > 3;
}

function isWon(pos, tab) {
    if (line(pos, tab) || col(pos, tab) || diagLR(pos, tab) || diagRL(pos, tab)) {
        console.log("gagné");
    }
    return line(pos, tab) || col(pos, tab) || diagLR(pos, tab) || diagRL(pos, tab);
}


// Use connect method to connect to the server
try {
    client.connect();

    console.log('Connected to MongoDB');

    const db = client.db(dbName);

    // Define User collection
    const userCollection = db.collection('users');
    const gamesCollection = db.collection('games');

    let tabCollections = new Map();

    app.use(cors({
        origin: 'http://localhost:4200', // replace with your Angular app's domain
        credentials: true,
    }));

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
                    countTurn : 0,
                    nextPlayer: user,
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

            const user = req.query.userid;
            const idGame = req.query.idGame;
            const id = new ObjectId(idGame)

            // Find user in the collection

            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }

            let game = await gamesCollection.findOne({_id: id});
            let tab = game["gray"];

            let playerColor = 0;
            let nextPlayer = game["nextPlayer"];
            console.log(nextPlayer);
            console.log(game["id1"]);
            console.log(user);

            if(user === game["id1"] && user === game["nextPlayer"]) {
                playerColor = 1;
                nextPlayer = game["id2"];
            }else {if(user === game["id2"] && user === game["nextPlayer"]){
                playerColor = -1;
                nextPlayer = game["id1"];
            }}

            if(playerColor) {
                console.log("-----------------------------------");
                for (let i = tab.length - 1; i >= 0; i--) {
                    if (tab[i][move] === 0) {
                        tab[i][move] = playerColor;
                        if (isWon([i, move], tab)) {
                            tab[0][0] = playerColor * 2;
                        }
                        break;
                    }
                }
            }
            await gamesCollection.updateOne(
                {_id: id},  // Filtrez le document que vous souhaitez mettre à jour
                {$set: {"gray": tab, "nextPlayer": nextPlayer}}
            );
            tabCollections.get(idGame).set("grid", tab);
            // console.log(tab);
            res.json({grid: tab});
        } catch (error) {
            console.error('Error during move:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    });
    app.post('/listGameInWait',async(req,res)=>{
        try{
            //id1: { $ne: user }

            const user = req.query.userid;
            console.log(user);
            const result = await gamesCollection.find({id2:'none',}).toArray();
            console.log(result);
            return res.json(result);
        }catch (error){
            res.status(500).json({error: 'Internal Server Error'});
        }
    });
    app.post('/joinGame',async(req,res)=>{
        let session;
        try {
            const {idGame,user} = req.body;
            const id = new ObjectId(idGame)
            const game = await gamesCollection.findOne({_id: idGame});
            console.log(idGame);
            if (user !== undefined && user !== game.id1) {
                await gamesCollection.updateOne(
                    {_id: id},  // Filtrez le document que vous souhaitez mettre à jour
                    {$set: {"id2": user}}
                );
                session = req.session;
                session.idGame = idGame;
                return res.json(idGame);
            } else {
                res.status(500).json({error: "you can't join game"});
            }

        } catch (error) {
            res.status(500).json({error: 'Internal Server Error'});
        }
    });
    app.get('/isMyTurn', async (req, res) => {
        const idGame = req.query.idGame;
        const user = req.query.userid;
        const id = new ObjectId(idGame);

        try {
            const game = await gamesCollection.findOne({ _id: id });

            // Update the cache or perform other actions based on the latest game state
            if (!tabCollections.has(idGame)) {
                console.log("idGame not found. Creating entry...");
                const gameTab = new Map();
                gameTab.set("grid", game.gray);
                gameTab.set("players", [game.id1, game.id2]);
                tabCollections.set(idGame, gameTab);
                console.log(tabCollections);
            }

            if (user === tabCollections.get(idGame).get("players")[0]) {
                return res.json({ isMyTurn: true, grid: tabCollections.get(idGame).get("grid") });
            } else {
                if (user === tabCollections.get(idGame).get("players")[1]) {
                    return res.json({ isMyTurn: false, message: 'Not your turn' });
                } else {
                    return res.status(401).json({ isMyTurn: false, message: 'Not in the game' });
                }
            }
        } catch (error) {
            console.error('Error checking turn:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    });

} catch (e) {
    console.error(e);
}


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


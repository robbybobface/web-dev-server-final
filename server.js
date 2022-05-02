import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import MongoDBStore from 'connect-mongo';
import bodyParser from "body-parser";

import User from './models/user-model.js';

import userController from "./controllers/users/user-controller.js";
import tuitsController from "./controllers/tuits/tuits-controller.js";
import SessionController from "./controllers/session/session-controller.js";
import TrackController from "./controllers/tracks/track-controller.js";
import AlbumController from "./controllers/albums/album-controller.js";
import ArtistController from "./controllers/artists/artist-controller.js";

const dbUrl = 'mongodb://localhost:27017/web-dev-final';
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const app = express();
app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));

app.use(express.json());

const secret = 'thisisthesecretcode';

const store = new MongoDBStore({
        mongoUrl: dbUrl,
        touchAfter: 24 * 60 * 60,
        crypto: {
            secret: secret
        },
        autoRemove: 'native'
    }
);

store.on('error', function (e) {
    console.log('Session store error', e);
});

const sessionConfig = {
    store: store,
    name: 'session',
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        // httpOnly: true,
        // secure: true,
        secure: false,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7,
        // sameSite: 'none'
    }
};

app.enable('trust proxy');
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

tuitsController(app);
userController(app);
SessionController(app);
TrackController(app);
AlbumController(app);
ArtistController(app);

app.get('/', (req, res) => {
    res.send('Web-Dev Final Project');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Serving on port ${port}`);
});

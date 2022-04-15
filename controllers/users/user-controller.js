import * as userDao from "../../daos/user-dao.js";
import User from "../../models/user-model.js";
import passport from "passport";

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({ loggedIn: false });
    } else {
        res.send({ loggedIn: true });
        next();
    }
};

const isAdmin = (req, res) => res.json(req.user.admin);

const isAccountOwner = async (req, res, next) => {
    // console.log(req.body);
    const { username } = req.body;
    console.log('the username passed in was ' + username);
    const userProfile = await userDao.findUserByUsername(username);
    if (!req.user) {
        res.send({ accountOwner: false });
    } else {
        if (!req.user._id.equals(userProfile._id)) {
            res.send({ accountOwner: false });
        } else {
            res.send({ accountOwner: true });
            next();
        }
    }
};

const register = async (req, res) => {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password: '' });
    try {
        const registeredUser = await User.register(user, password);
        console.log(registeredUser);
        passport.authenticate("local")(req, res, function () {
            res.send("Welcome to the app!");
        });
    } catch (err) {
        if (/\s/g.test(email)) {
            res.json({ error: "Emails cannot contain spaces" });
        }
        if (/\s/g.test(username)) {
            res.json({ error: "Usernames cannot contain spaces" });
        }
        if (/\s/g.test(password)) {
            res.json({ error: "Password cannot contain spaces" });
        }
        if (err.message.includes("duplicate key")) {
            res.json({ error: "This email address is already in use" });
        } else {
            res.json({ error: err.message });
        }
    }
};

const profile = (req, res) => res.json(req.user);

const logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.send({ success: "Goodbye!" });

};

const login = async (req, res) => {
    res.send({ success: 'Welcome Back!' });
};

const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    console.log(username);
    const user = await userDao.findUserByUsername(username);
    console.log('the user is' + user);
    if (!user) {
        res.send({ error: "There is no user with this username" });
    }
    res.json(user);
};

const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers();
    res.json(users);
};

const createUser = async (req, res) => {
    const newUser = req.body;
    const insertedUser = await userDao.createUser(newUser);
    res.json(insertedUser);
};

const deleteUser = async (req, res) => {
    const userIdToDelete = req.params.uid;
    const status = await userDao.deleteUser(userIdToDelete);
    res.send(status);
};

const updateUser = async (req, res) => {
    const userIdToUpdate = req.params.uid;
    const updatedUser = req.body;
    const status = await userDao.updateUser(userIdToUpdate, updatedUser);
    res.send(status);
};

export default (app) => {
    app.get('/api/auth/user', isLoggedIn);
    app.post('/api/auth/register', register);
    app.post('/api/auth/login', passport.authenticate('local', { failureMessage: true }), login);
    app.post('/api/auth/logout', logout);
    app.post('/api/auth/profile', isAccountOwner);
    app.post('/api/profile', profile);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:username', findUserByUsername);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
};

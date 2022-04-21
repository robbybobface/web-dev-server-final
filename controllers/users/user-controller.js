import * as userDao from "../../daos/user-dao.js";
import User from "../../models/user-model.js";
import ExpressError from "../../Utils/ExpressError.js";
import passport from "passport";
import Fuse from "fuse.js";
import UserModel from "../../models/user-model.js";

const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send({ loggedIn: false });
    } else {
        res.send({ loggedIn: true });
        next();
    }
};

const changePassword = (req, res, next) => {
    if (!req.isAuthenticated()) {
        res.send();
    } else {
        req.user.setPassword(req.body.password, function (err, user) {
            if (err) {
                res.send({ error: err });
            } else {
                res.send({ success: "Password Updated" });
            }
        });
    }
};

const isAdmin = (req, res) => res.json(req.user.admin);

const isAccountOwner = async (req, res, next) => {
    // console.log(req.body);
    const { username } = req.body;
    // console.log('the username passed in was ' + username);
    const userProfile = await userDao.findUserByUsername(username);
    if (!userProfile) {
        res.send({ accountOwner: false });
    } else if (!req.user) {
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
    try {
        const { email, username, password } = req.body;
        const userProfile = await userDao.findUserByUsername(username);
        const userEmail = await userDao.findUserByEmail(email);
        if (/\s/g.test(email)) {
            throw new ExpressError("Emails cannot contain spaces", 400);
        } else if (/\s/g.test(username)) {
            throw new ExpressError("Usernames cannot contain spaces", 400);
        } else if (userProfile !== null) {
            throw new ExpressError("Username is already taken", 400);
        } else if (userEmail !== null) {
            throw new ExpressError("Email is already taken", 400);
        }
        // else if (/\s/g.test(password)) {
        //     res.json({ error: "Password cannot contain spaces" });
        // }
        const user = new User({ email, username, password: '' });

        const registeredUser = await User.register(user, password);
        // console.log(registeredUser);
        passport.authenticate("local")(req, res, function () {
            res.send("Welcome to the app!");
        });
    } catch (err) {
        if (err.message.includes("duplicate key")) {
            res.json({ error: "This email address is already in use" });
        } else if (err.message.includes('failed: email: invalid email')) {
            res.json({ error: "Please input a valid email address" });
        } else {
            res.json({ error: err.message });
        }
    }
};

const profile = (req, res) => {
    res.json(req.user);
};

const logout = (req, res) => {
    req.logout();
    req.session.destroy();
    res.send({ success: "Goodbye!" });

};

const login = async (req, res) => {
    // console.log(req.user)
    res.send({ success: 'Welcome Back!' });

};

const findUserByUsername = async (req, res) => {
    const username = req.params.username;
    // console.log(username);
    const user = await userDao.findUserByUsername(username);
    // console.log('the user is' + user);
    if (!user) {
        res.send({ error: "There is no user with this username" });
    } else {
        res.json(user);
    }
};

const findUserByEmail = async (req, res) => {
    const email = req.params.email;
    // console.log(email);
    const user = await userDao.findUserByEmail(email);
    // console.log('the user is' + user);
    if (!user) {
        res.send({ error: "There is no user with this email" });
    } else {
        res.json(user);
    }
};

const ITEMS_PER_PAGE = 10;

const findAllUsers = async (req, res) => {
    const page = req.query.page || 1;

    const query = {};

    try {
        const skip = (page - 1) * ITEMS_PER_PAGE;
        const count = await UserModel.estimatedDocumentCount(query);
        // console.log(count);
        const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
        // console.log(pageCount);
        const allUsers = await userDao.findAllUsers().limit(ITEMS_PER_PAGE).skip(skip);
        if (req.query.page && req.query.search) {
            // const allUsers = await UserModel.find(query);
            // const allUsers = await userDao.findAllUsers();
            const options = {
                includeScore: false,
                isCaseSensitive: false,
                shouldSort: true,
                threshold: 0.5,
                location: 0,
                distance: 100,
                minMatchCharLength: 1,
                keys: [ "username", "email" ]
            };
            const fuse = new Fuse(allUsers, options);
            const result = fuse.search(req.query.search);
            const count = fuse.search(req.query.search).length;
            const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
            // console.log('The new page count is ' + pageCount);
            if (result.length < 1) {
                throw new ExpressError("No User Found", 400);
            } else {
                const userResults = result.map(user => user.item);
                res.json({
                    pagination: {
                        count,
                        pageCount,
                    },
                    userResults
                });
            }
        } else if (req.query.search) {
            const options = {
                includeScore: false,
                isCaseSensitive: false,
                shouldSort: true,
                threshold: 0.5,
                location: 0,
                distance: 100,
                minMatchCharLength: 1,
                keys: [ "username", "email" ]
            };
            const fuse = new Fuse(allUsers, options);
            const result = fuse.search(req.query.search);
            const count = fuse.search(req.query.search).length;
            const pageCount = Math.ceil(count / ITEMS_PER_PAGE);
            // console.log('The new page count is ' + pageCount);
            // console.log(result);
            if (result.length < 1) {
                throw new ExpressError("No User Found", 400);
            } else {
                const userResults = result.map(user => user.item);
                res.json({
                    pagination: {
                        count,
                        pageCount,
                    },
                    userResults
                });
            }
        } else {
            const userResults = allUsers;
            res.json({
                pagination: {
                    count,
                    pageCount,
                },
                userResults
            });
        }
    } catch (err) {
        res.send({ error: "Something went wrong" });
    }

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
    app.post('/api/auth/change-password', changePassword);
    app.post('/api/profile', profile);
    app.get('/api/users', findAllUsers);
    app.get('/api/users/:username', findUserByUsername);
    app.get('/api/users/:email', findUserByEmail);
    app.post('/api/users', createUser);
    app.delete('/api/users/:uid', deleteUser);
    app.put('/api/users/:uid', updateUser);
};

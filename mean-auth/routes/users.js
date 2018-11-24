const router = require('express').Router();
const { User, addUser, findByUsername } = require('../models/User');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { secret } = require('../config');
const promisify = require('util').promisify;

const hash = promisify(bcrypt.hash);
const genSalt = promisify(bcrypt.genSalt);
const compare = promisify(bcrypt.compare);
const comparePassword = async (pwd, pwdDigest) => (await compare(pwd, pwdDigest));

// Register
router.post('/register', async (req, res) => {
    try{
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: await hash(req.body.password, await genSalt(10))
        });
        const user = await addUser(newUser);
        res.json({status: 200, payload: user})
    } catch (e) {
        console.error(e);
        res.status(500).json({status: 500, payload: e})
    }
});

// Authenticate
router.post('/authenticate', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    try {
        const user = await findByUsername(username);
        if (!user) {
            res.status(404).json({status: 404, payload: "User not found"})
        }
        const isMatch = await comparePassword(password, user.password);
        if (isMatch) {
            /*
            mongoosejs object contains many methods and is not "serializable". You could handle this by passing a plain object, by either using .lean() from mongoose or plain toJSON method. Otherwise jwt is gonna complain.
             */
            const token = jwt.sign(user.toJSON(), secret, {expiresIn: 60*60});
            res.json({status: 200, payload: {
                    token: "JWT "+token, // the token must be prepended with "JWT " with a SPACE in order for the jwt scheme to later on recognize it in the "Authorization" field in the upcoming request header
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                }})
        } else {
            res.status(400).json({status: 400, payload: "Wrong password"})
        }
    } catch (e) {
        console.error(e);
        res.status(500).json({status: 500, payload: e})
    }
});

// Profile
// Note on Passport.js with jwt scheme: the token should be placed inside the request header with a key called 'Authorization', not 'token' or whatever
router.get('/profile', passport.authenticate('jwt', {session: false}, undefined), (req, res) => {
    res.json({user: req["user"]})
});

module.exports = router;
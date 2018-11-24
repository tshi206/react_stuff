const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const { findById } = require('./models/User');
const { secret } = require("./config");

module.exports = passport => {
    const opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: secret,
    };
    // this 'jwt_payload' comes from the request but it is originated from when jwt.sign is called (inside the router) to issue the token in the first place. In another word, this payload will be equal to whatever object get signed by the jwt.sign function.
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
            const user = await findById(jwt_payload._id);
            if (user) {
                return done(null, user)
            } else {
                return done(null, false)
            }
        } catch (e) {
            return done(e, false)
        }
    }))
};
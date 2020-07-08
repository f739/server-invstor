const passport = require("passport")
    , LocalStrategy = require("passport-local").Strategy;
const contact = require("./contact");



passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    function (email, password, done) {
        contact.findOne({ email }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { massage: "invalid email/passsword" })
            }
            user.checkPassword(password).then(function (valid) {
                if (!valid) {
                    return done(null, false, { massage: "invalid email/passsword" })
                }
                return done(null, user);
            }).catch(function (err) {
                return done(err);
            });
        });
    }
));


const jwtStratgy = require("passport-jwt").Strategy
    , ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "ninja"
};

passport.use(new jwtStratgy(opts, function (jwt_payload, done) {
    contact.findById(jwt_payload.id, function (err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        }
        else {
            return done(null, false);
        }
    });
}));





passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    contact.findById(id, function (err, user) {
        done(err, user);
    });
});
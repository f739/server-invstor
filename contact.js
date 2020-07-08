const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const uniqueValidator = require("mongoose-unique-validator");
const userSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true},
    password: { type: String },
    switch: { type: String }
});

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function (next) {
 const user = this;
    if (!user.isModified("password")) {
        return next();
    }

    bcrypt.hash(user.password, 10, (err, hash) => {
        if (err) return next(err);
        user.password = hash;
        
        next();
    });

});

userSchema.methods.checkPassword = function (guess) {
   const user = this;
    return new Promise( function (resolve, reject) {
        bcrypt.compare(guess, user.password, (err, res) => {
            if (err) reject (err);
            resolve(res); //true or false
        });
    });
};
module.exports = mongoose.model('user', userSchema);
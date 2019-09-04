/** admin Mongo DB model	*/

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const adminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
}, {timestamps: true});

adminSchema.pre('save', function (next) {
    const user = this;
    console.log("Im Model=====================>", user.password);
    // if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            console.log('hash: ', hash);
            user.password = hash;
            next();
        });
    });
});


module.exports = mongoose.model("admin", adminSchema);

const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['coltivatore', 'laboratorio', 'superuser'],
        required: true,
        default: 'coltivatore'
    },

})

userSchema.plugin(passportLocalMongoose, {usernameField: 'username'});
userSchema.plugin(uniqueValidator);

const userModel = mongoose.model('User', userSchema)

module.exports = userModel
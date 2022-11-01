const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require ('validator');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    userName: {
        type: String,
        unique: true,
        require: [true, 'Please add a username'],
        maxLength: [15, 'Username can not be more than 15 characters']
    },
    firstName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    lastName: {
        type: String,
        required: [true, 'Please add a first name']
    },
    gender: {
        type: String,
        required: [true, 'Please add a gender'],
        enum: [
            'Male',
            'Female'
        ]
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        validate : (email) => {
            return validator.isEmail(email);
        }
    },
    password: {
        type: String,
        required: [true, 'Please add a password'],
        validate: (password) => {
            return validator.isStrongPassword(password);
        }
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpire:{
        type: Date
    },
    admin: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})

UserSchema.pre('save', async function(next) {
    if(!this.isModified('password')) next();

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt)
})

//generates our jwt token when user logs in or creates a new account
UserSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
}


UserSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.methods.getResetPasswordToken = function() {
    //creating a hex token with size of 20
    const resetToken = crypto.randomBytes(20).toString('hex');

    //create hash to increase security for the reset token and tell it that it came from hex format
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    this.resetPasswordExpire = Date.now() +10 * 60 *1000 //set expiration for resetting the password for 1 hour

    return resetToken;
}
module.exports = mongoose.model('User', UserSchema);
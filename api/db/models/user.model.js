const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// JWT Secret
const jwtSecret = '7ujKa6ZZu0rtHtSrjbFu90pfw';

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    sessions: [{
        token: {
            type: String,
            required: true,
        },
        expiresAt: {
            type: Number,
            required: true,
        }
    }]
});

// *** Instance methods ***

UserSchema.methods.toJSON = function() {
    const user = this.toObject();
    // Return the document except the password and sessions
    return { ...user, password: undefined, sessions: undefined };
}

UserSchema.methods.generateAccessAuthToken = async function() {
    return new Promise((resolve, reject) => {
        jwt.sign({ _id: this._id.toHexString() }, jwtSecret, { expiresIn: "15m" }, (error, token) => {
          error ? reject() : resolve(token);
        });
    });
}

UserSchema.methods.generateRefreshAuthToken = async function() {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (error, buf) => {
          error ? reject() : resolve(buf.toString('hex'));
        });
    });
}

UserSchema.methods.createSession = async function() {
    const refreshToken = await this.generateRefreshAuthToken();
    return await saveSessionToDatabase(this, refreshToken);
}

// *** Model methods ***

UserSchema.statics.getJWTSecret = () => jwtSecret;

UserSchema.statics.findByIdAndToken = function(_id, token) {
    return this.findOne({ _id, 'sessions.token': token });
}

UserSchema.statics.findByCredentials = async function(email, password) {
    const user = await this.findOne({ email });
    if (!user) return Promise.reject();

    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? user : Promise.reject();
}

UserSchema.statics.hasRefreshTokenExpired = (expiresAt) => {
    return Date.now() / 1000 > expiresAt;
}

// *** Middleware ***

UserSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

// *** Helper methods ***

const saveSessionToDatabase = async (user, refreshToken) => {
    const expiresAt = generateRefreshTokenExpiryTime();
    user.sessions.push({ token: refreshToken, expiresAt });

    try {
        await user.save();
        return refreshToken;
    } catch (e) {
        return Promise.reject(e);
    }
}

const generateRefreshTokenExpiryTime = () => {
    const daysUntilExpire = 10;
    const secondsUntilExpire = daysUntilExpire * 24 * 60 * 60;
    return (Date.now() / 1000) + secondsUntilExpire;
}

const User = mongoose.model('User', UserSchema);

module.exports = { User };
const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trime: true,
        validate(value) {
            if (value) {
                throw new Error('Email is invalid!');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
        validate(value) {
            if (validator.isEmpty(value)) {
                throw new Error('Please enter your password!');
            } else if (validator.equals(value.toLowerCase(), "password")) {
                throw new Error('Password is invalid!');
            } else if (validator.contains(value.toLowerCase(), "password")) {
                throw new Error('Password should not contain "password"!');
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserSchema);

UserSchema.methods.newAuthToken = async function () {
    const user = this;
    const token = jwt.sign({
        _id: user.id.toString()
    }, process.env.JWT_SECRET, {
        expiresIn: "7 days"
    });
    user.tokens = user.tokens.concat({
        token
    });
    await user.save();
    return token;
}

UserSchema.pre('save', async function(next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

module.exports = User;
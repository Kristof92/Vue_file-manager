const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid.')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password can not include the word "password".')
            }
        }
    },
    files: [
        {
            file: Buffer,
            data: {
                name: String,
                contentType: String,
                uploadedAt: Date,
                size: Number
            }
        }
    ],
}, {
    timestamps: true
})

// '.toJSON' is a built in method Mongoose uses in the background so by modifying it, the user object will be modified every time a /users/... endpoint is called
userSchema.methods.toJSON = function() {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    return userObject
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({email})
    if (!user) throw new Error('Unable to login.')
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)  throw new Error('Unable to login.')
    return user
}

// Hash password before saving
userSchema.pre('save', async function (next) {
    const userToBeSaved = this
    if (userToBeSaved.isModified('password')) userToBeSaved.password = await bcrypt.hash(userToBeSaved.password, 8)
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User

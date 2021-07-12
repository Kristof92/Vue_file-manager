const User = require('../models/user')

const checkEmail = async (req, res, next) => {

    const search = await User.find({ email: req.body.email })
    if (search.length >= 1) {
        res.status(400).send({ payload: 'email is already signed up' })
    } else {
        next()
    }
}

module.exports = checkEmail

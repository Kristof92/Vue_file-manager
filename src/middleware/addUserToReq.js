const User = require('../models/user')

const selectedUser = async (req, res, next) => {

    const search = await User.findById(req.body.userId)
    if (search) {
        req.user = search
        next()
    } else {
        res.status(400).send({ payload: `there is no user with this id: ${req.body.userId}` })
    }
}

module.exports = selectedUser

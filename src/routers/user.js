const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const multer = require('multer')
const checkEmail = require('../middleware/preventDuplicatedUsers')
const selectedUser = require('../middleware/addUserToReq')
const path = require('path')
const utf8 = require('utf8')

const upload = multer({
    limits: {
        fileSize: 3000000
    },
    fileFilter(req, file, callback) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return callback(new Error('Please upload a .jpg or .jpeg or .png file.'))
        }
        callback(undefined, true)
    }
})

// give back an env. var.
router.get('/domain', (req, res) => {
    let domain

    process.env.APP_ENVIRONMENT === 'LOCAL' ? domain = process.env.DOMAIN_LOCAL : domain = process.env.DOMAIN_PROD

    try {
        res.status(200).send({statusCode: 200, payload: domain})
    } catch (e) {
        res.status(400).send({ statusCode: 400, payload: `error: ${e}`})
    }
})

// signup
router.post('/users', checkEmail, async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({ statusCode: 201, payload: user})
    } catch (e) {
        res.status(400).send({ statusCode: 400, payload: `error: ${e}`})
    }
})

// login
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        res.status(200).send({ statusCode: 200, payload: user})
    } catch (e) {
        res.status(401).send({ statusCode: 401, payload: 'Invalid credentials' })
    }
})

// get my (updated) profile
router.post('/users/me', selectedUser, async (req, res) => {
    try {
        res.status(200).send({statusCode: 200, payload: req.user})
    } catch (e) {
        res.status(401).send({ statusCode: 401, payload: `Couldn't update profile with this _id: ${req.body.id}` })
    }

})

// Uploading picture
router.post('/file/upload', upload.single('picture'), async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        user.files.push({
                file: req.file.buffer,
                data:
                    {
                        name: path.parse(req.file.originalname).name,
                        contentType: req.file.mimetype,
                        uploadedAt: new Date(),
                        size: req.file.size
                    }
            })
        await user.save()
        res.status(200).send({ statusCode: 200, payload: 'File uploaded successfully.'})
    } catch (e) {
        res.status(400).send({ statusCode: 400, payload: `An error occured: ${e}`})
    }
})

// Delete picture
router.put('/file/delete', selectedUser, async (req, res) => {
    try {
        let user = req.user
        user.files = user.files.filter(element => element._id.toString() !== req.body.picId.toString())
        await user.save()

        res.status(200).send({ statusCode: 200, payload: 'File was deleted successfully.'})
    } catch (e) {
        res.status(400).send({ statusCode: 400, payload: `Couldn't delete file: ${e}`})
    }
})

// Download picture
router.post('/file/download', async (req, res) => {
    try {
        let user = await User.findById(req.query.userId)
        let picToGet
        let picName
        let picType
        for (let element of user.files) {
            if (element._id.toString() === req.query.picId) {
                picToGet = element.file
                picName = utf8.encode(element.data.name)
                picType = element.data.contentType
            }
        }
        res.set({
            'Content-Type': `${picType}`,
            'Content-Disposition': `attachment;filename=${picName}`
        })
        res.status(200).send(picToGet)
    } catch (e) {
        res.status(400).send({ statusCode: 400, payload: `Couldn't download file: ${e}`})
    }
})

module.exports = router

const User = require("../models/userModel.js")
const bcrypt = require("bcryptjs")
const { handleError } = require("../uti/helper.js")

exports.signUp = async (req, res) => {
    try {
        const { username, password } = req.body
        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = await User.create({
            username,
            password: hashPassword,
        })
        req.session.user = newUser
        res.status(200).json({
            status: "success",
            data: {
                user: newUser,
            },
        })
    } catch (e) {
        console.log(e)
        handleError(req, res, e)
    }
}

exports.logIn = async (req, res) => {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })
        if (!user) {
            return res.status(400).json({
                status: "fail",
                message: "user not found",
            })
        }
        const isCorrect = await bcrypt.compare(password, user.password)
        if (isCorrect) {
            req.session.user = user
            res.status(200).json({
                status: "success",
            })
        } else {
            res.status(400).json({
                status: "fail",
                message: "incorrect password",
            })
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({
            status: "error",
        })
    }
}

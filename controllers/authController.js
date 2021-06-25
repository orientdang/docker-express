const User = require('../models/userModel.js')
const bcrypt = require('bcryptjs')

exports.signUp = async (req, res, next) => {
    const { username, password } = req.body
    const hashPassword = await bcrypt.hash(password, 12)

    try {
        const newUser = await User.create({
            username,
            password: hashPassword,
        })
        res.status(200).json({
            status: 'success',
            data: {
                user: newUser,
            },
        })
    } catch (e) {
        console.log(e)
    }
}

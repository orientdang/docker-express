const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "User must have a User name"],
        unique: true,
        index: true,
    },
    password: {
        type: String,
        required: [true, "User must have a Password"],
    },
})

const User = mongoose.model("User", userSchema)
User.createIndexes()

module.exports = User

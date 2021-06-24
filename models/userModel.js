const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
	username: {
		type: String,
		required: [true, "User must have a User name"],
		unique: true
	},
	password: {
		type: String,
		required: [true, "User must have a Password"],
	}
})

const User = mongoose.model('User', userSchema)
module.exports = User

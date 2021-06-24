const express = require('express')
const mongoose = require('mongoose')

const app = express()

const port = process.env.PORT || 3000

mongoose.connect("mongodb://dangnh:dangnhpass@mongo:27017/?authSource=admin")
				.then(()=> console.log('Connect to DB successfull'))
				.catch((e) => console.log(e))

app.get('/', (req, res) =>{
	res.send('Hi Daniel change!!!')
})

app.listen(port, () => {
	console.log(`listening on ${port}`)
})

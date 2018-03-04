// Modules
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

// Setup
app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())

// Route
const book = require('./src/route/book')
const user  = require('./src/route/user')
const copy = require('./src/route/copy')
const borrow = require('./src/route/borrow')

app.use('/book', book)
app.use('/user', user)
app.use('/copy', copy)
app.use('/borrow', borrow)

app.use('*', (req, res) => {
  res.json({
    error: 'Resource not available'
  })
})

app.listen(process.env.PORT || 8000, () => {
	app.emit('Webservice on', null)
	console.log('Webservice on')
})

const book = require('../models/book')

function getByBooknumber (req, res) {
  let { bookNumber } = req.params
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  if (bookNumber) {
    book.queryById(bookNumber, callback)
  } else {
    res.json({})
  }
}

function getAll (req, res) {
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  book.queryAll(callback)
}

function addNewBook (req, res) {
  let { booknumber, title, publisher, isbn, classification, author } = req.body
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  if (booknumber && title && publisher && isbn && classification && author) {
    book.insert(req.body, callback)
  } else {
    res.json({
      error: "Not enough information"
    })
  }
}


module.exports = {
  getByBooknumber,
  getAll,
  addNewBook
}

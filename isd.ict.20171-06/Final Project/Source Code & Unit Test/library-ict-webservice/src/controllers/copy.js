const copy = require('../models/copy')

function getByCopynumber (req, res) {
  let { copyNumber } = req.params
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  if (copyNumber) {
    copy.queryByCopynumber(copyNumber, callback)
  } else {
    res.json({})
  }
}

function getAll (req, res) {
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  let { bookNumber } = req.query
  if (bookNumber) {
    copy.queryByBooknumber(bookNumber, callback)
  } else {
    copy.queryAll(callback)
  }
}

function addNewCopy (req, res) {
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  let { booknumber, copynumber, price, type } = req.body
  if (booknumber && copynumber && price && type) {
    copy.insert(req.body, callback)
  } else {
    res.json({
      status: false,
      error: "Not enough information"
    })
  }
}

module.exports = {
  getByCopynumber,
  getAll,
  addNewCopy
}

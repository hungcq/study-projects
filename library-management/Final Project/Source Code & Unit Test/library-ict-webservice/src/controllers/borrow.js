const borrow = require('../models/borrow')

function getByUsername (req, res) {
  let { username } = req.params
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  if (username) {
    borrow.queryByUsername(username, callback)
  } else {
    res.json({})
  }
}

function addNewBorrow (req, res) {
  let { username, copynumber } = req.body
  let callback = function (jsonResponse) {
    res.json(jsonResponse)
  }
  if (username && copynumber) {
    borrow.insert(req.body, callback)
  } else {
    res.json({
      error: "Not enough information"
    })
  }
}


module.exports = {
  addNewBorrow,
  getByUsername
}

const router = require('express').Router()
const copy = require('../controllers/borrow')

router.get('/:username', (req, res) => copy.getByUsername(req, res))
router.post('/', (req, res) => copy.addNewBorrow(req, res))

module.exports = router

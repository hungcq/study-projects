const router = require('express').Router()
const book = require('../controllers/book')

router.get('/:booknumber', (req, res) => book.getByBooknumber(req, res))
router.get('/', (req, res) => book.getAll(req, res))
router.post('/', (req, res) => book.addNewBook(req, res))

module.exports = router

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {findData, getSuggestion} = require('./tree');
const {loadData} = require('./data-loader')

const app = express();

app.use(bodyParser.json());
app.use(cors());

const router = express.Router();

loadData();

router.get('/', (req, res) => {
    try {
        res.json(findData(req.query.value.toLowerCase()));
    } catch (e) {
        console.error(e);
    }
});

router.get('/suggestion', (req, res) => {
    try {
        res.json(getSuggestion(req.query.value.toLowerCase()));
    } catch (e) {
        console.error(e);
    }
});

app.use('/dictk', router);

app.get('/', (req, res) => res.send('News Service'));

app.use('*', (req, res) => res.status(404).send('Invalid path'));

app.listen(3001, '0.0.0.0', () => console.error(`News service is listening on port 3001.`));
const express = require('express');
const bodyParser = require('body-parser');
const {logger} = require('../../utils');
const cors = require('cors');
const { PORT } = require('../../configs/common-configs');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/news', require('./news-router').router);

app.get('/', (req, res) => res.send('News Service'));

app.use('*', (req, res) => res.status(404).send('Invalid path'));

app.listen(PORT, '0.0.0.0', () => logger.error(`News service is listening on port ${PORT}.`));
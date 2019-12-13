const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const cors = require('cors');
app.use(cors());
const { PORT } = require('./src/config/env');

// Config
const proxy = require('express-http-proxy');
app.use('/proxy', proxy('storage.googleapis.com'));

const CURRENT_PORT = process.env.PORT || PORT;
app.listen(CURRENT_PORT, () => console.log(`Proxy slide service listening on port ${CURRENT_PORT}!`));

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const { PORT } = require('./src/config/env');

// Config
app.use(bodyParser.json());

// Router
const { mainApiRouter } = require('./src/router/main');

app.use('/api', mainApiRouter);

app.get('/', (req, res) => res.send('User service'));

app.use('*', (req, res) => res.redirect('/'));

const CURRENT_PORT = process.env.PORT || PORT;
app.listen(CURRENT_PORT, () => console.log(`Lecture service listening on port ${CURRENT_PORT}!`));

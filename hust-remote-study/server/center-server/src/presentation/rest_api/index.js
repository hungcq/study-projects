const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const { setupSocket } = require('../socket/socket');

setupSocket(io);

// Config
app.use(bodyParser.json());
app.use(cors());

// Router
app.use('/api/users', require('./userRoute').router);
app.use('/api/lectures', require('./lectureRoute').router);
app.use('/api/classes', require('./classRoute').router);
app.use('/api/students', require('./studentRoute').router);
app.use('/api/actions', require('./actionRoute').router);


app.get('/', (req, res) => res.send('Welcome to HUST Remote Study'));

app.use('*', (req, res) => res.status(404).send('Invalid path'));

const CURRENT_PORT = process.env.PORT || 3001;
http.listen(CURRENT_PORT, () => console.log(`Server listening on port ${CURRENT_PORT}!`));
// http.timeout = 60 * 10;

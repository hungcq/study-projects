const OpenTok = require('opentok');

const API_KEY = '46343982';
const TOKEN = '4e401cc6268c290086b8cd937d77c9944552711e';

const openTok = new OpenTok(API_KEY, TOKEN);

module.exports = { openTok };

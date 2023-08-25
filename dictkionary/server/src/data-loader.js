const { insertValue } = require('./tree');

const fs = require('graceful-fs');
const lineReader = require('readline');
const path = require('path');

const ts = new Date().getTime();
const loadData = () => {
  let word = null;
  lineReader.createInterface({
    input: fs.createReadStream('./en-vi-dict.txt'),
  }).on('line', line => {
    if (line !== '') {
      if (!word) {
        word = {
          lines: [],
          data: {
            text: [],
          }
        }
      }
      word.lines.push(line);
      return;
    }
    if (!word) {
      return;
    }
    word.lines.map(item => {
      switch (item[0]) {
        case '@':
          const arr = item.split(' ');
          const value = arr[0].substring(1);
          word.value = value;
          word.data = { ...word.data, value, pronunciation: arr[1] };
          break;
        default:
          word.data.text.push(item);
      }
    });
    insertValue(word.value, word.data);
    word = null;
  }).on('close', () => {
    console.log(new Date().getTime() - ts);
  });
};

module.exports = {
  loadData
}
function insert (obj, callback) {
  let { username, copynumber } = obj
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  let date = new Date();

  let borrowDate = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2)

  date = new Date(date.getTime() + 15 * 86400 * 1000)
  let returnDate = date.getUTCFullYear() + '-' +
  ('00' + (date.getUTCMonth() + 1)).slice(-2) + '-' +
  ('00' + date.getUTCDate()).slice(-2)

  let query = ''
  query = `INSERT INTO borrowinfo (username, copyNumber, borrowDate, returnDate, current) VALUES
  ('${username}', '${copynumber}', '${borrowDate}', '${returnDate}', 'REGISTERED')`
  client.connect();
  client.query(query, (err, res) => {
    if (err) {
      console.log(err)
      callback({
        status: false,
        error: "Invalid information"
      })
    } else {
      callback({
        status: true,
        username,
        copynumber,
        borrowDate,
        returnDate,
        current: 'REGISTERED'
      })
    }
    client.end();
    require('./copy').updateType(copynumber, 'LENT')
  });
}

function queryByUsername (username, callback) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  client.query(`SELECT * FROM borrowinfo WHERE username = '${ username }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({
        error: "service down"
      })
    } else {
      callback(res.rows)
    }
    client.end();
  });
}

module.exports = {
  queryByUsername,
  insert
}

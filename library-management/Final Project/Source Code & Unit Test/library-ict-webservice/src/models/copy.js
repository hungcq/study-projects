function queryByCopynumber (copyNumber, callback) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  client.query(`SELECT * FROM copy WHERE copyNumber = '${ copyNumber }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({})
    } else {
      callback(res.rows[0])
    }
    client.end();
  });
}

function queryByBooknumber (bookNumber, callback) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  client.query(`SELECT * FROM copy WHERE bookNumber = '${ bookNumber }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({})
    } else {
      callback(res.rows)
    }
    client.end();
  });
}

function queryAll (callback) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  client.query(`SELECT * FROM copy`, (err, res) => {
    if (err) {
      console.log(err)
      callback({})
    } else {
      callback(res.rows)
    }
    client.end();
  });
}

function insert (obj, callback) {
  let { booknumber, copynumber, price, type } = obj
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  let query = ''
  query = `INSERT INTO copy (copyNumber, bookNumber, price, type) VALUES
    ('${copynumber}', '${booknumber}', '${price}', '${type}')`
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
        copyNumber: copynumber
      })
    }
    client.end();
  });
}

function updateType (copynumber, type) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  let query = ''
  query = `UPDATE copy SET type = '${type}' WHERE copyNumber = '${copynumber}'`
  client.connect();
  client.query(query, (err, res) => {
    if (err) {
      console.log(err)
    } else {
      console.log(res)
    }
    client.end();
  });
}

module.exports = {
  queryByCopynumber,
  queryAll,
  queryByBooknumber,
  insert,
  updateType
}

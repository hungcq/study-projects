function queryByUsername (username, callback) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  client.query(`SELECT * FROM users WHERE username = '${ username }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({
        error: "service down"
      })
    } else {
      callback(res.rows[0])
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
  client.query(`SELECT * FROM users`, (err, res) => {
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

function insert (obj, callback) {
  let { username, password, fullname, email, gender, contact, role, studyperiod, studentid } = obj
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  let query = ''
  if (studyperiod && studentid) {
    query = `INSERT INTO users (username, password, fullName, email, gender, contact, studyPeriod, studentId, role) VALUES
    ('${username}', '${password}', '${fullname}', '${email}', '${gender}', '${contact}', '${studyperiod}', '${studentid}', '${role}')`
  } else {
    query = `INSERT INTO users (username, password, fullName, email, gender, contact, studyPeriod, studentId, role) VALUES
    ('${username}', '${password}', '${fullname}', '${email}', '${gender}', '${contact}', NULL, NULL, '${role}')`
  }
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
        username: username
      })
    }
    client.end();
  });
}

function queryByUsernameAndPassword (username, password, callback) {
  const { Client } = require('pg');
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://jyamevtnefikev:c21391120be4cd964cfe0b8f1c5395f58da938b9c8ce7fec59fc6c88efa96330@ec2-54-235-80-137.compute-1.amazonaws.com:5432/d34otthgq56sk',
    ssl: true,
  });
  client.connect();
  client.query(`SELECT * FROM users WHERE username = '${ username }' and password = '${ password }'`, (err, res) => {
    if (err) {
      console.log(err)
      callback({
        error: "service down"
      })
    } else {
      if (res.rows.length === 0)
        callback({
          status: false
        })
      else
        callback({
          status: true,
          role: res.rows[0].role
        })
    }
    client.end();
  });
}

module.exports = {
  queryByUsername,
  queryAll,
  queryByUsernameAndPassword,
  insert
}

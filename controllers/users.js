const db = require('../database');
const { getUserByID } = require('../services/users');

const {
  USER_ROLE_ADMIN,
  USER_ROLE_MODERATOR,
  USER_ROLE_USER,
} = require('../constants');

function getUser(res, id) {
  if (!id) {
    throw new Error('No user id found');
  }

  const callbackGetUserByID = (row, err) => {
    if (err) {
      res.status(404).send(`Cannot create user: ${err.message}`);
    }

    res.send(row || {});
  };

  getUserByID(id, callbackGetUserByID);
}

function getUsers(res) {
  const sql = 'SELECT id, firstname, lastname, role FROM users';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw new Error(`Error on users retrieve: ${err.message}`);
    }
    res.send(rows || []);
  });
}

function createUser(res, params) {
  const {
    firstname,
    lastname,
    role,
    country,
    address,
    zipCode,
  } = params;

  if (!firstname) {
    throw new Error('No firstname found');
  }
  if (!lastname) {
    throw new Error('No lastname found');
  }
  if (!role || ![
    USER_ROLE_ADMIN,
    USER_ROLE_MODERATOR,
    USER_ROLE_USER,
  ].includes(role)) {
    throw new Error('No role found');
  }
  if (!country) {
    throw new Error('No country found');
  }
  if (!address) {
    throw new Error('No address found');
  }
  if (!zipCode) {
    throw new Error('No zipCode found');
  }

  const sql = 'INSERT INTO users (firstname, lastname, role, country, zipCode, address) VALUES (?,?,?,?,?,?)';

  db.run(sql, [
    firstname,
    lastname,
    role,
    country,
    address,
    zipCode,
  ], function (err) {
    if (err) {
      throw new Error(`Error on user creation: ${err.message}`);
    }

    res.json({
      ...params,
      id: this.lastID,
    });
  });
}

function updateUser(res, params) {
  const {
    id,
    firstname,
    lastname,
    role,
    country,
    address,
    zipCode,
  } = params;

  if (!id) {
    throw new Error('No user id found');
  }

  if (role && ![
    USER_ROLE_ADMIN,
    USER_ROLE_MODERATOR,
    USER_ROLE_USER,
  ].includes(role)) {
    throw new Error('Wrong role type');
  }
  const sql = `UPDATE users set 
                   firstname = COALESCE(?, firstname), 
                   lastname = COALESCE(?, lastname),
                   role = COALESCE(?, role), 
                   country = COALESCE(?, country),
                   zipCode = COALESCE(?, zipCode), 
                   address = COALESCE(?, address)
               WHERE id = ?`;

  db.run(sql, [
    firstname,
    lastname,
    role,
    country,
    zipCode,
    address,
    id,
  ], (err) => {
    if (err) {
      throw new Error(`Error on user update: ${err.message}`);
    }

    res.json(params);
  });
}

function deleteUser(res, id) {
  if (!id) {
    throw new Error('No user id found');
  }

  db.run(
    'DELETE FROM users WHERE id = ?',
    id,
    function (err) {
      if (err) {
        throw new Error(`Error on user delete: ${err.message}`);
      }
      res.json(this.changes ? { id } : null);
    },
  );
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};

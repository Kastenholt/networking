const db = require('../database');

const getUserByID = (id, getUser) => {
  const sql = 'SELECT * FROM users WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    getUser(row, err);
  });
};

module.exports = {
  getUserByID,
};

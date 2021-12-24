const db = require('../database');
const { getUserByID } = require('../services/users');

const {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_COMPLETE,
} = require('../constants');

function getOrder(res, id) {
  if (!id) {
    throw new Error('No order id found');
  }

  const sql = 'SELECT * FROM orders WHERE id = ?';

  db.get(sql, [id], (err, row) => {
    if (err) {
      throw new Error(`Error on order retrieve: ${err.message}`);
    }

    res.send(row || {});
  });
}

function getOrders(res) {
  const sql = 'SELECT * FROM orders';

  db.all(sql, [], (err, rows) => {
    if (err) {
      throw new Error(`Error on orders retrieve: ${err.message}`);
    }
    res.send(rows || []);
  });
}

function createOrder(res, params) {
  const {
    userId,
    items,
    status,
  } = params;

  if (!userId) {
    throw new Error('No userId found');
  }
  if (!items) {
    throw new Error('No items found');
  }
  if (!status || ![
    ORDER_STATUS_PENDING,
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_COMPLETE,
  ].includes(status)) {
    throw new Error('No status found');
  }

  const callbackGetUserByID = (row, err) => {
    if (err) {
      res.status(404).send(`Cannot create order: ${err.message}`);
    }

    if (!row) {
      res.status(404).send('User do not exist');
    }
  };

  getUserByID(userId, callbackGetUserByID);

  const sql = 'INSERT INTO orders (userId, items, status) VALUES (?,?,?)';

  db.run(sql, [
    userId,
    items,
    status,
  ], function (err) {
    if (err) {
      throw new Error(`Error on order creation: ${err.message}`);
    }

    res.json({
      ...params,
      id: this.lastID,
    });
  });
}

function updateOrder(res, params) {
  const {
    id,
    userId,
    items,
    status,
  } = params;

  if (!id) {
    throw new Error('No user id found');
  }

  if (!status || ![
    ORDER_STATUS_PENDING,
    ORDER_STATUS_CANCELLED,
    ORDER_STATUS_COMPLETE,
  ].includes(status)) {
    throw new Error('No status found');
  }

  const callbackGetUserByID = (row, err) => {
    if (err) {
      res.status(404).send(`Cannot create order: ${err.message}`);
    }

    if (!row) {
      res.status(404).send('User do not exist');
    }
  };

  getUserByID(userId, callbackGetUserByID);

  const sql = `UPDATE orders set
                                 userId = COALESCE(?, userId),
                                 items = COALESCE(?, items),
                                 status = COALESCE(?, status)
               WHERE id = ?`;

  db.run(sql, [
    userId,
    items,
    status,
    id,
  ], (err) => {
    if (err) {
      throw new Error(`Error on order update: ${err.message}`);
    }

    res.json(params);
  });
}

function deleteOrder(res, id) {
  if (!id) {
    throw new Error('No order id found');
  }

  db.run(
    'DELETE FROM orders WHERE id = ?',
    id,
    function (err) {
      if (err) {
        throw new Error(`Error on order delete: ${err.message}`);
      }
      res.json(this.changes ? { id } : null);
    },
  );
}

module.exports = {
  getOrder,
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};

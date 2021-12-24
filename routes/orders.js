const express = require('express');

const router = express.Router();
const controller = require('../controllers/orders');

router.get('/', (req, res) => {
  try {
    controller.getOrders(res);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
  .get('/:id', (req, res) => {
    try {
      controller.getOrder(res, req.params.id);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .post('/', (req, res) => {
    const {
      userId,
      items,
      status,
    } = req.body;

    try {
      controller.createOrder(res, {
        userId,
        status,
        items: Array.isArray(items) ? items.join(',') : '',
      });
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .patch('/:id', (req, res) => {
    const {
      userId,
      items,
      status,
    } = req.body;

    try {
      controller.updateOrder(res, {
        userId,
        status,
        id: req.params.id,
        items: Array.isArray(items) ? items.join(',') : '',
      });
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .delete('/:id', (req, res) => {
    try {
      controller.deleteOrder(res, req.params.id);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

module.exports = router;

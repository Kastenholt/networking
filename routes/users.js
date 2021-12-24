const express = require('express');

const router = express.Router();
const controller = require('../controllers/users');

router.get('/', (req, res) => {
  try {
    controller.getUsers(res);
  } catch (e) {
    res.status(400).send(e.message);
  }
})
  .get('/:id', (req, res) => {
    try {
      controller.getUser(res, req.params.id);
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .post('/', (req, res) => {
    const {
      firstname,
      lastname,
      role,
      country,
      address,
      zipCode,
    } = req.body;

    try {
      controller.createUser(res, {
        firstname,
        lastname,
        role,
        country,
        address,
        zipCode,
      });
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .patch('/:id', (req, res) => {
    const {
      firstname,
      lastname,
      role,
      country,
      address,
      zipCode,
    } = req.body;

    try {
      controller.updateUser(res, {
        firstname,
        lastname,
        role,
        country,
        address,
        zipCode,
        id: req.params.id,
      });
    } catch (e) {
      res.status(400).send(e.message);
    }
  })
  .delete('/:id', (req, res) => {
    try {
      controller.deleteUser(res, req.params.id);
    } catch (e) {
      res.status(400).send(e.message);
    }
  });

module.exports = router;

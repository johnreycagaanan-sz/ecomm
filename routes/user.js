const express = require('express');
const router = express.Router();
const {
    getUsers,
    postUser,
    deleteUsers,
    updateUser,
    getUser,
    deleteUser
} = require('../controllers/userController');

router.route('/')
      .get(getUsers)
      .post(postUser)
      .delete(deleteUsers)

router.route('/:userId')
      .get(getUser)
      .put(updateUser)
      .delete(deleteUser)

module.exports = router;
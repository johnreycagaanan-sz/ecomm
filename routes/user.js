const express = require('express');
const router = express.Router();

const {
    getUsers,
    postUser,
    deleteUsers,
    updateUser,
    getUser,
    deleteUser,
    login
} = require('../controllers/userController');
const reqLogger = require('../middlewares/reqLogger');
const { userValidator, adminValidator } = require('../middlewares/utils/validators');
const protectedRoute = require('../middlewares/auth');


router.route('/')
      .get(reqLogger, adminValidator, getUsers)
      .post(reqLogger, userValidator, postUser)
      .delete(reqLogger, protectedRoute, deleteUsers)

router.route('/login')
      .post(reqLogger, login)

router.route('/:userId')
      .get(reqLogger, getUser)
      .put(reqLogger, protectedRoute, updateUser)
      .delete(reqLogger, protectedRoute, deleteUser)

module.exports = router;
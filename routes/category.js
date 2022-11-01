const express = require('express');
const router = express.Router();
const {
    getCategories,
    postCategory,
    deleteCategories,
    updateCategory,
    getCategory,
    deleteCategory
} = require('../controllers/categoryController');
const reqLogger = require('../middlewares/reqLogger');
const { categoryValidator } = require('../middlewares/utils/validators')
const protectedRoute = require('../middlewares/auth');

router.route('/')
      .get(getCategories)
      .post(reqLogger, protectedRoute,  categoryValidator, postCategory)
      .delete(reqLogger, protectedRoute, deleteCategories)

router.route('/:categoryId')
      .get(reqLogger, getCategory)
      .put(reqLogger, protectedRoute,  updateCategory)
      .delete(reqLogger, protectedRoute,  deleteCategory)

module.exports = router;
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

router.route('/')
      .get(getCategories)
      .post(postCategory)
      .delete(deleteCategories)

router.route('/:categoryId')
      .get(getCategory)
      .put(updateCategory)
      .delete(deleteCategory)

module.exports = router;
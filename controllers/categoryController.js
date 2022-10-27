const Category = require('../models/category');
const getCategories = async (req, res, next) => {

    if(Object.keys(req.query).length){
        const category = req.query.categoryName
        console.log(`Searching for category for: ${category}`);
    }

    try{
        const categories = await Category.find();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(categories);
    } catch (err){
        throw new Error(`Error retrieving categories: ${err.message}`);
    }
    
}

const postCategory = async(req, res, next) => {
    try{
        const category = await Category.create(req.body);
        res
            .status(201)
            .setHeader('Content-Type', 'application/json')
            .json(category)
    }catch(err){
        throw new Error(`Error creating a new category: ${err.message}`);
    }
}

const deleteCategories = async(req, res, next) => {
    try{
        await Category.deleteMany();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(`Categories deleted`)
    }catch(err){
        throw new Error(`Error deleting all categories: ${err.message}`)
    }
    
}

const getCategory = async(req, res, next) => {
    try{
        const category = await Category.findById(req.params.categoryId);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(category)
    }catch(err){
        throw new Error(`Error deleting category id of ${req.params.categoryId}: ${err.message}`)
    }

    
}

const updateCategory = async(req, res, next) => {
    try{
        const category = await Category.findByIdAndUpdate(req.params.categoryId,{
            $set: req.body
        }, {
            new: true
        });
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(category)
    }catch(err){
        throw new Error(`Error deleting category id of ${req.params.categoryId}: ${err.message}`)
    }
}

const deleteCategory = async(req, res, next) => {
    try{
        await Category.findByIdAndDelete(req.params.categoryId);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(`Category ${req.params.categoryId} deleted`)
    }catch(err){
        throw new Error(`Error deleting category id of ${req.params.categoryId}: ${err.message}`)
    }
}

module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    updateCategory,
    getCategory,
    deleteCategory
}
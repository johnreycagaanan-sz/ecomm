const getCategories = (req, res, next) => {

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'show me all categories' })
}

const postCategory = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success:true, msg: 'Create new category!' })
}

const deleteCategories = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: 'Delete all categories'})
}

const getCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Show one category: ${req.params.categoryId}`})
}

const updateCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Update category: ${req.params.categoryId}`})
}

const deleteCategory = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Delete category with id: ${req.params.categoryId}`})
}

module.exports = {
    getCategories,
    postCategory,
    deleteCategories,
    updateCategory,
    getCategory,
    deleteCategory
}
const getItems = (req, res, next) => {

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'Show me all items' })
}

const postItem = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success:true, msg: 'Create new item!' })
}

const deleteItems = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: 'Delete all items'})
}

const getItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Show one item: ${req.params.itemId}`})
}

const updateItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Update item: ${req.params.itemId}`})
}

const deleteItem = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Delete item with id: ${req.params.itemId}`})
}

module.exports = {
    getItems,
    postItem,
    deleteItems,
    updateItem,
    getItem,
    deleteItem
}
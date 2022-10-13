const getUsers = (req, res, next) => {

    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({ success: true, msg: 'Show me all users' })
}

const postUser = (req, res, next) => {
    res
    .status(201)
    .setHeader('Content-Type', 'application/json')
    .json( { success:true, msg: 'Create new user' })
}

const deleteUsers = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: 'Delete all users'})
}

const getUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Show one user: ${req.params.userId}`})
}

const updateUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Update user: ${req.params.userId}`})
}

const deleteUser = (req, res, next) => {
    res
    .status(200)
    .setHeader('Content-Type', 'application/json')
    .json({success: true, msg: `Delete user with id: ${req.params.userId}`})
}

module.exports = {
    getUsers,
    postUser,
    deleteUsers,
    updateUser,
    getUser,
    deleteUser
}
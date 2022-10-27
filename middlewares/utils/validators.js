const categoryValidator = (req, res, next) => {
    if (req.body) {
        if (!req.body.categoryName || 
            !req.body.gender) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success:false, msg: 'Missing required fields! '})
        }
        else {
            next();
        }
    }
}

const userValidator = (req, res, next) => {
    if (req.body) {
        if (!req.body.userName || 
            !req.body.gender ||
            !req.body.firstName ||
            !req.body.lastName ||
            !req.body.email ||
            !req.body.password) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success:false, msg: 'Missing required fields! '})
        }
        else {
            next();
        }
    }
}

const itemValidator = (req, res, next) => {
    if (req.body) {
        if (!req.body.itemDescription || 
            !req.body.gender || 
            !req.body.price || 
            !req.body.category || 
            !req.body.colors || 
            !req.body.sizes ||
            !req.body.itemName
            ) {
            res
            .status(400)
            .setHeader('Content-Type', 'application/json')
            .json({ success:false, msg: 'Missing required fields! '})
        }
        else {
            next();
        }
    }
}

const adminValidator = (req, res, next) => {

    if(req.user.admin){
        next();
    }else{
        res
            .status(403)
            .setHeader('Content-Type', 'application/json')
            .json({success: false, msg: `Unauthorized to access this resource!`})
    }

}

module.exports = {
    categoryValidator,
    userValidator,
    itemValidator,
    adminValidator
}
const Item = require('../models/Item');
const path = require('path');

const getItems = async (req, res, next) => {

    if(Object.keys(req.query).length){
        const {
            gender,
            price,
            isClearance,
            category,
            colors,
            sizes
        } = req.query

        const filter = [];

    if (gender) filter.push(gender);
    if (price) filter.push(price);
    if (isClearance) filter.push(isClearance);
    if (category) filter.push(category);
    if (colors) filter.push(colors);
    if (sizes) filter.push(sizes);

    for (let i=0; i < filter.length; i++){
        console.log (`Searching item by: ${filter[i]}`);
    }
    }

    try {
        const items = await Item.find();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(items)
    } catch (err) {
        throw new Error(`Error retrieving items: ${err.message}`);
    }
    
}

const postItem = async(req, res, next) => {
    try {
        const item = await Item.create(req.body)
        res
            .status(201)
            .setHeader('Content-Type', 'application/json')
            .json(item)
    } catch (err) {
        throw new Error(`Error creating item: ${err.message}`)
    }
    
}

const deleteItems = async(req, res, next) => {
    try {
        await Item.deleteMany();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success: true, msg: 'Delete all items'})
    } catch (err) {
        throw new Error(`Error deleting items: ${err.message}`)
    }
}

const getItem = async(req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        // console.log(item);
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(item)

    } catch (err) {
        throw new Error(`Error retrieving ${req.params.itemId}: ${err.message}`)
    }
}

const updateItem = async(req, res, next) => {
    try {
        const item = await Item.findByIdAndUpdate(req.params.itemId,{
            $set:req.body
        },{
            new:true
        });
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(item)
    } catch (err) {
        throw new Error(`Error updating item ${req.params.id}: ${err.message}`)
    }
}

const deleteItem = async(req, res, next) => {
    try {
        await Item.findByIdAndDelete(req.params.itemId)
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success: true, msg: `Item ${req.params.itemId} deleted`})
    } catch (err) {
        throw new Error(`Error deleting item ${req.params.itemId}: ${err.message}`)
    }
};

const getItemRatings = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        const ratings = item.ratings;
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(ratings)
    } catch (err) {
        throw new Error(`Error retrieving item ratings: ${err.message}`);
    }
}

const postItemRating = async (req, res, next) => {
    try{
        const item = await Item.findById(req.params.itemId);
        item.ratings.push(req.body);

        const result = await item.save();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(result)
    }catch (err){
        throw new Error(`Error creating item rating: ${err.message}`)
    }
}

const deleteItemRatings = async(req, res, next) => {
    try{
        const item = await Item.findById(req.params.itemId);
        item.ratings = [];

        await item.save();
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json({success: true, msg: `Ratings deleted`})
    } catch (err) {
        throw new Error(`Error deleting ratings`)
    }
}

const getItemRating = async (req, res, next) => {
    try {
        const item = await Item.findById(req.params.itemId);
        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));
        
        if(!rating) rating = {success: false, msg: `No rating found`}
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)
    } catch (err) {
        throw new Error(`Error retrieving item rating ${req.params.ratingId}: ${err.message}`);
    }
}

const updateItemRating = async(req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if(rating){
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1, req.body);
            rating = item.ratings[ratingIndexPosition];
            await item.save();
        }
        else{
            rating = {success: false, msg: `No rating found with rating id: ${req.params.ratingId}`}
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)
    } catch (err) {
        throw new Error(`Error updating rating with id of: ${req.params.ratingId}: ${err.message}`)
    }
}

const deleteItemRating = async(req, res, next) => {
    try {
        let item = await Item.findById(req.params.itemId);

        let rating = item.ratings.find(rating => (rating._id).equals(req.params.ratingId));

        if(rating){
            const ratingIndexPosition = item.ratings.indexOf(rating);
            item.ratings.splice(ratingIndexPosition, 1);
            rating = {success: true, msg: `Rating with id: ${req.params.ratingId} deleted`}
            await item.save();
        }
        else{
            rating = {success: false, msg: `No rating found with rating id: ${req.params.ratingId}`}
        }
        res
            .status(200)
            .setHeader('Content-Type', 'application/json')
            .json(rating)
    } catch (err) {
        throw new Error(`Error deleting rating with id of: ${req.params.ratingId}: ${err.message}`)
    }
};

const postItemImage = async(req, res, next) => {
    if(!req.files) throw new Error(`Missing image`);
    
    const file = req.files.image;
   
    if(!file.mimetype.startsWith('image')) throw new Error (`Please upload an image file type`);

//    if(file.mimetype.startsWith('image')) console.log(`Correct file type`);
//    console.log(file.size)

   if(file.size > process.env.MAX_FILE_SIZE) throw new Error(`Image exceeds size of ${process.env.MAX_FILE_SIZE}`);

//    file.name = `photo_${path.parse(file.name).ext}`;
      file.name = `photo_${file.name}`;
//    console.log(file.name);

    // file.mv(`${process.env.FILE_UPLOAD_PATH}`, async (err) => {
    file.mv(path.resolve(__dirname,`${process.env.FILE_UPLOAD_PATH}`, file.name), async (err) => {

    if(err) throw new Error(`Problem uploading photo: ${err.message}`);

    await Item.findByIdAndUpdate(req.params.itemId, {image: file.name });

    res
        .status(200)
        .setHeader('Content-Type', 'application/json')
        .json({success: true, data: file.name });
   })
};
module.exports = {
    getItems,
    postItem,
    deleteItems,
    updateItem,
    getItem,
    deleteItem,
    getItemRatings,
    postItemRating,
    deleteItemRatings,
    getItemRating,
    updateItemRating,
    deleteItemRating,
    postItemImage
}
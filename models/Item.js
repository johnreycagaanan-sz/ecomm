const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

const RatingSchema = new Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

const ItemSchema = new Schema ({
    itemName:{
        type: String,
        required: [true, 'Please enter an item name'],
        maxLength: [150, 'Item name can not be more than 150 characters']
    },
    itemDescription: {
        type: String,
        required: [true, 'Please enter an item description'],
        maxLength: [150, 'Item description can not be more than 150 characters']
    },
    gender: {
        type: String,
        required: [true, 'Gender required'],
        enum: [
            'Male',
            'Female'
        ]
    },
    price: {
        type: Number,
        required: [true, 'Please enter an item name'],
        min: 0,
        validate : (price) => {
            return typeof price==='number';
        }
    },
    isClearance: {
        type: Boolean,
        default: false,
        validate : (isClearance) => {
            return typeof isClearance === 'boolean';
        }
    },
    colors: {
        type: [String],
        required: [true, 'Please enter item colors']
    },
    sizes: {
        type: [String],
        required: [true, 'Please enter item sizes'],
        enum: [
            'Small',
            'Medium',
            'Large',
            'X-Large',
        ]
    },
    category: {
        type: String,
        required: [true, `Please enter item category`]
    },
    ratings: [RatingSchema],
    image: {
        type: String
    }
}, {
    timestamps: true
})

ItemSchema.pre('save', function(next){
    this.itemName = this.itemName.trim();
    this.itemDescription = this.itemDescription.trim();

    next();
})

ItemSchema.post('save', function(){
    this.gender = this.gender.toUpperCase();
                        
})
module.exports = mongoose.model('Item', ItemSchema);
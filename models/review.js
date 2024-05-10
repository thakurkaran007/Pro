const { object } = require('joi');
const mongoose = require('mongoose');

const review = new mongoose.Schema({
    comment:String,
    rating: {
        type:Number,
        min:0,
        max:5,
    },
    date: {
        type:Date,
        default: Date.now(),
    },
    author: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

module.exports = mongoose.model("review",review);
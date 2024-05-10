const mongoose = require('mongoose');
const review  = require("../models/review.js"); 

const listSchema = new mongoose.Schema({
    title:
    {   type:String,
        required:true
    },
    description:
    {   type:String,
        required:true
    },
    image:{   
        url:String,
        filename:String,
    },
    price:Number,
    location:{   
        type:String,
        required:true
    },
    country:{   
        type:String,
        required:true
    },
    review: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"review",
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    geometry: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type:[Number],
            required: true,
        }
    }
    
});

listSchema.post("findOneAndDelete", async(listing) => {
    if(listing) {
        await review.deleteMany({id : {$in: listing.review}});
    }
})


const Listing = mongoose.model("Listing",listSchema);

module.exports = Listing; 
const review = require('../models/review.js');
const Listing  = require("../models/listing.js");
const x = module.exports;

x.newReview = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    let newReview = new review(req.body.review);
    newReview.author = req.user._id;
    listing.review.push(newReview);  // Assuming 'reviews' field in your Listing model
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${id}`);
}
x.deleteReview = async (req, res) => {
    let { id, reviewid } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewid } });
    await Review.findByIdAndDelete(reviewid);
    res.redirect(`/listings/${id}`);
}
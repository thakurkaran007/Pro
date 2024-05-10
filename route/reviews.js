const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const {validateListing ,validateReviews} = require("../schema.js");
const { LogIn, isReviewAuthor } = require('../middleware.js');
const { newReview, deleteReview } = require('../controllers/reviews.js');


router.post("/",LogIn,validateReviews,asyncWrap(newReview));

router.post("/:reviewid",LogIn,isReviewAuthor, asyncWrap(deleteReview));

module.exports = router;
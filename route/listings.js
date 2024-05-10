const express = require('express');
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/wrapAsync.js");
const {validateListing ,validateReviews} = require("../schema.js");
const {LogIn, isOwner} = require("../middleware.js");
const { index, newform, showListing, newListing, editListing, deleteListing, updateListing } = require('../controllers/listings.js');
const { storage } = require("../cloudConfig.js");
const multer  = require('multer')
const upload = multer({ storage });

router
.route("/")       
.get(LogIn,asyncWrap(index))
.post(upload.single("listing[image]"),validateListing,asyncWrap(newListing));

router.get("/new",LogIn,newform);

router.post("/:id/y",isOwner,upload.single("listing[image]"),validateListing,asyncWrap(updateListing));

router.get("/:id/new",LogIn,asyncWrap(editListing));

router.get("/:id/d",LogIn,asyncWrap(deleteListing));

router.get("/:id",LogIn,asyncWrap(showListing));


module.exports = router;
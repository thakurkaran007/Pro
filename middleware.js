const Listing = require("./models/listing.js");

const review = require("./models/review.js");
module.exports.LogIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must Login To do this");
        return res.redirect("/login");
    }else{
        return next();
    }
}

module.exports.saveRedirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.x = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if(!listing.owner._id.equals(req.user._id)){
        req.flash("error","You dont have Permission to do this");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
module.exports.isReviewAuthor= async(req,res,next) => {
    let {id,reviewid} = req.params;
    let r = await review.findById(reviewid);
    if(!r.author._id.equals(req.user._id)){
        req.flash("error","You dont have Permission to do this");
        return res.redirect(`/listings/${id}`);
    }
    next();
}
const express = require ("express");
// mergeParams it is used when we pass id from app.js to review it does not pass for passing we use this 
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utilis/wrapAsync.js");
const ExpressError = require("../utilis/ExpressError.js");
const{reviewSchema} = require("../schema.js");

const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const{validateReview , isLoggedIn, isReviewAuthor} = require("../middleware.js");

const reviewController = require("../controllers/review.js");


router.post("/" ,isLoggedIn,validateReview ,wrapAsync(reviewController.createReview));

// Delete review
// in the card of review we place a delete button through form and from ther we send request here 

router.delete("/:reviewId",isLoggedIn, isReviewAuthor,wrapAsync(reviewController.destroyReview))

module.exports = router;
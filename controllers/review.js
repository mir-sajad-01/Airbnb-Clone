/* MVC : Model , View , Controller
   Implement Design Pattern for Reviews.
*/
const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async(req,res)=>{
    // first we will find which listing is it 
    let listing = await Listing.findById(req.params.id);

    // it is the review that you have submitted
    let newReview = new Review(req.body.review);

    newReview.author = req.user._id;

    // it will push that into review array as in review schema
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async(req,res)=>{
    let{id,reviewId} = req.params;
    // delte review in listing review array by using pull operator
    // the $pull operator removes from an existing array all instances of a value or values that match a specified condition.
    await Listing.findByIdAndUpdate(id,{$pull:{reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);// this will delete review when it will call it calls listing shcema middleware review dlt
    req.flash("success","Review Deleted");   
    res.redirect(`/listings/${id}`);
}
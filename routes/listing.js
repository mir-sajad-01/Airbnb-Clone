const express = require ("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");

const {isLoggedIn , isOwner,validateListing} = require("../middleware.js");

 const listingController = require("../controllers/listings.js");

/* process for uploading image through web site
   form gets image then sends to backend and parss
   the cloud stores that image and creates the url link 
   of that image that is in req.file in path
*/


 // multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency.
 const multer = require("multer");
 const {storage} = require("../cloudConfig.js");
 const upload = multer({storage});

// when we want to use multer with cloudery
// we use this npm i multer-storage-cloudinary

 // req.file is the avatar file that is lising[image]
   // req.body will hold the text fields, if there were any.
 router.route("/")
 .get(wrapAsync(listingController.index))
 .post(isLoggedIn,upload.single("listing[image]"), validateListing,wrapAsync(listingController.createListing))

// this will help in uploading image to the uploads folder

// New Route

router.get("/new",isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.put(isLoggedIn,isOwner,upload.single("listing[image]"),validateListing,wrapAsync(listingController.updateListing))
.get(wrapAsync(listingController.showListing))
.delete(isLoggedIn,isOwner, wrapAsync(listingController.destroyListing));

// Edit Route

 router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));
 

// exporting router object that container mainy routers
 module.exports = router;
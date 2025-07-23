/* dotenv
   Dotenv is a zero dependency module that loads environment variables from a .env
   file into process.env .
*/

// basically we are in development phase not in production phase where people are using website so we want this file only use in dev phase . when we use production at tha time we can use another phase

if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

const express = require("express");

const app = express();

const path = require("path");

const mongoose = require("mongoose");
const MONGO_URL =process.env.MONGO_DB_URL;

const Listing = require("./models/listing.js");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// It helps in creating templates
const ejsMate = require("ejs-mate");
app.engine('ejs',ejsMate);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));

app.use(express.static(path.join(__dirname,"/public")));

const wrapAsync = require("./utilis/wrapAsync.js");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js")

const ExpressError = require("./utilis/ExpressError.js");
// from this we are getting router object
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");

const userRouter = require("./routes/user.js");

/* we are creating this bcz we are given coditions to all
attributes of form whether that is required or not in one schema
using joi package */
const{listingSchema,reviewSchema} = require("./schema.js");

const Review = require("./models/review.js");


const session = require("express-session");
const sessionOptions = {
     secret : "mysupersecretcode",
     resave : false,
     saveUninitialized : true,
     cookie:{
        expires : Date.now() + 7 * 24 * 60 * 60 * 1000, // millisecond
        maxAge : 7 * 24 * 60 * 60 * 1000,
        httpOnly : true
     },
};
app.use(session(sessionOptions));

const flash = require("connect-flash");

app.use(flash());

// A middleware that initializes passport
app.use(passport.initialize());

/* A web application needs the ability to indentify users as they browse from page to
   page. this series of requests and responses, each associated with the 
   same user, is known as session.
*/
app.use(passport.session());

// authenticate() generates a fxn that is used in passports localstrategy.
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
// serializeUser()  Genereates a fxn that is used by passport to serialize users into the session.
// deserializeUser() Generates a fxn that is used by passport to deserialize users into the session.
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// we are using pbkf2 hashing alogorithm

// access the flash message here 
app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demouser",async(req,res)=>{
//     let fakeUser = new User({
//         email : "student@gmail.com",
//         username : "delta-student"
//     });
//     // register(user,passport,callback) convencience method to register a new user instance with a given password. Checks if username is unique. 
//      let registeredUser = await User.register(fakeUser,"helloworld");
//      res.send(registeredUser);

// })

// here we are using external router apis
app.use("/listings",listingRouter);
app.use("/listings/:id/reviews",reviewRouter);
app.use("/",userRouter);

main()
.then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
  await mongoose.connect(MONGO_URL);
}

// app.get("/",(req,res)=>{
//     console.log("Hi, I am root");
// })
app.listen(8080,()=>{
    console.log("Server is listening to port 8080")
});

// app.get("/testListing",async(req,res)=>{
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description : "By the beach",
//         price : 1200,
//         location : "Calangute,Goa",
//         country : "India",
//     });
//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send("Successfull Testing");
// })


// Reviews


// Error Handling Middleware

// app.use((err,req,res,next) =>{
//     res.send("something went wrong");
// })

// when by express error
// if there is no any rout that the use is searching then 
// to print this page is not or something else we use this
app.all('*',(req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
})

app.use((err,req,res,next)=>{
    let {statusCode = 500,message="Something went wrong!"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("error.ejs",{err});
});
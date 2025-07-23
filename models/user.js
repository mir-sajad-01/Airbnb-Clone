/*

Authentication :> Authentication is the process of verifying who someone is.

Authorization :> Authorization is the process of verifying what specific
applications, files,and data a user has access to.

String password :> We never store the passwords as it is. we store their
hashed form.

Hashing :
a. for every input, there is a fixed output
b. they are one-way functions, we cant get input from output
c. for a different input, there is a different output but of same length 
d. small changes in input should bring large changes in output.

Salting :> Password salting is a technique to protect passwords stored in
databases by adding a string of 32 or more characters and then hashing them.

e.g abc = abc%?@   %?@ this is salting.

Passport :>  is express compatible authentication middleware
for nodejs
*/


const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* 
you're free to define your user how you like. Passport-local mongoose will add
a username, hash and salt field to store the username,the hashed password and
the salt value.
*/
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{
        type : String,
        required: true
    }
    // username and passport will define passport-local-mogoose automatically.
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);
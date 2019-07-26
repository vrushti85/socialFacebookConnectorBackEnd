var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    providerId: String,
    name: String,
    email:String,
    image: String,
    dateOfBirth:String,
    city:String,
    provider: String,
    idToken: String,
    token: String
});
var User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
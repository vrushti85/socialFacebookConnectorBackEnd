var mongoose = require("mongoose");
var userSchema = new mongoose.Schema({
    id: Number,
    name: String,
    email:String,
    image: String,
    provider: String,
    idToken: String,
    token: String
});
var User = mongoose.model("User", userSchema);
module.exports = mongoose.model("User", userSchema);
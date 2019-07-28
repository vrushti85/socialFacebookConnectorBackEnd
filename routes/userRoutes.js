var User = require("../model/User");
var upload = require("../helper/multer.config");
var express = require("express");
const router=express.Router();
router.post("/api/addDataFromProvider", (req, res) => {

    var providerId = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var image = req.body.image;
    var provider = req.body.provider;
    var idToken = req.body.idToken;
    var token = req.body.token;
    var newUser = { providerId: providerId, name: name, email: email, image: image, provider: provider, idToken: idToken, token: token };
  
    User.findOne({ providerId: providerId }, (err, data) => {
      if (err) {
        console.log(err);
      } else {
        if (!data) {
          User.create(newUser, function (err, newlyCreatedUser) {
            if (err) {
              console.log(err);
            } else {
              res.send("data inserted syucceesfully");
            }
          });
        }
        res.status(200).json({ msg: 'From SAme Username Login Done' });
      }
    });
  }
  );
  
  router.get("/api/editprofile/:providerId", (req, res) => {
    // console.log(req.params);
    var providerId = req.params.providerId;
    console.log("====================>>>>>>>", providerId)
    User.findOne({ providerId: providerId }, (err, profileData) => {
      if (err) {
        res.send(err);
      } else {
        console.log(profileData)
        res.json(profileData);
      }
    });
  });
  router.put("/api/storeEditProfileData", (req, res) => {
  
    var image = req.body.updatedUser.image;
    var name = req.body.updatedUser.name;
    var email = req.body.updatedUser.email;
    var dateOfBirth = req.body.updatedUser.dateOfBirth;
    var city = req.body.updatedUser.city;
    var Id = req.body.updatedUser.Id;
  
    var updatedData = {image:image, name:name, email:email, dateOfBirth:dateOfBirth, city:city, _id:Id}
  
     User.findByIdAndUpdate({ _id: Id }, { $set: updatedData }, (err, datas) => {
      if (err) {
        console.log(err,"errrr");
      } else {
        console.log("updateddata:", datas);
        res.send(datas);
      }
    });
  });
  module.exports=router;
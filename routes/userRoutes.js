var User = require("../model/User");
var upload = require("../helper/multer.config");
var express = require("express");
const router = express.Router();

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
      res.status(404);
    } else {
      if (!data) {
        User.create(newUser, function (err, newlyCreatedUser) {
          if (err) {
            res.status(404);
          } else {
            res.status(100).send("Data inserted succesfully");
          }
        });
      }
      res.status(200).json('From Same Username Login Done');
    }
  });
}
);

router.get("/api/editprofile/:providerId", (req, res) => {
  var providerId = req.params.providerId;
  User.findOne({ providerId: providerId }, (err, profileData) => {
    if (err) {
      res.status(500).send("Server Error");
    } else {
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

  var updatedData = { image: image, name: name, email: email, dateOfBirth: dateOfBirth, city: city, _id: Id }
  User.findByIdAndUpdate({ _id: Id }, { $set: updatedData }, (err, datas) => {
    if (err) {
      res.status(304).send("Failed to Update your Profile");
    } else {
      res.send(datas);
    }
  });
});
module.exports = router;
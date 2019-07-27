var express = require("express");
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/facebookSocialCoonector", { useNewUrlParser: true });
bodyParser = require('body-parser');
var User = require("./model/User");
var app = express();
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.json())
const cors = require('cors')

var corsOptions = {
  origin: 'https://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.send("successfully connected");
});
// var providerId;

app.post("/api/resData", (req, res) => {

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

app.get("/api/fetchPprofileEdit/:providerId", (req, res) => {
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
app.put("/api/storeEditedData", (req, res) => {
  var updatedData = req.body;
  console.log("check", updatedData);
  var Id = updatedData.updatedUser.Id;
  console.log("check providerIderrrrrrrrrrrrrrrrrrrrrrr", Id);
  User.findByIdAndUpdate({ _id: Id }, { $set: updatedData }, (err, datas) => {
    if (err) {
      console.log(err,"errrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
    } else {
      console.log("updatedDataaaaaaaaaaaaaaaaaaaaaaaa:", datas);
      res.send(datas);
    }
  });
});

const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("server started on 5000 port");
});
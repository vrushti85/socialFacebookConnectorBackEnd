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
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

app.get("/", (req, res) => {
  res.render("show");
});

app.post("/api/resData", (req, res) => {

  var id = req.body.id;
  var name = req.body.name;
  var email = req.body.email;
  var image = req.body.image;
  var provider = req.body.provider;
  var idToken = req.body.idToken;
  var token = req.body.token;
  var newUser = { id: id, name: name, email: email, image: image, provider: provider, idToken: idToken, token: token };

  User.findOne({ id: id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      if (!data) {
        User.create(newUser, function (err, newlyCreatedUser) {
          if (err) {
            console.log(err);
          } else {
            console.log(newlyCreatedUser);
            res.send("data inserted syucceesfully");
          }
        });
      }
      res.status(200).json({ msg: 'From SAme Username Login Done' });
    }
  });
}
);
const port = process.env.port || 2000;
app.listen(port, () => {
  console.log("server started on 2000 port");
});
var express = require("express");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/facebookSocialCoonector", { useNewUrlParser: true });
bodyParser = require('body-parser');
var app = express();

const cors = require('cors')
const router=require("./routes/userRoutes")
var corsOptions = {
  origin: 'https://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(bodyParser.json())
app.use(router)

app.get("/", (req, res) => {
  res.send("successfully connected");
});
// var providerId;



const port = process.env.port || 5000;
app.listen(port, () => {
  console.log("server started on 5000 port");
});
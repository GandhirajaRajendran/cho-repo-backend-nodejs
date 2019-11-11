const express= require("express");
const path = require("path");
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const multergridfsstorage = require("multer-gridfs-storage");
const gridfsstream = require("gridfs-stream");
const methodoverride = require("method-override");
const config = require('./DB');
const cors = require("cors")
const route=require('./routes/repo.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);




const app = express();
app.use(bodyparser.json());
//app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use('/interface', route);
const port = process.env.PORT || 4000;



// app.all("/*", function(req, res, next){
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
//   next();
// });

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});
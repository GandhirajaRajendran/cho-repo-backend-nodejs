const express=require("express");
const app =express();
const appRoute= express.Router();
const upload= require('./multer.config')
let Repo = require("./repo");
var fs = require('fs');

//Defined store route
appRoute.route('/add').post(upload.single("photo"), function (req, res) {

  console.log(req.body);

console.log(req.file)

   const repo = new Repo({

    interface_name: req.body.interface_name,
    developed_by: req.body.developed_by,
    file1: fs.readFileSync(req.file.path),
    file1location: req.file.path,
    file1name: req.file.filename
   
   });
console.log(repo);
 repo.save()
    .then(data => {
      res.status(200).json({'repo': 'repo added successfully'});
  
    console.log(data);
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});



// Defined get data(index or listing) route
appRoute.route('/').get(function (req, res) {
    Repo.find(function (err, repos){
    if(err){
      console.log(err);
    }
    else {
      res.json(repos);
    }
  });
});

appRoute.route('/delete/:id').get(function (req, res) {
    Repo.findByIdAndRemove({_id: req.params.id}, function(err, repo){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});


appRoute.route('/file/:filename').get(function (req, res) {

res.download( __dirname  + '/uploads/'+ req.params.filename);

});

module.exports = appRoute;
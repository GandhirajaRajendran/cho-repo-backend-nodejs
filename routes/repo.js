const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Define collection and schema for Business
let repo = new Schema({
  interface_name: {
    type: String
  },
  developed_by: {
    type: String
  }
,
file1: 
  { data: Buffer,
  content_type: String}
,

file1location: {
  type: String
 }
 ,
file1name: {
  type: String
 }
}

,{
    collection: 'repo'
});

module.exports = mongoose.model('repo', repo);
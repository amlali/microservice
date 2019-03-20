const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Book = new Schema({
  author: {type:String},
  title: {type:String},
  description:{type:String}
});

Book.methods.createBook=function(book){
   this.author=book.author
   this.title=book.title
   this.description=book.description
}
module.exports=mongoose.model('Book', Book);
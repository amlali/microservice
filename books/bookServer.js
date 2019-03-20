const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/books',{ useNewUrlParser: true });
var express=require('express')
var bodyParser=require('body-parser')
var Book=require('./book');
let app=express()
app.use(bodyParser.json());

app.post('/add/book',(req,res)=>{
    let obj={
            author:req.body.author,
            title:req.body.title,
            description:req.body.description
    }
    let book=new Book();
    book.createBook(obj);
    book.save()
    res.json(book);

})


app.get('/books',(req,res)=>{
    
    Book.find().exec(function(err,books){
        if(books){
            res.json(books)
        }
        else{
            res.json({error:'no data found'});
        }
    })

})
app.get('/book/:id',(req,res)=>{
    
    let id=req.params.id;
    Book.findOne({_id:mongoose.Types.ObjectId(id)}).exec(function(err,book){
        if(book){
            res.json(book)
        }
        else{
            res.status(404).json({error:'not found'});
        }
    })

})
app.listen(3001,()=>{
    console.log('connecting port 3001');
    
});

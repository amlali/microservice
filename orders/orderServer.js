const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/orders',{ useNewUrlParser: true });

var express=require('express')
var bodyParser=require('body-parser')
var Order=require('./order');
var axios=require('axios')
let app=express()
app.use(bodyParser.json());

app.post('/add/order',(req,res)=>{
    let obj={
        book:req.body.book,
        customer:req.body.customer,
        title:req.body.title
    }
    let order=new Order();
    order.createOrder(obj);
    order.save()
    res.json(order);

})


app.get('/orders',(req,res)=>{
    
    Order.find().exec(function(err,orders){
        if(orders){
            res.json(orders)
        }
        else{
            res.json({error:'no data found'});
        }
    })

})
app.get('/order/:id',(req,res)=>{
    
    let id=req.params.id;
    console.log(id);
    
    Order.findOne({_id:mongoose.Types.ObjectId(id)}).exec(function(err,order){
        if(order){
            console.log(order);
            
            axios.get('http://localhost:3001/book/'+order.book).then((book)=>{
                if(book){
                    console.log(book.data);
            
                    axios.get('http://localhost:3002/customer/'+order.customer).then((customer)=>{
                        res.json({order:order.title,customer:customer.data.name,book:book.data.title})
                    })
                }

               
            }).catch((e)=>{ res.status(404).json({error:'error'});})
            //console.log(order);
            
        }
        else{
            res.status(404).json({error:'not found'});
        }
    })

})
app.listen(3000,()=>{
    console.log('connecting port 3000');
    
});

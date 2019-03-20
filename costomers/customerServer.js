const mongoose = require('mongoose');
 
mongoose.connect('mongodb://localhost:27017/customer',{ useNewUrlParser: true });

var express=require('express')
var bodyParser=require('body-parser')
var Customer=require('./customer');
let app=express()
app.use(bodyParser.json());

app.post('/add/customer',(req,res)=>{
    let obj={
            name:req.body.name,
            age:req.body.age,
            email:req.body.email
    }
    let customer=new Customer();
    customer.createCustomer(obj);
    customer.save()
    res.json(customer);

})


app.get('/customers',(req,res)=>{
    
    Customer.find().exec(function(err,customers){
        if(customers){
            res.json(customers)
        }
        else{
            res.json({error:'no data found'});
        }
    })

})
app.get('/customer/:id',(req,res)=>{
    
    let id=req.params.id;
    Customer.findOne({_id:mongoose.Types.ObjectId(id)}).exec(function(err,customer){
        if(customer){
            res.json(customer)
        }
        else{
            res.status(404).json({error:'not found'});
        }
    })

})
app.listen(3002,()=>{
    console.log('connecting port 3002');
    
});

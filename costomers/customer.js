const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Customer = new Schema({
  name: {type:String},
  age: {type:Number},
  email:{type:String}
});

Customer.methods.createCustomer=function(customer){
   this.name=customer.name
   this.age=customer.age
   this.email=customer.email
}
module.exports=mongoose.model('Customer', Customer);
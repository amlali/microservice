const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Order = new Schema({
    book: {type:mongoose.Schema.Types.ObjectId},
    customer: {type:mongoose.Schema.Types.ObjectId},
    title:{type:String}
});

Order.methods.createOrder=function(order){
   this.book=order.book
   this.customer=order.customer
   this.title=order.title
}
module.exports=mongoose.model('Order', Order);
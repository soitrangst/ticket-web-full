const mongoose = require('mongoose');

const {ObjectId} = mongoose.Schema.Types

const OrderSchema = mongoose.Schema({
    movie: {
        type: String,
        required: true
    },
    customerName:{
        type:String,
        required: true
    },
    customerEmail:{
        type:String,
        required: true
    },
    hall:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    tickets:[{type:ObjectId,ref:"Ticket"}],
    createAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Order', OrderSchema)
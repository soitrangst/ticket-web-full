const mongoose = require('mongoose');

const TicketSchema = mongoose.Schema({
    zone: {
        type: String,
        required: true
    },
    loc:{
        type:String,
        required: true
    },
    price:{
        type:String,
        required: true
    },
    name:{
        type:String,
        required: true
    },
    date:{
        type:String,
        required: true
    },
    code:{
        type:String,
        required: true
    },
    used:{
        type:Boolean,
        default:false
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date
    }
})

module.exports = mongoose.model('Ticket', TicketSchema)
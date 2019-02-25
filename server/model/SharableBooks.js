const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SharableBooksSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    room_no:{
        type:Number,
        required:true
    },
    book_name:{
        type:String,
        required:true
    }
})

module.exports = SharableBooks = mongoose.model('SharableBooks',SharableBooksSchema)
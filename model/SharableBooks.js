const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SharableBooksSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  room_no: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  book_name: {
    type: String,
    required: true
  },
  author: {
    type: String
  },
  desciption: {
    type: String
  },
  like:{
    type:Number,
    default: 0
  },
  dislike:{
    type:Number,
    default: 0
  },
  requested:[]
});

module.exports = SharableBooks = mongoose.model(
  "SharableBooks",
  SharableBooksSchema
);

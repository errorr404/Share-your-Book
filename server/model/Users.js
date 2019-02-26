const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema ({
  name: {
    type: String,
    required:true
  },
  email: {
    type: String,
    required: true
  },
  room_no:{
    type:Number,
    required:true
  },
  password: {
    type: String,
    required: true
  },
  myrequestedbook:[]
})

// var User = mongoose.model('User', UserSchema)
module.exports = User = mongoose.model('User', UserSchema)

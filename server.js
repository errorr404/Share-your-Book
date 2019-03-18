const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors  = require('cors')


const routes = require('./routes')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/bookData',({useNewUrlParser:true})).then(()=>console.log('connected to mongodb'))
                                                                                .catch((err)=>console.log(err))

app.use('/',routes)
// app.get('/',(req,res)=>{
//     res.send('hello world')
// })

// route for register

var port = process.env.PORT || 5000
app.listen(port,()=>console.log('server is up'))
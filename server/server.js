const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors  = require('cors')
var SharableBooks = require('./model/SharableBooks')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json

app.use(bodyParser.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/bookData',({useNewUrlParser:true})).then(()=>console.log('connected to mongodb'))
                                                                                .catch((err)=>console.log(err))

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/postbook',(req,res)=>{
    console.log(req.body)
    var data = {
        name:req.body.name,
        room_no:req.body.room_no,
        book_name:req.body.book_name
    }
    console.log(data)

    SharableBooks.findOne({name:req.body.name,room_no:req.body.room_no,book_name:req.body.book_name})
                .then(name=>{
                    if(name){
                        return res.status(201).send({"message":"data already exist"})
                    }else{
                        console.log('save details')
                        var book = new SharableBooks(data)
                        book.save()
                            .then((save_res)=>{
                                if(save_res){
                                    SharableBooks.find().then(books=>{
                                        res.status(200).send({"message":"saved successfully","data":books})
                                    })
                                    
                                }
                                else res.status(500).send({"message":"error while saving"})
                            }).catch(err=>console.log(err))
                    }
                })
    // res.send('hwllo world')
})

app.get('/getbooks',(req,res)=>{
    SharableBooks.find()
                .then(books=>{
                    if(books){
                         res.status(200).send(books)
                    }
                    else{
                        res.status(503).send({"message":"No data found"})
                    }
                })
})

app.listen(5000,()=>console.log('server is up'))
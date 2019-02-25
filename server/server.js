const express = require('express')
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors  = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

var SharableBooks = require('./model/SharableBooks')
var User = require('./model/Users')

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

// route for register
app.post('/register',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user_res=>{
            if(user_res){
                return res.status(409).send({"message":"user already exist"})
            }
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(req.body.password, salt);
            var password = hash;
            var payload = {
                name:req.body.name,
                email:req.body.email,
                room_no:req.body.room_no,
                password:password
            }
            var user = new User(payload)
            user.save()
                .then(user_back=>{
                    if(user_back){
                        res.status(200).send({"message":"successfully registred"})
                    }
                    else res.status(500).send({"message":"error while registring"})
                }).catch(err=>console.log(err))
        }).catch(err=>console.log(err))
})

// route for login 

app.post('/login',(req,res)=>{
    console.log(req.body)
    User.findOne({email:req.body.email})
        .then(user_res=>{
            if(user_res){
                // check the password
                if(bcrypt.compareSync(req.body.password,user_res.password)){
                    // console.log(user_res)
                    res.status(200).send({"id":user_res._id})
                }
                else{
                    res.status(401).send({"message":"username password incorrect"})
                }
            }
            else{
                res.status(404).send({"message":"email id is not registred"})
            }
        })
})

// get the current profile

app.get('/me',(req,res)=>{
    var _id=req.body.id
    User.findById(_id)
        .then(user_res=>{
            if(user_res){
                res.status(200).send({"name":user_res.name,"room_no":user_res.room_no,"email":user_res.email})
            }
            else{
                res.send({"message":"invalid token"})
            }
        }).catch(err=>console.log(err))
})


app.post('/postbook',(req,res)=>{
    console.log(req.body)
    var data = {
        name:req.body.name,
        email:req.body.room_no,
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
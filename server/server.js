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
                    var token =  jwt.sign({email:user_res.email,id:user_res._id},'abc123')
                    res.status(200).send(token)
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
    // console.log(req.query.id)
    var decoded = jwt.verify(req.query.id, 'abc123');
    var _id=decoded.id
    
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
        room_no:req.body.room_no,
        email:req.body.email,
        book_name:req.body.book_name,
        author:req.body.author,
        desciption: req.body.desciption
    }
    console.log(data)

    SharableBooks.findOne({email:req.body.email,room_no:req.body.room_no,book_name:req.body.book_name})
                .then(name=>{
                    if(name){
                        return res.status(201).send({"message":"data already exist"})
                    }else{
                        console.log('save details',data)
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

app.get('/getmybook',(req,res)=>{
    console.log(req.query.email)
    SharableBooks.find({email:req.query.email})
                .then(book=>{
                    if(book){
                        res.status(200).send(book)
                    }
                    else{
                        res.status(203).send({"message":"no data found"})
                    }
                }).catch(err=>console.log(err))
})

app.get('/getbooks',(req,res)=>{
    SharableBooks.find()
                .then(books=>{
                    if(books.length>0){
                         res.status(200).send(books)
                    }
                    else{
                        res.status(503).send({"message":"No data found"})
                    }
                })
})

app.put('/like',(req,res)=>{
    var _id = req.body.id
    var liked
    SharableBooks.findById(_id).then(book=>{
        if(book){
            liked = book
            var current = liked.like+1;
            liked.like = current
            console.log('liked in book ',liked)
            SharableBooks.findByIdAndUpdate(_id,{ $set:liked}).then(book=>{
                res.status(200).send({"message":"updated"})
            })
        // console.log(like)
        }
        else res.status(500).send({"message":"internal server error"})
        
    })
    
})

app.put('/dislike',(req,res)=>{
    var _id = req.body.id
    var liked
    SharableBooks.findById(_id).then(book=>{
        if(book){
            disliked = book
            var current = disliked.dislike+1;
            disliked.dislike = current
            console.log('disliked in book ',disliked)
            SharableBooks.findByIdAndUpdate(_id,{ $set:disliked}).then(book=>{
                // console.log(book)
                res.status(200).send({"message":"updated"})
            })
        // console.log(like)
        }
        else res.status(500).send({"message":"internal server error"})
        
    })
    
})

app.put('/request',(req,res)=>{
    var _id = req.body.id
    var user
    SharableBooks.findById(_id).then(book=>{
        console.log(book.requested)
        if(book){
            let obj = book.requested.find(o => o.email === req.body.email);
            if(obj)
            {
                return res.status(203).send({"message":"already requested"})
            }
            // user = book
            // var current = user.requested;
            
            // current.push(req.body.email)
            // var requested = current
            // console.log('disliked in book ',requested)
            SharableBooks.findByIdAndUpdate(_id,{ $push:{"requested":{"email":req.body.email,"isAccepted":false}}}).then(book=>{
                // console.log(book)
                res.status(200).send(book)
                User.findOneAndUpdate({"email":req.body.email},{$push:{"myrequestedbook":{"book_name":book.book_name}}}).then(user=>{
                    console.log('')
                })
            }).catch(err=>console.log(err))
        // console.log(like)
        }
        else res.status(500).send({"message":"internal server error"})
        
    })

})

app.listen(5000,()=>console.log('server is up'))
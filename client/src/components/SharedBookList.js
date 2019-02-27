import React from 'react'
import axios from 'axios'
import { Button,Card } from 'react-bootstrap';
class SharedBookList extends React.Component{
    constructor(){
        super()
        this.state = {
          books:[],
          currentEmail:""
        }
      }
      handleRequest = id=>{
        axios.put('http://localhost:5000/request',{
          id:id,
          email:this.state.currentEmail
        }).then(res=>{
          if(res.status===203){
            alert('Already requested!')
          }else{
            alert('request submitted')
          }
        }).catch(err=>console.log(err))
      }
      handleLike = (id )=>{
        // e.preventDefault()
          console.log(id)
          axios.put('http://localhost:5000/like',{
            id:id
          }).then(res=>{
            if(res){
              axios.get('http://localhost:5000/getbooks').then(res=>{
                var books = res.data
                // console.log(books)
                this.setState({books:books})
                // console.log(res.data)
              })
            }
          }).catch(err=>console.log(err))
      }
      handleDislike = (id )=>{
        // e.preventDefault()
        console.log(id)
        axios.put('http://localhost:5000/dislike',{
          id:id
        }).then(res=>{
          if(res){
            axios.get('http://localhost:5000/getbooks').then(res=>{
              var books = res.data
              // console.log(books)
              this.setState({books:books})
              // console.log(res.data)
            })
          }
        }).catch(err=>console.log(err))
      }
      componentDidMount(){
        axios.get('http://localhost:5000/getbooks').then(res=>{
          var books = res.data
          // console.log(books)
          this.setState({books:books})
          // console.log(res.data)
        })
        var id = localStorage.getItem('token')
        axios.get('http://localhost:5000/me',{
          params: {
            id:id
          }
        }).then(res=>{
        this.setState({currentEmail:res.data.email})
        }).catch(err=>console.log(err))
      }
    render(){
        console.log(this.state)
        return(
          <div className="row" style={{padding:"10px"}}>
          <div className="col-lg-6 col-lg-offset-3 text-center">
                {
                  this.state.books.length===0?<h5>No book in the list, share the book now</h5>:
                    this.state.books.map((book,idx)=>{
                        return <Card style={{ width: '30rem' }} key={idx}>
                        <Card.Img variant="top" src="book.png" />
                        <Card.Body>
                          <div className="container">
                            <div className="row">
                            <Card.Title className="col-6">Book Name:</Card.Title>
                            <Card.Title className="col-6">{book.book_name}</Card.Title>
                            </div>
                          </div>
                          <div className="container">
                            <div className="row">
                            <Card.Title className="col-6">Author Name:</Card.Title>
                            <Card.Title className="col-6">{book.author}</Card.Title>
                            </div>
                          </div>   
                         
                          <div className="container">
                            <div className="row">
                            <Card.Title className="col-6">Owner:</Card.Title>
                            <Card.Title className="col-6">{book.name}   ({book.room_no})</Card.Title>
                            </div>
                          </div>
                          <div>
                            <Card.Title className="col-6">About Book:</Card.Title>
                          <Card.Text className="col-12">
                           {book.desciption}
                          </Card.Text>
                          </div>
                          
                          <div className="container">
                          <div className="row">
                          <div className="col-6">
                          <i className="far fa-thumbs-up" onClick={e=>this.handleLike(book._id)}/>
                          <Card.Text> {book.like}</Card.Text>
                          </div>
                          <div className="col-6">
                          <i className="far fa-thumbs-down " onClick={e=>this.handleDislike(book._id)}></i>
                          <Card.Text> {book.dislike}</Card.Text>
                          </div>
                          </div>
                          </div>
                          {
                            this.state.currentEmail===book.email?'':
                            <Button variant="primary"  onClick={e=>this.handleRequest(book._id)}>Request the book</Button>
                          }
                          
                        </Card.Body>
                      
                      </Card>
                    })
                }
            </div>
            </div>
        )
    }
}

export default SharedBookList
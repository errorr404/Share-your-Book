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
              alert('thanks for liking the post')
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
            alert('thanks for disliking the post')
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
            <div>
                {
                    this.state.books.map((book,idx)=>{
                        return <Card style={{ width: '18rem' }} key={idx}>
                        <Card.Img variant="top" src="book.png" />
                        <Card.Body>
                          <Card.Title>{book.book_name}</Card.Title>
                          <Card.Text> {book.author}</Card.Text>    
                          <Card.Text>
                           {book.desciption}
                          </Card.Text>
                          <Card.Title>Owner-{book.name}   ({book.room_no})</Card.Title>
                          
                          <i className="far fa-thumbs-up" onClick={e=>this.handleLike(book._id)}/>
                          <Card.Text> {book.like}</Card.Text>
                          <i className="far fa-thumbs-down" onClick={e=>this.handleDislike(book._id)}></i>
                          <Card.Text> {book.dislike}</Card.Text>
                          
                          <Button variant="primary" disabled={this.state.currentEmail===book.email?true:false} onClick={e=>this.handleRequest(book._id)}>Request the book</Button>
                        </Card.Body>
                      
                      </Card>
                    })
                }
            </div>
        )
    }
}

export default SharedBookList
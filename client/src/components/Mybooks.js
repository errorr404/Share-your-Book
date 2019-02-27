import React from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';
class Mybooks extends React.Component {
    constructor(){
        super()
        this.state={
            books:[]
        }
    }
    handleAcceptRequest = (id,email)=>{
        axios.put('http://localhost:5000/updatebookrequest',{
            id:id,
            isAccept:true,
            email:email
        }).then(res=>{
            console.log(res.data)
            axios.get('http://localhost:5000/getmybook',{
                params: {
                  email:localStorage.getItem('email')
                }
              }).then(res=>{
                this.setState({books:res.data})
               })
        }).catch(err=>console.log(err))
    }

    handleRejectRequest = (id,email) =>{
        axios.put('http://localhost:5000/updatebookrequest',{
            id:id,
            isAccept:false,
            email:email
        }).then(res=>{
            console.log(res.data)
            axios.get('http://localhost:5000/getmybook',{
                params: {
                  email:localStorage.getItem('email')
                }
              }).then(res=>{
                this.setState({books:res.data})
               })
        }).catch(err=>console.log(err))
    }
   componentDidMount(){
       console.log('in component did mount')
       axios.get('http://localhost:5000/getmybook',{
        params: {
          email:localStorage.getItem('email')
        }
      }).then(res=>{
        this.setState({books:res.data})
       })
   }
    render(){
        console.log('in mybooks',this.state.books)
        return(
            <div style={{width:"100%",height:"500px",padding:"10px",border:"2px solid red"}}>
                {this.state.books.length===0?<h5>No data</h5>:
                    this.state.books.map(book=>{
                     return <div>
                         {
                            <div>
                                <div className="container">
                                    <div className="row">
                                    <h5 className="col-6">Book title:</h5>
                                <h5 className="col-6">{book.book_name}</h5>
                                     </div>
                                </div>
                                
                                {
                                    book.requested.length===0?<p style={{border:"1px solid black"}}>No request found</p>
                                    :
                                    book.requested.map(request=>{
                                        return <div style={{border:"1px solid black"}}> 
                                            <div className="container">
                                                <div className="row">
                                                    <h5 className="col-6">Email:</h5>
                                                    <p className="col-6">{request.email}</p>
                                                </div>
                                            </div>
                                            
                                            <div className="container">
                                                <div className="row">
                                            <Button className="col-6" variant="primary" onClick={e=>this.handleRejectRequest(book._id,request.email)} disabled={!request.isAccepted}>Reject</Button>
                                            <Button className="col-6" variant="primary" onClick={e=>this.handleAcceptRequest(book._id,request.email)} disabled={request.isAccepted}>Accept</Button>
                                            </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                         }
                         </div>
                    })
                }
            </div>
        )
    }
}


export default Mybooks
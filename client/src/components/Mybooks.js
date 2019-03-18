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
        axios.put('/updatebookrequest',{
            id:id,
            isAccept:true,
            email:email
        }).then(res=>{
            console.log(res.data)
            axios.get('/getmybook',{
                params: {
                  email:localStorage.getItem('email')
                }
              }).then(res=>{
                this.setState({books:res.data})
               })
        }).catch(err=>console.log(err))
    }

    handleRejectRequest = (id,email) =>{
        axios.put('/updatebookrequest',{
            id:id,
            isAccept:false,
            email:email
        }).then(res=>{
            console.log(res.data)
            axios.get('/getmybook',{
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
       axios.get('/getmybook',{
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
            <div style={{color:"#d39e00"}}>
                {
                    localStorage.getItem('token')?
                    <div style={{display:"flex",justifyContent:"space-around" ,alignItems:"flex-start",alignContent:"space-around",flexWrap:"wrap"}}>
                    {this.state.books.length===0?<h5>No data</h5>:
                        this.state.books.map(book=>{
                         return <div style={{border:"1px solid #fff",alignSelf:"flex-start",padding:"25px"}}>
                             {
                                <div>
                                    <div className="container">
                                        <div className="row">
                                        <h5 className="col-6">Book title:</h5>
                                    <h5 className="col-6">{book.book_name}</h5>
                                         </div>
                                    </div>
                                    
                                    {
                                        book.requested.length===0?<p style={{border:"1px solid #fff"}}>No request found</p>
                                        :
                                        book.requested.map(request=>{
                                            return <div style={{fontFamily: "'Kaushan Script', cursive", fontSize: "25px",color:"#d39e00" ,display:"flex",flexWrap:"wrap"}}> 
                                                <div className="container">
                                                    <div className="row">
                                                        <h5 className="col-6">Email:</h5>
                                                        <p className="col-6">{request.email}</p>
                                                    </div>
                                                </div>
                                                
                                                <div className="container">
                                                {
                                                        request.isAccepted==="first"?
                                                        <div className="row">
                                                   
                                                        <Button className="col-2" variant="primary"style={{float:"left",paddingLeft:"10%",textAlign:"center"}} onClick={e=>this.handleRejectRequest(book._id,request.email)} >Reject</Button>
                                                        <div className="col-8"></div>
                                                        <Button className="col-2" variant="primary" style={{float:"right",paddingRight:"10%",textAlign:"center"}} onClick={e=>this.handleAcceptRequest(book._id,request.email)}>Accept</Button>
                                                        </div>
                                                        :
                                                        request.isAccepted===true?
                                                        <h5>Accepted the request</h5>
                                                        :
                                                        <h5>Rejected the request</h5>

                                                    }
                                                   
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
                :
                <h5>Please login first</h5>
                }
            </div>
         
        )
    }
}


export default Mybooks
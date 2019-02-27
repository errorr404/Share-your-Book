import React from 'react'
import axios from 'axios'
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
        }).catch(err=>console.log(err))
    }

    handleRejectRequest = (id,email) =>{
        axios.put('http://localhost:5000/updatebookrequest',{
            id:id,
            isAccept:false,
            email:email
        }).then(res=>{
            console.log(res.data)
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
            <div>
                {
                    this.state.books.map(book=>{
                     return <div>
                         {
                            <div>
                                <h5>my books</h5>
                                <h5>{book.name}</h5>
                                {
                                    book.requested.length===0?<p>No request found</p>
                                    :
                                    book.requested.map(request=>{
                                        return <div> 
                                            <p>{request.email}</p>
                                            {
                                                request.isAccepted?<button onClick={e=>this.handleRejectRequest(book._id,request.email)}>Reject</button>:<button onClick={e=>this.handleAcceptRequest(book._id,request.email)}>Accept</button>
                                            }
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
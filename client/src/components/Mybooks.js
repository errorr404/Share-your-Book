import React from 'react'
import axios from 'axios'
class Mybooks extends React.Component {
    constructor(){
        super()
        this.state={
            books:[]
        }
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
                                <h5>{book.name}</h5>
                                {
                                    book.requested.length===0?<p>No request found</p>
                                    :
                                    book.requested.map(request=>{
                                        return <div> 
                                            <p>{request.email}</p>
                                            {
                                                request.isAccepted?<button>Reject</button>:<button>Accept</button>
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
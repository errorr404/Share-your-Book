import React from 'react'
import axios from 'axios'
class Myrequest extends React.Component {
    constructor(){
        super()
        this.state = {
            myBooks:[]
        }
    }
    componentDidMount(){
        var mycrurrentEmail=localStorage.getItem('email')
        axios.get('http://localhost:5000/getmyrequestedbook',
        {  params: {
            email:localStorage.getItem('email')
          }
        }).then(res=>{
            this.setState({myBooks:res.data})
            
            // console.log(res.data)
            // console.log('in did mount myrequest')
            var newBooks = res.data
          axios.get('http://localhost:5000/getbooks').then(result=>{
            //   console.log(result.data)
            console.log(newBooks)
            console.log('-----------------------')
            newBooks.map(mybook=>{
                
                result.data.map(book=>{
                    if(book.book_name===mybook.book_name)
                    {
                        book.requested.map(request=>{
                            if(request.email===mycrurrentEmail){
                                mybook.isAccepted=request.isAccepted
                            }
                        })
                    }
                })
            })
            console.log(newBooks)
            this.setState({mybooks:newBooks})
            
              })
          }
        )
    }
    render(){
        return(
            <div>
                {
                    localStorage.getItem('token')?
                    <div style={{border:"2px solid red"}}>
                    <div className="container">
                        <div className="row">
                            <h5 className="col-6">Book Name</h5>
                            <h5 className="col-6">Status</h5>
                        </div>
                    </div>
                       {
                           this.state.myBooks.length===0?<h5>No data</h5>:
                           this.state.myBooks.map((book,idx)=>{
                              return <div className="container">
                              <div className="row">
                               <h5 className="col-6"key={idx}>{book.book_name}</h5>
                              <p className="col-6">
                                  {book.isAccepted==="first"?<p>Pending</p>:
                                  book.isAccepted===true?<p>Accepted</p>
                                  :
                                  <p>Rejected</p>}
                              </p>
                              </div>
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

export default Myrequest
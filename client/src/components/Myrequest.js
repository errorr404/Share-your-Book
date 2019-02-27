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
                   this.state.myBooks.map((book,idx)=>{
                      return <div>
                       <p key={idx}>{book.book_name}</p>
                      <p>
                          {book.isAccepted===true?<p>Accepted</p>:<p>Pending</p>}
                      </p>
                      </div>
                   })
               }
            </div>
        )
    }
}

export default Myrequest
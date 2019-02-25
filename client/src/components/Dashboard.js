import React from 'react'
import axios from 'axios'
class Dashboard extends React.Component {
    constructor(){
        super()
        this.state = {
          name:"",
          room_no:"",
          book_name:"",
          books:[]
        }
      }
      formHandler = e =>{
        e.preventDefault();
        // axios.get('http://localhost:5000/getbooks',{ crossDomain: true }).then(res=>{
        //   console.log(res.data)
        // }).catch(err=>console.log(err))
        axios.post('http://localhost:5000/postbook',{
          name:this.state.name,
          room_no:this.state.room_no,
          book_name:this.state.book_name
        }).then(res=>{
          console.log(res)
          if(res.status===201) return alert('already exist')
          if(res.data.data){
            this.setState({books:res.data.data})
          }
        }).catch(err=>console.log(err))
      }
      componentDidMount(){
        axios.get('http://localhost:5000/getbooks').then(res=>{
          this.setState({books:res.data})
          // console.log(res.data)
        })
      }
      render() {
        console.log(this.state)
    
        return (
         <div className="container" >
           <form onSubmit={this.formHandler} style={{border:"2px solid black"}}>
             <input className="col-md-3" type="text"  placeholder="Enter the full name" onChange={(e)=>this.setState({name:e.target.value})} />
             <input  className="col-md-3" type="number" placeholder="enter the room number" onChange={(e)=>this.setState({room_no:e.target.value})}/>
             <input  className="col-md-3"type="text" placeholder="enter the title of the book" onChange={(e)=>this.setState({book_name:e.target.value})}/>
             <input  className="col-md-3"type="submit" placeholder="share!!"/>
           </form>
           <h3 className="container" style={{textAlign:"center",paddingTop:"20px"}}>Shared Books</h3>
           <div className="container" style={{marginTop:"30px"}}>
           <div className ="row" style={{border:"2px solid black"}}>
           <h5 className="col-md-4"> Name</h5>
           <h5 className="col-md-4"> Room Number</h5>
           <h5 className="col-md-4">Book Title</h5>
           </div>
          
    
           {
            this.state.books.map(book=>{
              return <div  className ="row" style={{border:"2px solid black"}}>
                <p className="col-md-4" >{book.name}</p>
                <p className="col-md-4">{book.room_no}</p>
                <p className="col-md-4">{book.book_name}</p>
              </div>
            })
          }
           </div>
          
         </div>
        );
      }
}

export default Dashboard
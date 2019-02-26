import React from 'react'
import axios from 'axios'
class ShareBook extends React.Component {
    constructor(){
        super()
        this.state ={
            book_name:"",
            author:"",
            desciption:"",
            email:"",
            name:"",
            room_no:""
        }
    }
    handleShare = e =>{
        e.preventDefault()
        axios.post('http://localhost:5000/postbook',{
            name:this.state.name,
            room_no:this.state.room_no,
            email:this.state.email,
            book_name:this.state.book_name,
            author:this.state.author,
            desciption:this.state.desciption
          }).then(res=>{
            console.log(res)
            if(res.status===201) return alert('already exist')
            if(res.data.data){
            //   this.setState({books:res.data.data})
            }
          }).catch(err=>console.log(err))
    }
    componentDidMount(){
        var id = localStorage.getItem('token')
        console.log(id)
        axios.get('http://localhost:5000/me',
        {
            params: {
              id:id
            }
          }).then(res=>{
            if(res){
                console.log('data from share book',res.data)
                this.setState({email:res.data.email,name:res.data.name,room_no:res.data.room_no})
            }
        }).catch(err=>console.log(err))
    }
    render(){
        console.log('in share book',this.state)
        return(
            <div>
                <form onSubmit={this.handleShare}>
                    <input placeholder="enter book title" onChange={e=>this.setState({book_name:e.target.value})}/>
                    <input placeholder="enter Author name" onChange={e=>this.setState({author:e.target.value})}/>
                    <textarea value={this.state.desciption} onChange={e=>this.setState({desciption:e.target.value})}/>
                    <button>Share!!</button>
                </form>
            </div>
        )
    }
}

export default ShareBook
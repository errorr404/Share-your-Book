import React from 'react'
import axios from 'axios'
import { Form,Button } from 'react-bootstrap';
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
            this.setState({
                name:'',
                room_no:'',
                email:'',
                book_name:'',
                author:'',
                desciption:''
            },()=>{
                this.props.history.push('/')
                alert('thanks for sharing the book!!')
            })
           
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
                {
                    localStorage.getItem('token')?
                    <div style={{width:"30rem"}}>
                    <Form onSubmit={this.handleShare}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Title:</Form.Label>
                            <Form.Control type="text" placeholder="Enter the tiitle of the book" value={this.state.book_name} onChange={e=>this.setState({book_name:e.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicAuthor">
                            <Form.Label>Author:</Form.Label>
                            <Form.Control type="text" placeholder="Enter the name of the Author"  value={this.state.author} onChange={e=>this.setState({author:e.target.value})}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicDesc">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="write some description"  value={this.state.desciption} onChange={e=>this.setState({desciption:e.target.value})}/>
                            <Form.Text className="text-muted">
                            Write few lines about the book :)
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                        Share with people!!
                          </Button>
                        </Form>
                </div>:
                <h5>Please login first</h5>
                }
            </div>
           
        )
    }
}

export default ShareBook
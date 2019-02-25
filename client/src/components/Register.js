import React from 'react'
import axios from 'axios'
class Register extends React.Component{
    constructor(){
        super()
        this.state= {
            email:"",
            full_name:"",
            room_no:"",
            password:"",
            confirm_password:""
        }
    }
    handleRegister = e =>{
        e.preventDefault()
        if(this.state.email&&this.state.full_name&&this.state.room_no && this.state.password && this.state.confirm_password){
            if(this.state.password === this.state.confirm_password){
                axios.post('http://localhost:5000/register',{
                    name:this.state.full_name,
                    email:this.state.email,
                    room_no:this.state.room_no,
                    password:this.state.password
                }).then(res=>{
                    console.log(res.data)
                    this.props.history.push('/')
                }).catch(err=>console.log(err))
            }
        }
    }
render(){
    return(
        <div>
            <form onSubmit={this.handleRegister}>
                <input placeholder="enter the email id" onChange={e=>this.setState({email:e.target.value})}/>
                <input placeholder="enter your full name" onChange={e=>this.setState({full_name:e.target.value})}/>
                <input placeholder="enter your Room number" onChange={e=>this.setState({room_no:e.target.value})}/>
                <input placeholder="enter the password" onChange={e=>this.setState({password:e.target.value})}/>
                <input placeholder="enter the confirm password" onChange={e=>this.setState({confirm_password:e.target.value})}/>
                <button>Register!!</button>
            </form>
        </div>
    )
}
}
export default Register
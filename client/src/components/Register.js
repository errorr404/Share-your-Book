import React from 'react'

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
        alert('register')
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
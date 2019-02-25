import React from 'react'
import axios from 'axios'
class Login extends React.Component {
    constructor(){
        super()
        this.state = {
            email:"",
            password:""
        }
    }
    handleLogin = e=>{
        e.preventDefault()
        axios.post('http://localhost:5000/login',{
            email:this.state.email,
            password:this.state.password
        }).then(res=>{
            console.log(res.data)
            localStorage.setItem('token',res.data.id)
            this.props.history.push('/')
        }).catch(err=>console.log(err))
    }
    handleAccount = e =>{
        e.preventDefault()
        this.props.history.push('/register')
    }
    render(){
        console.log(this.state)
        return(
            <div>
                <form onSubmit={this.handleLogin}>
                    <input placeholder="enter your email" type="text" onChange={(e)=>this.setState({email:e.target.value})}/>
                    <input placeholder="enter password" type="text" onChange={(e)=>this.setState({password:e.target.value})}/>
                    <button>Login!</button>
                </form>
                <p onClick={this.handleAccount}>create an account </p>
            </div>
        )
    }
}

export default Login
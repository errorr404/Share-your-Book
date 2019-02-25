import React from 'react'

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
        alert('login')
    }
    handleAccount = e =>{
        e.preventDefault()
        alert('register')
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleLogin}>
                    <input placeholder="enter your email" type="text" onChange={(e)=>this.setState({email:e.target.value})}/>
                    <input placeholder="enter password" type="text" onChange={(e)=>this.setState({username:e.target.value})}/>
                    <button>Login!</button>
                </form>
                <p onClick={this.handleAccount}>create an account </p>
            </div>
        )
    }
}

export default Login
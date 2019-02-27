import React from 'react'
import axios from 'axios'
import {Link } from "react-router-dom";
import { Form,Button } from 'react-bootstrap';
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
            localStorage.setItem('token',res.data)
            localStorage.setItem('email',this.state.email)
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
            <div style={{width:"30rem"}}>
            <Form onSubmit={this.handleLogin}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>this.setState({email:e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={(e)=>this.setState({password:e.target.value})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login!!
                </Button>
            </Form>
            <Link to="/register">Create an account!!</Link>
            </div>
        )
    }
}

export default Login
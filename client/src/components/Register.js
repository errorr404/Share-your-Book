import React from 'react'
import axios from 'axios'
import {Link } from "react-router-dom";
import { Form,Button } from 'react-bootstrap';
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
                    this.props.history.push('/login')
                }).catch(err=>console.log(err))
            }
        }
    }
render(){
    return(
        <div style={{width:"30rem"}}>
            <Form onSubmit={this.handleRegister}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" onChange={e=>this.setState({email:e.target.value})}/>
            </Form.Group>
            <Form.Group controlId="formBasicName">
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your full name" onChange={e=>this.setState({full_name:e.target.value})}/>
            </Form.Group>
            <Form.Group controlId="formBasicRoom">
                <Form.Label>Room number</Form.Label>
                <Form.Control type="number" placeholder="Enter your room number" onChange={e=>this.setState({room_no:e.target.value})}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder=" Enter your Password"  onChange={e=>this.setState({password:e.target.value})}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label> Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter your password agian"  onChange={e=>this.setState({confirm_password:e.target.value})}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create an Account!!
                </Button>
            </Form>
            <Link to="/login">Go to login page!!</Link>
        </div>
    )
}
}
export default Register
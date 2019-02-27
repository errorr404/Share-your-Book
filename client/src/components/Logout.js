import React from 'react'
import { Button } from 'react-bootstrap';
class Logout extends React.Component{
    constructor(props){
        super(props)
    }
    handleLogut = e =>{
        e.preventDefault()
        console.log('in logout')
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        this.props.prop.props.history.push('/login')
        
    }
    render(){
        console.log()
        return(
            <Button variant="primary" onClick={this.handleLogut}>
            <i className="fas fa-sign-out-alt"></i>
            </Button>
        )
    }
}

export default Logout
import React from 'react'
import {Link} from "react-router-dom";
import {Navbar,Nav,FormControl,Button,Form, NavItem } from 'react-bootstrap'

import ShareBook from './ShareBook'
import SharedBookList from './SharedBookList'
import Mybooks from './Mybooks'
import Myrequest from './Myrequest'
import Logout from './Logout'
class Dashboard extends React.Component {
   
      render() {
        var loggedin 
        if(localStorage.getItem('token'))
        {
          loggedin=true
        }
        else loggedin=false
        return (
          // <div>
          //   {
          //     loggedin===false?
          //     <div>
          //     <h5>Please login first</h5>
          //     <Link to="/login">Click here for login</Link>
          //     </div>
          //     :
          //     <div >
          //     <div style={{float:"right"}}>
          //      <Logout prop={this}/>
          //     </div>
          //     <h1>Share your Book</h1>
          //     <ShareBook/>
          //     <div className="row">      
          //     <SharedBookList className="col-6"/> 
          //     <div className="col-6">
          //     <Mybooks />
          //     <Myrequest />
          //     </div>
                   
          //     </div> 
              
          //   </div>
          //   }
          // </div>
          <div>
              <Navbar bg="light" variant="light" fixed="top">
    <Navbar.Brand className="mr-auto">
    <i className="fas fa-book-open"> Book World</i>
    </Navbar.Brand>
    {/* <Nav className="mr-auto">
      <Nav.Link href="booklist">Shared Book</Nav.Link>
      <Nav.Link href="sharebook">Share Book</Nav.Link>
      <Nav.Link href="myrequested">Mybooks</Nav.Link>
      <Nav.Link href="bookrequest">Requested Books</Nav.Link>
      </Nav> */}
      <Nav className="mr-auto">
      <Link to="/booklist">
      <NavItem>
      Shared Book
      </NavItem>
      </Link>
      </Nav>
      <Nav className="mr-auto">
      <Link to="/sharebook">
      <NavItem>
      Share book
      </NavItem>
      </Link>
      </Nav>
      <Nav className="mr-auto">
      <Link to="/myrequested">
      <NavItem>
      Mybooks
      </NavItem>
      </Link>
      </Nav>
      <Nav className="mr-auto">
      <Link to="/bookrequest">
      <NavItem>
      Requested Books
      </NavItem>
      </Link>
      </Nav>
      <Nav className="mr-auto">
      {
        localStorage.getItem('token')?
        <Logout prop={this}/>:
  <Link to="/login">
  <NavItem>
  Login
  </NavItem>
  </Link>
      }
    </Nav>
  </Navbar>
  <div>
    {
      this.props.location.pathname && this.props.location.pathname==='/'&& loggedin===true?
      <SharedBookList />:
      localStorage.getItem('token')?'':
      <h5>Please login </h5>
    }
  </div>
  

          </div>
            
        )
      }
}

export default Dashboard
import React from 'react'
import {Link } from "react-router-dom";

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
          <div>
            {
              loggedin===false?
              <div>
              <h5>Please login first</h5>
              <Link to="/login">Click here for login</Link>
              </div>
              :
              <div >
              <div style={{float:"right"}}>
               <Logout prop={this}/>
              </div>
              <h1>Share your Book</h1>
              <ShareBook/>
              <div className="row">      
              <SharedBookList className="col-6"/> 
              <div className="col-6">
              <Mybooks />
              <Myrequest />
              </div>
                   
              </div> 
              
            </div>
            }
          </div>
       
            
        )
      }
}

export default Dashboard
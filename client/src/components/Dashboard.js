import React from 'react'
import ShareBook from './ShareBook'
import SharedBookList from './SharedBookList'
import Mybooks from './Mybooks'
import Myrequest from './Myrequest'
class Dashboard extends React.Component {
   
      render() {
    
        return (
         <div className="container" >
         <ShareBook className="col-md-3"/>
         <div className="row">
           <SharedBookList className="col-md-4"/> 
           <Mybooks className="col-md-4"/>      
           <Myrequest className="col-md-4"/> 
         </div>
            
         </div>
        );
      }
}

export default Dashboard
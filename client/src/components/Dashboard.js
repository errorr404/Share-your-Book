import React from 'react'
import ShareBook from './ShareBook'
import SharedBookList from './SharedBookList'
import Mybooks from './Mybooks'
class Dashboard extends React.Component {
   
      render() {
    
        return (
         <div className="container" >
           <ShareBook />
           <SharedBookList /> 
           <Mybooks />         
         </div>
        );
      }
}

export default Dashboard
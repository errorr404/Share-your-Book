import React, { Component } from 'react';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import {Switch,Route} from 'react-router-dom'
import './App.css';
import ShareBook from './components/ShareBook';
import SharedBookList from './components/SharedBookList';
import Mybooks from './components/Mybooks';
import Myrequest from './components/Myrequest';
import Logout from './components/Logout';

class App extends Component {
  render(){
    return(
      
     <div>
        <Route path="/" component ={Dashboard}/>
        <Route path="/login" component ={Login} />
        <Route path="/register" component ={Register} />
        <Route path="/sharebook" component={ShareBook} />
        <Route path="/booklist" component={SharedBookList}/>
        <Route path="/myrequested" component={Mybooks} />
        <Route path="/bookrequest" component={Myrequest}/>
        <Route path="/logout" component={Logout}/>
        </div>
)
  }
}

export default App;

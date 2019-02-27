import React, { Component } from 'react';
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import Register from './components/Register'
import {Switch,Route} from 'react-router-dom'
import './App.css';

class App extends Component {
  render(){
    return(
      
      <Switch>
        <Route path="/" component ={Dashboard} exact={true}/>
        <Route path="/login" component ={Login} />
        <Route path="/register" component ={Register} />
        <Route path="/dashboard" component ={Dashboard} />
      </Switch>
)
  }
}

export default App;

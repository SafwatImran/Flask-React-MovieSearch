import './App.css';
import Register from './components/Register'
import Header from './components/Header'
import React, {useState, useEffect} from 'react'
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './components/Home'

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <div className="container" >
    <div>
      <Header/>    
    </div>
    <h1> Welcome to my movie-search website!</h1>
    {localStorage.getItem('token')==null ?<Login />:<Home/>}
    </div>
  );
}

export default App;

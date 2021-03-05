import './App.css';
import Register from './components/Register'
import Header from './components/Header'
import React, {useState, useEffect} from 'react'
import Login from './components/Login';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Searchbar from './components/Searchbar'

function App() {
  
  const [loggedIn, setLoggedIn] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token')!=null){
      setLoggedIn(true)
    }
  },[loggedIn]);

  return (
    <Router>
    <div className="container" >
    <div>
    <h1> Welcome to my movie-search website!</h1>
      <Header login={setLoggedIn}/>    
    </div>
    <Route path = '/login' component={Login, Searchbar}>
    {loggedIn? <Searchbar/>:<Login login = {setLoggedIn}/>}
    </Route>
    </div>
    <Route path='/register' component={Register}></Route>
    </Router>
  );
}

export default App;

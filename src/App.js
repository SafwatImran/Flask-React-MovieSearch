import './App.css';
import Register from './components/Register'
import Home from './components/Home'
import Header from './components/Header'

function App() {

  return (
    <div className="container">
    <div>
      <Header/>
    </div>
    <h1> Welcome to my movie-search website!</h1>
    
    <Home/>
    </div>
  );
}

export default App;

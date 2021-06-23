// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Home from './Home';
import Register from './Register';




import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'  

function App() {

  

  const routing = (  
    <Router > 
        <div>  
          <Switch>
            <Route exact path="/" component={Home} /> 
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch> 
        </div>  
    </Router>  
  )  

  return (routing);
}

export default App;

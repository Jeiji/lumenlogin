// import logo from './logo.svg';
import './App.css';
import Login from './Login';
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Switch>
      <Route>
        <div className="App">
          <Login />
        </div>
      </Route>
      </Switch>
    </div>
  );
}

export default App;

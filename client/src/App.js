import './App.css';
import {BrowserRouter as Router,Switch,Route, Redirect} from'react-router-dom'
import Data from './components/data'
import Login from './components/login'
import Register from './components/register'
import DataList from './components/DataList'

function App() {
  const data=localStorage.getItem('user')
  let currentUser
  if(data)
  {
    currentUser=JSON.parse(data)
  }
  return (
    <Router>
        <Switch>
          <Route path='/add-post'exact><Data currentUser={currentUser}></Data></Route>
          <Route path='/login'><Login></Login></Route>
          <Route path='/home'><DataList></DataList></Route>
          <Route path='/register'><Register></Register></Route>
          {currentUser?<Redirect to='/home' ></Redirect>:<Redirect to='/login' ></Redirect>}
        </Switch>
    </Router>
  );
}

export default App;

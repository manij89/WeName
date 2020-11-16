import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';
import Game from './containers/Game';
import Profile from './containers/Profile';
import Matches from './components/Matches';
import Deck from './containers/Deck';
import Mylikes from './components/MyLikes';
import Final from './containers/Final';

function App() {
  return (

    <Switch>
      <Route
        exact
        path='/'
        component={Home}
      />
      <Route
        exact
        path='/register'
        component={Register}
      />
      <Route
        exact
        path='/login'
        component={Login}
      />
      <Route
        exact
        path='/mynames'
        component={Mylikes}
      />
      <Route
        exact
        path='/game'
        component={Game}
      />
      <Route
        exact
        path='/final'
        component={Final}
      />
      <Route
        exact
        path='/game/:gender'
        render={routeProps => (
          <>
            <Deck gender={routeProps.match.params.gender} />
          </>
        )}
      />
      <Route
        exact
        path='/profile'
        component={Profile}
      />
      <Route
        exact
        path='/matches'
        component={Matches}
      />
    </Switch>

  );
}

export default App;

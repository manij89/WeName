import './App.scss';
import { Route, Switch } from 'react-router-dom';
import Home from './containers/Home';
import Info from './containers/Info';
import Register from './containers/Register';

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
        path='/info'
        component={Info}
      />
      <Route
        exact
        path='/register'
        component={Register}
      />
    </Switch>
  );
}

export default App;

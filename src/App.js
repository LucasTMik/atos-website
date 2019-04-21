import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// import About from './pages/About';
import Home from './pages/Home';
import Welcome from './pages/Welcome';
import AcampForm from './pages/AcampForm';
import Youth from './pages/Youth';
import Admin from './pages/Admin'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path={"/"} exact={true} component={Welcome} />
          <Route path={"/ssss"} exact={true} component={Home} />
          <Route path={"/jovens"} exact={true} component={Youth} />
          <Route path={"/jovens/acamp"}  component={AcampForm} />
          <Route path={"/admin"} exact={true} component={Admin} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

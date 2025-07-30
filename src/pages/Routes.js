import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Simulacao from './Simulacao';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/simulador" component={Simulacao} />
    </Switch>
  );
}

export default Routes;

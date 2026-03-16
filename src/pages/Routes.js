import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Simulacao from './Simulacao';
import SimuladorParcelas from './SimuladorParcelas';
import SobreNos from './SobreNos';
import Seguranca from './Seguranca';
import Privacidade from './Privacidade';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/simulador/parcelas" component={SimuladorParcelas} />
      <Route exact path="/simulador" component={Simulacao} />
      <Route exact path="/sobre-nos" component={SobreNos} />
      <Route exact path="/seguranca" component={Seguranca} />
      <Route exact path="/privacidade" component={Privacidade} />
    </Switch>
  );
}

export default Routes;

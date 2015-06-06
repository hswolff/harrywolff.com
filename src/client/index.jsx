import React from 'react';
import Router from 'react-router';

import Flux from '../flux';
import FluxComponent from 'flummox/component';

import routes from '../routes';

let flux = new Flux(window.dataBootstrap);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(
    <FluxComponent flux={flux}>
      <Handler/>
    </FluxComponent>
  , document.getElementById('app'));
});

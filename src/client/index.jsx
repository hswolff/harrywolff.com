import React from 'react';
import Router from 'react-router';

import Flux from '../flux';
import FluxComponent from 'flummox/component';

import routes from '../routes';

let appEl = document.getElementById('app');

let dataBootstrap = JSON.parse(appEl.dataset.bootstrap);

let flux = new Flux(dataBootstrap);

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(
    <FluxComponent flux={flux}>
      <Handler/>
    </FluxComponent>
  , appEl);
});

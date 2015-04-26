'use strict';

const React = require('react');
const Router = require('react-router');

const { Flux } = require('../flux');
const FluxComponent = require('flummox/component');

let flux = new Flux(window.dataBootstrap);

Router.run(require('../routes'), Router.HistoryLocation, function(Handler) {
  React.render(
    <FluxComponent flux={flux}>
      <Handler/>
    </FluxComponent>
  , document.getElementById('app'));
});

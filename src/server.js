'use strict';

const Hapi = require('hapi');
const path = require('path');

const React = require('react/addons');
const Router = require('react-router');

var server = new Hapi.Server();
server.connection({
  port: 9000,
  routes: {
    state: {
      failAction: 'log'
    }
  }
});

server.views({
  engines: {
    html: require('swig')
  },
  isCached: false,
  path: path.join(__dirname, 'views'),
  partialsPath: './views/partials',
  helpersPath: './views/helpers',
  layoutPath: './views/layouts',
  relativeTo: __dirname
});

server.state('data', {
  clearInvalid: true, // remove invalid cookies
  ignoreErrors: true
});

server.route({
  method: 'GET',
  path: '/{param}.{ext}',
  handler: {
    file: function(request) {
      return path.join(__dirname, 'public', request.path);
    }
  }
});

server.route({
  method: 'GET',
  path: '/images/{param*}',
  handler: {
    file: function(request) {
      return path.join(__dirname, 'public', request.path);
    }
    // directory: {
    //   path: 'src/public/images',
    //   listing: true
    // }
  }
});

server.route({
  method: 'GET',
  path: '/{param*}',
  handler: function (request, reply) {
    // var DocumentTitle = require('react-document-title');
    // var Html   = require('./components/Html.jsx');
    Router.run(require('./routes.jsx'), request.path, function(Handler, state) {
      // var title  = DocumentTitle.rewind();
      var markup = React.renderToString(React.createElement(Handler, null));
      // var html   = React.renderToStaticMarkup(React.createElement(Html, {title: title, markup: markup}));

      reply.view('index', {
        content: markup
      });
    });
  }
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});

/**
 * Patches node's require() statement to ignore any style files (css/less).
 * This is a quick patch to allow for rendering React views that require css or
 * less via webpack to work in node.
 * @TODO: don't do this?
 */
function patchRequire() {
  var Module = require('module');
  var oldRequire = Module.prototype.require;

  Module.prototype.require = function(path) {
    // Ignore style files.
    if (path.match(/\.(c|le)ss$/)) {
      return '';
    }

    return oldRequire.apply(this, arguments);
  };
}

// Patch require.
patchRequire();
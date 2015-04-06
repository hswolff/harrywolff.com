'use strict';

const Hapi = require('hapi');
const path = require('path');

const React = require('react/addons');
const Router = require('react-router');

const server = new Hapi.Server();

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
  method: '*',
  path: '/{params*}',
  handler: {
    file: function(request) {
      return path.join(__dirname, 'public', request.path);
    }
  }
});

server.ext('onPreResponse', function(request, reply) {
  if (request.response.statusCode) {
    return reply.continue();
  }

  const DocumentTitle = require('react-document-title');
  Router.run(require('./routes'), request.path, function(Handler) {
    const markup = React.renderToString(React.createElement(Handler, null));

    reply.view('index', {
      PRODUCTION: process.env.PRODUCTION,
      title: DocumentTitle.rewind(),
      content: markup
    });
  });
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

  Module.prototype.require = function(requirePath) {
    // Ignore style files.
    if (requirePath.match(/\.(c|le)ss$/)) {
      return '';
    }

    return oldRequire.apply(this, arguments);
  };
}

// Patch require.
patchRequire();

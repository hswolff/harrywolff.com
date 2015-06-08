/**
 * Patches node's require() statement to ignore any style files (css/less).
 * This is a quick patch to allow for rendering React views that require css or
 * less via webpack to work in node.
 * @TODO: don't do this?
 */
(function patchRequire() {
  var Module = require('module');
  var oldRequire = Module.prototype.require;

  Module.prototype.require = function(requirePath) {
    // Ignore style files.
    if (requirePath.match(/\.(c|le)ss$/)) {
      return '';
    }

    return oldRequire.apply(this, arguments);
  };
})();

const Hapi = require('hapi');
const path = require('path');

const React = require('react');
const Router = require('react-router');
const DocumentTitle = require('react-document-title');
const FluxComponent = require('flummox/component');

const Flux = require('../flux');

const api = {
  blog: require('./api/blog'),
  pinboard: require('./api/pinboard')
};

const routes = require('../routes');

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 8080,
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
      return path.join(__dirname, '../public', request.path);
    }
  }
});

/**
 * Fetches all page data, wrapping it in a promise until all requests are done.
 * @return {Promise}
 */
function fetchDataBootstrap() {
  return Promise.all([
    api.blog(),
    api.pinboard()
  ]).then(values => {
    return {
      blog: values[0],
      pinboard: values[1]
    };
  });
}

/**
 * Memoize a function with a given timeout until the memoized value is removed.
 * @param  {Function} fn      Function to memoize.
 * @param  {number}   timeout Time in milliseconds until when the memoize value
 *   should be removed.
 * @return {?}        Return value of passed in function.
 */
function memoizeWithTimeout(fn, timeout) {
  var expirationTime = Date.now() + timeout;

  return function() {
    let currentTime = Date.now();
    if (currentTime >= expirationTime) {
      fn.cache = undefined;
      expirationTime = currentTime + timeout;
    }

    if (fn.cache) {
      return fn.cache;
    }

    fn.cache = fn.apply(this, arguments);

    return fn.cache;
  };
}

// Cache data for five minutes.
fetchDataBootstrap = memoizeWithTimeout(fetchDataBootstrap, 5 * 60 * 1000);

server.ext('onPreResponse', function(request, reply) {
  if (request.response.statusCode) {
    return reply.continue();
  }

  Router.run(routes, request.path, function(Handler, state) {
    if (!state.routes.length) {
      return reply.continue();
    }

    fetchDataBootstrap().then(dataBootstrap => {
      const flux = new Flux();

      flux.bootstrap(dataBootstrap);

      let content = React.renderToString(
        React.createElement(FluxComponent, {flux: flux},
          React.createElement(Handler, state)
        )
      );

      // Send view.
      reply.view('index', {
        PRODUCTION: process.env.PRODUCTION,
        title: DocumentTitle.rewind(),
        content: content,
        dataBootstrap
      });
    });
  });
});

server.start(() => {
  console.log('Server running at:', server.info.uri);
});

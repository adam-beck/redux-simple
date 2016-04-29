const Server = require('hapi').Server;
const WebpackPlugin = require('hapi-webpack-plugin');
const path = require('path');

const server = new Server();
server.connection({ port: 3000 });

server.register([require('h2o2'), require('inert'), {
  register: WebpackPlugin,
  options: path.resolve(__dirname, '../webpack/webpack.config.js')
}], error => {
  if (error) {
    return console.error(error);
  }

  server.route({
    method: '*',
    path: '/{all}',
    handler: {
      proxy: {
        host: '0.0.0.0',
        port: '3005',
        passThrough: true,
        onResponse: (err, res, request, reply, settings, ttl) => {
          if (err || res && res.statusCode === 404) {
            return reply.file(path.resolve(__dirname, '..', 'index.html'));
          }

          reply(res);
        }
      }
    }
  })

  server.start(() => console.log(`Server running at: ${server.info.uri}`));
});

const Server = require('hapi').Server;
const WebpackPlugin = require('hapi-webpack-plugin');
const path = require('path');

const server = new Server();
server.connection({ port: 3000 });

server.register([require('inert'), {
  register: WebpackPlugin,
  options: path.resolve(__dirname, '../webpack/webpack.config.js')
}], error => {
  if (error) {
    return console.error(error);
  }

  server.route({
    method: 'GET',
    path: '/{all*}',
    handler: (request, reply) => {
      reply.file(path.resolve(__dirname, '..', 'index.html'));
    }
  });

  server.start(() => console.log(`Server running at: ${server.info.uri}`));
});

'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({
  host: '0.0.0.0',
  port: '3005'
});


server.route({
  method: 'GET',
  path: '/foobar',
  handler: (request, reply) => {
    reply('works');
  }
});

server.start(err => {

  if (err) {
    throw err;
  }

  console.log(`Server running at: ${server.info.uri}`);
});

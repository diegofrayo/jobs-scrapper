// npm libs
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// our dependencies
const schema = require('./../graphql');
const mock = require('./../graphql/mocks/elempleo').getJobs;

module.exports = app => {
  app.use(bodyParser.json());

  if (ENV === 'development') {
    app.use(morgan('combined'));
  }

  app.use(
    '/graphql',
    graphqlExpress({
      schema,
      formatError: error => ({
        code: 'Error code',
        type: 'Error Type',
        message: error.message,
      }),
    }),
  );

  app.get(
    '/graphiql',
    graphiqlExpress({
      endpointURL: '/graphql',
    }),
  );

  // for testing
  app.post('/jobs', (req, res) => mock().then(results => res.send(results)));

  app.listen('7777', () => {
    console.log('express server running in port 7777...');
    console.log('graphiql: http://localhost:7777/graphiql');
  });
};

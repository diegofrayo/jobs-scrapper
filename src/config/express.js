// npm libs
const {
  graphqlExpress,
  graphiqlExpress,
} = require('apollo-server-express');
const bodyParser = require('body-parser');

// our dependencies
const schema = require('./../graphql');

module.exports = (app) => {

  app.use(bodyParser.json());

  app.use('/graphql', graphqlExpress({
    schema,
    formatError: error => ({
      code: 'Error code',
      type: 'Error Type',
      message: error.message,
    }),
  }));

  app.get('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
  }));

  app.listen('7777', () => {
    console.log('express server running in port 7777...');
  });

};

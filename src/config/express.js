// npm libs
const {
  graphqlExpress,
} = require('apollo-server-express');
const bodyParser = require('body-parser');

// our dependencies
const schema = require('./../graphql');

module.exports = (app) => {

  app.use('/graphql', bodyParser.json(), graphqlExpress({
    graphiql: true,
    schema,
    formatError: error => ({
      code: 'Error code',
      type: 'Error Type',
      message: error.message,
    }),
  }));

  app.listen('7777', () => {
    console.log('express server running in port 7777...');
  });

};

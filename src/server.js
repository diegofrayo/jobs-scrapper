const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema');

const app = express();

app.use('/graphql', expressGraphQL({
  graphiql: true,
  schema,
}));

app.listen('7777', () => {
  console.log('express server running in port 7777...');
});

exports = module.exports = app;

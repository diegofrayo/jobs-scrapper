const { makeExecutableSchema, addMockFunctionsToSchema } = require('graphql-tools');

// schemas
const rootQuery = require('./schema/RootQuery');
const jobsSchema = require('./schema/Jobs');

// resolvers
const jobsResolver = require('./resolvers/jobs');

const schema = makeExecutableSchema({
  typeDefs: [rootQuery, jobsSchema],
  resolvers: {
    Query: {
      ...jobsResolver,
    },
  },
});

addMockFunctionsToSchema({
  schema,
  preserveResolvers: true,
  mocks: {
    Job: () => ({
      title: 'Mock title',
      description: 'Mock description',
      url: 'Mock url',
    }),
  },
});

module.exports = schema;

const graphql = require('graphql');
const resolvers = require('./mocks/computrabajo');
// const graphqlUtil = require('./graphql/util');

const {
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} = graphql;

const JobType = new GraphQLObjectType({
  name: 'Job',
  fields: {
    title: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    url: {
      type: GraphQLString,
    },
  },
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    jobs: {
      type: new GraphQLList(JobType),
      resolve: () => resolvers.getJobs(),
      args: {
        query: {
          type: GraphQLString,
        },
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

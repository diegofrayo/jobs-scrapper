module.exports = `
  schema {
    query: Query
  }

  type Query {
    jobs(query: String): [Job]
  }
`;

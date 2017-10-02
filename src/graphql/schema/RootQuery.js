module.exports = `
  type Query {
    jobs(query: String): [Job]
  }
`;

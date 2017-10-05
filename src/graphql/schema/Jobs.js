module.exports = `
  type Job {
    description: String!
    pubDate: String!
    title: String!
    url: String!
    website: String!
    salary: Int @deprecated(reason: "It's not necessary")
  }
`;

module.exports = `
  type Job {
    title: String!
    url: String!
    description: String
    pubDate: String
    salary: Int @deprecated(reason: "It's not necessary")
  }
`;

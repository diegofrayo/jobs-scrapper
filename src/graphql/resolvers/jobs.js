let scrappers;

if (process.env.NODE_ENV === 'production') {
  scrappers = require('./../../scrappers/');
} else {
  scrappers = require('./../mocks/');
}

const sortByPubDate = (a, b) => {
  if (a.pubDate > b.pubDate) {
    return -1;
  } else if (a.pubDate < b.pubDate) {
    return 1;
  }
  return 0;
};

module.exports = {
  jobs: (parentValue, params) => {
    const promises = scrappers.map(resolver => resolver(params.query));

    return Promise.all(promises)
      .then(response =>
        response.reduce((acum, current) => acum.concat(current), []).sort(sortByPubDate),
      )
      .catch(error => {
        console.log('job resolver error', 'query');
        console.log(error);
        console.log('');
        return Promise.resolve([]);
      });
  },
};

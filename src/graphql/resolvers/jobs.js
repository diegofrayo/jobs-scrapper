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
    if (!params.query) return Promise.resolve([]);

    const encodedQuery = encodeURIComponent(params.query);
    const promises = scrappers.map(resolver => resolver(encodedQuery));

    return Promise.all(promises)
      .then(
        response =>
          new Promise(resolve => {
            const finalResponse = response
              .reduce((acum, current) => acum.concat(current), [])
              .sort(sortByPubDate);
            if (ENV === 'development') {
              setTimeout(() => {
                resolve(finalResponse);
              }, 1000);
            } else {
              resolve(finalResponse);
            }
          }),
      )
      .catch(error => {
        console.log('job resolver error', 'query');
        console.log(error);
        console.log('');
        return Promise.resolve([]);
      });
  },
};

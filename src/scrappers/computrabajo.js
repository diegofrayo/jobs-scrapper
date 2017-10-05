const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { formatDate, formatText } = require('./../utils/formatter');

module.exports = {
  getJobs: query => {
    const jobs = [];
    const uri = `https://www.computrabajo.com.co/ofertas-de-trabajo/?q=${query}&prov=20`;

    return fetch(uri)
      .then(res => res.text())
      .then(body => cheerio.load(body))
      .then($ => {
        $('#p_ofertas > div > div').each(function iterateElements() {
          const data = $(this);

          const title = formatText(
            data
              .children('h2')
              .text()
              .trim(),
          );

          const description = data
            .children('p')
            .text()
            .trim();

          const jobUrl = data
            .children('h2')
            .children('a')
            .attr('href');

          const pubDate = formatDate(
            data
              .find('span.dO')
              .text()
              .trim(),
          );

          if (!title || !jobUrl || !pubDate) return;

          jobs.push({
            description,
            pubDate,
            title,
            url: `https://www.computrabajo.com.co${jobUrl}`,
            website: 'computrabajo.com.co',
          });
        }, this);

        return jobs;
      })
      .catch(error => {
        console.log('computrabajo scrapper error', query);
        console.log(error);
        console.log('');
        return Promise.resolve([]);
      });
  },
};

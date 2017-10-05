const cheerio = require('cheerio');
const fetch = require('node-fetch');
const { formatDate, formatText } = require('./../utils/formatter');

module.exports = {
  getJobs: query => {
    const jobs = [];
    const uri = `http://www.elempleo.com/co/ofertas-empleo/armenia?&trabajo=${query}`;

    return fetch(uri)
      .then(res => res.text())
      .then(body => cheerio.load(body))
      .then($ => {
        $('.result-list > .result-item').each(function iterateElements() {
          const data = $(this);

          const title = formatText(
            data
              .find('.item-title')
              .find('a')
              .text()
              .trim(),
          );

          const description = 'No hay descripción';

          const jobUrl = data
            .find('.item-title')
            .find('a')
            .attr('href')
            .trim();

          const pubDate = formatDate(
            data
              .find('.info-publish-date')
              .text()
              .trim()
              .replace('Publicado ', ''),
          );

          if (!title || !jobUrl || !pubDate) return;

          jobs.push({
            description,
            pubDate,
            title,
            url: `http://www.elempleo.com${jobUrl}`,
            website: 'elempleo.com',
          });
        }, this);

        return jobs;
      })
      .catch(error => {
        console.log('elempleo scrapper error', query);
        console.log(error);
        console.log('');
        return Promise.resolve([]);
      });
  },
};

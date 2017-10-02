const cheerio = require('cheerio');
const fetch = require('node-fetch');

module.exports = {

  getJobs: (query) => {

    const jobs = [];
    const uri = `http://www.elempleo.com/co/ofertas-empleo/armenia?&trabajo=${query}`;

    return fetch(uri)
      .then(res => res.text())
      .then(body => cheerio.load(body))
      .then(($) => {

        $('.result-list > .result-item').each(function iterateElements() {

          const data = $(this);

          const title = data
            .find('.item-title')
            .find('a')
            .text()
            .trim();

          const description = 'No hay descripción';

          const jobUrl = data
            .find('.item-title')
            .find('a')
            .attr('href')
            .trim();

          if (!title || !jobUrl) return;

          jobs.push({
            title,
            description,
            url: `http://www.elempleo.com${jobUrl}`,
          });

        }, this);

        return jobs;
      })
      .catch((error) => {
        console.log('elempleo scrapper error', query);
        console.log(error);
        console.log('');
        return Promise.resolve([]);
      });

  },

};

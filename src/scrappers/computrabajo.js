const request = require('request-promise');
const cheerio = require('cheerio');

module.exports = {

  getJobs: () => {

    const jobs = [];
    const uri = 'https://www.computrabajo.com.co/ofertas-de-trabajo/?q=Inform%C3%A1tica&prov=20';
    // const uri = `https://www.computrabajo.com.co/ofertas-de-trabajo/?q=${query}&prov=20`;
    const options = {
      uri,
      transform: body => cheerio.load(body),
    };

    return request(options)
      .then(($) => {

        $('#p_ofertas > div > div').each(function iterateElements() {

          const data = $(this);

          const title = data
            .children('h2')
            .text()
            .trim();

          const description = data
            .children('p')
            .text()
            .trim();

          const jobUrl = data
            .children('h2')
            .children('a')
            .attr('href');

          jobs.push({
            title,
            description,
            url: `https://www.computrabajo.com.co${jobUrl}`,
          });

        }, this);

        return jobs;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });

  },

};

module.exports = {

  formatDate: (string) => {

    if (!string) return '';

    const date = new Date(string);
    date.setFullYear(new Date().getFullYear());

    return date.toLocaleDateString();
  },

  formatText: string => string.replace(/(\r\n|\n|\r)/gm, ' ').replace(/  +/g, ' '),

};

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Gives a pretty date from a ISO timestamp.
 * @param {number} isoTime ISOTime to make pretty.
 * @return {string} The pretty date, of a form like: 'January 1, 2015'.
 */
exports.prettyDate = function(isoTime) {
  let date = new Date(isoTime);

  return `${monthNames[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};


/**
 * Naive way to trim a string to a given number of words.
 * @param {string} str      String we're going to trim.
 * @param {number} maxWords The maximum words we want to show.
 * @return {string} The trimmed string.
 */
exports.trimString = function(str, maxWords) {
  let words = str.split(' ');
  let newWords = words.splice(0, maxWords);

  return newWords.join(' ') + '...';
};

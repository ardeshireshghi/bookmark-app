'use strict';

const ArdiSearcher = require('ardi-search');

module.exports = (searchQuery, docs, maxPageSize) => {
  const relevancySearcher = new ArdiSearcher({
    docs: docs,
    multi_match: {
      fields: {
        title: {
          boost: 10,
        },
        tags: {
          boost: 5,
        },
        description: {
          boost: 1
        }
      }
    }
  });
  return relevancySearcher.search(searchQuery, maxPageSize);
};

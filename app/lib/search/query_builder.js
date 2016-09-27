'use strict';

module.exports = (keyword) => {
  if (!keyword) {
      return {};
  }

  let query = {
    $or: []
  };

  let words = keyword.trim()
              .replace(/\s{2,}/g, ' ')
              .split(' ')
              .map((word) => word.toLowerCase());

  let re = new RegExp(words.join('|'), 'i');
  query.$or = [
      {
        title: {
            $regex: re,
            $options: "i"
        }
      },
      {
        description: {
            $regex: re,
            $options: "i"
        }
      },
      {
        tags: {
          $in: words
        }
      }
  ];

  return query;
};

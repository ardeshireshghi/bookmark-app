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

  words.forEach((word) => {
    query.$or.push({$or: [
      {
        title: {
            $regex: word,
            $options: "i"
        }
      },
      {
        description: {
            $regex: word,
            $options: "i"
        }
      }
    ]});
  });

  query.$or.push({$or: [
    {
      tags: {
          $in: words
      }
    }
  ]});

  return query;
};

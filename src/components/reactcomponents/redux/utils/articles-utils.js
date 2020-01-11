/* eslint-disable no-undef */
import * as commonConstants from 'common/constants';

export function findArticles(selectedTag = commonConstants.ALL_TAGS, articlesFilter = '') {
  const searchKeys = articlesFilter.toLowerCase().split(' ');
  const articles = Array.from(ALL_ARTICLES).filter(article => {
    var keep = false;
    searchKeys.forEach(key => {
      if (articlesFilter != null && articlesFilter !== '') {
        if (selectedTag === 'all') {
          keep = article.searchKey.indexOf(key) > -1;
        } else {
          let keepBasedOnTagValue = false;
          article.tags
            .toLowerCase()
            .split(',')
            .forEach(tag => {
              if (tag === selectedTag) {
                keepBasedOnTagValue = true;
              }
            });
          keep = article.searchKey.indexOf(key) > -1 && keepBasedOnTagValue;
        }
      } else {
        if (selectedTag === 'all') {
          keep = true;
        } else {
          article.tags
            .toLowerCase()
            .split(',')
            .forEach(tag => {
              if (tag === selectedTag) {
                keep = true;
              }
            });
        }
      }
    });
    return keep;
  });

  const articlesByCategory = {};
  for (const article of articles) {
    if (!articlesByCategory.hasOwnProperty(article.category)) {
      articlesByCategory[article.category] = [];
    }
    articlesByCategory[article.category].push(article);
  }
  const sortable = [];
  for (const category in articlesByCategory) {
    sortable.push([category, articlesByCategory[category]]);
  }
  sortable.sort(function(a, b) {
    return b[1].length - a[1].length;
  });

  const sortedArticlesByCategory = {};
  sortable.forEach(function(item) {
    sortedArticlesByCategory[item[0]] = item[1];
  });
  return sortedArticlesByCategory;
}

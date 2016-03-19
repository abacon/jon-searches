const {some, every, map} = require('lodash')

const providers = {
  'http://www.google.com/#q=': ['g', 'google'],
  'https://www.google.com/maps/search/': ['maps'],
  'http://www.duckduckgo.com/?q=': ['d'],
  'http://www.yahoo.com/?q=': ['yahoo', 'y'],
  'https://en.wikipedia.org/w/index.php?search=': ['w', 'wikipedia', 'wiki'],
  'https://soundcloud.com/search?q=': ['soundcloud'],
  'http://www.youtube.com/results?search_query=': ['youtube', 'yt'],
  'http://www.bing.com/?q=': ['bing', 'b']
}

const isSearch = function isSearch (text) {
  let tweet = text.toLowerCase()
  let provider = tweet.split(':')[0].toLowerCase()

  return every([
    tweet.indexOf(':') >= 0,
    some(map(providers, (patterns) => {
      return some(patterns.map(pattern => provider === pattern))
    }))
  ])
}

const makeQuery = function makeQuery (tweet) {
  let provider = tweet.split(':')[0].toLowerCase()
  let searchTerms = tweet.replace(/^[^:]*:/, '').replace(/https:\/\/[^\s]*$/, '').trim()

  for (let i in providers) {
    if (some(map(providers[i], pattern => pattern === provider))) {
      return i + encodeURI(searchTerms)
    }
  }
}

module.exports = {isSearch, makeQuery}

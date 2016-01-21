# XtraSearches

My friend [@xtratoppings](http://www.twitter.com/xtratoppings)'s tweets are just records of his searches. I got tired of repeating his searches locally or on my phone because I wanted to know the answers to his questions. So I built this. It listens for his tweets, and responds with a link to the resultss page of a given query and a screenshot of that results page. ¯\_(ツ)_/¯ 

## Special Care & Feeding

N.B. You need your own twitter account and credentials to make this work. These should go in `creds.js`. You can see an example in `creds.example.js`.

### Spooky installation 👻
If you're using NPM 3, you need to run:

```sh
npm i
cd node_modules/spooky && npm i
```

This is because NPM 3 flattens dependencies for you, but spooky uses a relative path for its dependencies. :(


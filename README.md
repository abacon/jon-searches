## Special Care & Feeding

If you're using NPM 3, you need to run:

```sh
npm i
cd node_modules/spooky && npm i
```

This is because NPM 3 flattens dependencies for you, but spooky uses a relative path for its dependencies. :(

You also need your own twitter account and credentials. These should go in `creds.js`. You can see an example in `creds.example.js`.

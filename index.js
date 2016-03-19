'use strict'

const fs = require('fs')
const Twit = require('twit')

const sentry = require('./sentry')
const screenshot = require('./screenshot')
const {isSearch, makeQuery} = require('./searchUtils')

const creds = require('./creds')

sentry.captureMessage('Server started.', {level: 'info'})

let T = new Twit(creds)
let jonId = '52937207'
let xtrasearchesId = '4798595181'
let stream = T.stream('user', {follows: [jonId, xtrasearchesId].join(',')})

let reply = function (id, searchURL, imagePath) {
  var b64content = fs.readFileSync(imagePath, { encoding: 'base64' })

  // first we must post the media to Twitter
  T.post('media/upload', { media_data: b64content }, function (err, data, response) {
    if (err) {
      sentry.captureError(new Error(err))
      return
    }

    // now we can reference the media and post a tweet (media will attach to the tweet)
    var mediaIdStr = data.media_id_string
    var params = { status: '@xtratoppings ' + searchURL, in_reply_to_status_id: id, media_ids: [mediaIdStr] }

    T.post('statuses/update', params, function (err, data, response) {
      if (err) {
        sentry.captureError(new Error(err))
        return
      }
      sentry.captureMessage('Replied to tweet', {level: 'info', extra: {id: id, url: searchURL, imagePath: imagePath}})
    })
  })
}

let handleTweet = function (tweet) {
  if (!tweet.retweeted && isSearch(tweet.text)) {
    sentry.captureMessage('Search tweet', {level: 'info', extra: {id: tweet.id_str, status: tweet.text}})
    let url = makeQuery(tweet.text)
    screenshot(url, tweet.id_str, reply)
  } else {
    sentry.captureMessage('Non-search tweet', {level: 'info', extra: {id: tweet.id_str, status: tweet.text}})
  }
}

let logEvent = function logEvent () {
  console.log(arguments)
  sentry.captureMessage('Message', {extra: arguments, level: 'info'})
}

stream.on('tweet', handleTweet)
stream.on('message', logEvent)

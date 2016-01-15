'use strict'

const Spooky = require('spooky')

var screenshot = function (url, id, cb) {
  var spooky = new Spooky({
    child: {
      transport: 'http'
    },
    casper: {
      logLevel: 'debug',
      verbose: true
    }
  }, function (err) {
    if (err) {
      var e = new Error('Failed to initialize SpookyJS')
      e.details = err
      throw e
    }

    spooky.start(url)
    spooky.then([{id: id, url: url}, function () {
      var screenshotFilename = 'screenshots/' + encodeURI(id) + '.png'
      this.capture(screenshotFilename)
      this.emit('capture-complete', id, url, screenshotFilename)
    }])
    spooky.run()
  })

  spooky.on('error', function (e, stack) {
    console.error(e)

    if (stack) {
      console.log(stack)
    }
  })

  spooky.on('capture-complete', function (id, url, imagePath) { cb(id, url, imagePath) })

  spooky.on('log', function (log) {
    if (log.space === 'remote') {
      console.log(log.message.replace(/ \- .*/, ''))
    }
  })
}

module.exports = screenshot

var Spooky = require('spooky')

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

  spooky.start('http://www.google.com')
  spooky.then(function () {
    this.capture('~/' + 'goog' + '.png')
    this.emit('hello', 'Hello, from ' + this.evaluate(function () {
      return document.title
    }))
  })
  spooky.run()
})

spooky.on('error', function (e, stack) {
  console.error(e)

  if (stack) {
    console.log(stack)
  }
})

spooky.on('hello', function (greeting) {
  console.log(greeting)
})

spooky.on('log', function (log) {
  if (log.space === 'remote') {
    console.log(log.message.replace(/ \- .*/, ''))
  }
})

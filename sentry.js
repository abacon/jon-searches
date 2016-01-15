const raven = require('raven')

let client = new raven.Client('http://9db391d9f570448093148878f35f1c64:ddfeef624b384239944eb7fe41aa19ac@192.168.99.100:32778/2')

client.patchGlobal(function () {
  console.log('Bye, bye, world.')
  process.exit(1)
})

module.exports = client

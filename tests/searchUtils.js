var test = require('tape')

var {isSearch, makeQuery} = require('./../searchUtils')
var {map, keys, values, some, every} = require('lodash')

var searches = {
  'd: monkey shark paste': 'http://www.duckduckgo.com/?q=monkey%20shark%20paste',
  'D: shark': 'http://www.duckduckgo.com/?q=shark',
  'youtube: funky': 'http://www.youtube.com/results?search_query=funky',
  'y: yahooish': 'http://www.yahoo.com/?q=yahooish',
  'g: google https://t.co/foobar': 'http://www.google.com/#q=google'
}

test('makeQuery works as expected', function (assert) {
  assert.plan(1)

  assert.deepEqual(map(keys(searches), makeQuery), values(searches))
})

test('isSearch works as expected', function (assert) {
  assert.plan(2)

  var notSearches = ['foobar: baz', '@xtratoppings d: monkey', 'poobar']

  assert.true(every(map(keys(searches), isSearch)), 'we match some example searches')
  assert.false(some(map(notSearches, isSearch)), 'we ignore some example non-searches')
})

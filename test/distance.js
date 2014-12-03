var distance = require('../')
var test = require('tape')

test("basic usage", function(t) {
  t.plan(3)

  distance({from: "Seattle, WA", to: "San Francisco, CA"}, function(err, result) {
    t.ok(result.meters > 1250000 && result.meters < 1350000)
    t.ok(result.seconds > 40000 && result.seconds < 50000)
  })
  distance({from: "Seattle, WA", to: "asidiasidiaisdjnns"}, function(err, result) {
    t.equal(err, "could not get distance")
  })
})

test("coordinate parsing", function(t) {
  t.plan(1)

  distance({
    from: {
      latitude: 47.6786514,
      longitude: -122.3176489
    }, 
    to: "San Francisco, CA"
  }, function(err, result) {
    t.ok(result.meters > 1250000 && result.meters < 1350000)
  })
})
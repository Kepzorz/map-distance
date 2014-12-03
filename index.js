var request = require('superagent')

var parse = require('./lib/parse.js')

var Distance = module.exports = function(args, callback) {
  var baseUrl = "https://maps.googleapis.com/maps/api/distancematrix/json";
  if(!args.from || !args.to){
    process.nextTick(function() {
      callback("must supply to and from locations")
    })
    return
  }
  var query = {origins: parse(args.from), destinations: parse(args.to), mode: args.mode || "driving"}
  var responseHandler = require('./lib/handle-response.js')(callback)
  request.get(baseUrl)
    .query(query)
    .end(function(response) {
      responseHandler(response.body)
    })
}
var ee = require('event-emitter')
var loadScript = require('load-script')

var googleMapsUrl = "https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"

var mapLoader = ee({
  load: function() {
    // idempotent
    if(this.hasLoaded) return this;
    window.__gmapCallback = function() {
      mapLoader.emit("done")
    }
    this.hasLoaded = true;
    loadScript(googleMapsUrl + "&callback=__gmapCallback")
    return this;
  }
})

var loadGoogleMaps = function(callback) {
  if(typeof google === "object" && google.maps){
    process.nextTick(function() {
      callback()
    })
  } else {
    mapLoader.load().on("done", callback)
  }
}

var parse = require('./parse.js') 

var distanceService;
var Distance = module.exports = function(args, callback) {
   if(!args.from || !args.to){
    process.nextTick(function() {
      callback("must supply to and from locations")
    })
    return
  }
  loadGoogleMaps(function() {
    if(!distanceService) distanceService = new google.maps.DistanceMatrixService();
    var query = {origins: [parse(args.from)], destinations: [parse(args.to)], travelMode: args.mode.toUpperCase() || "DRIVING"}
    var responseHandler = require('./handle-response.js')(callback)
    distanceService.getDistanceMatrix(query, responseHandler)
  })
}
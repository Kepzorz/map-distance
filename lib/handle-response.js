module.exports = function(callback) {

  return function(response) {
    var route = response.rows[0].elements[0]
    if(!route.distance){
      callback("could not get distance")
      return
    }
    var result = {
      meters: route.distance.value,
      seconds: route.duration.value
    }
    callback(null, result)
  }
}
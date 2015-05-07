module.exports = function(callback, args) {

  return function(response) {
    if(response.rows.length > 1){
      callback(null, formatMatrix(response.rows, args))
      return
    }
    
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

function formatMatrix (rows, args) {
  var matrix = []
  rows.forEach(function (row, rowIndex) {
    row.elements.forEach(function (element, elIndex) {
      var entry = {
        meters: element.distance.value,
        seconds: element.duration.value,
        from: args.from[rowIndex],
        to: args.to[elIndex]
      }
      matrix.push(entry)
    })
  })
  return matrix
}
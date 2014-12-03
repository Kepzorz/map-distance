//location parsing
module.exports = function(location) {
  if(typeof location === "string") return location;

  if(typeof location === "object" && location.latitude && location.longitude){
    return [location.latitude, location.longitude].join(",")
  }

  return "";
}
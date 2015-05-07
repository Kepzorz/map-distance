//location parsing
module.exports = function(location) {
  if(typeof location === "string") return location;
  if(location instanceof Array) return location.join('|');
  if(typeof location === "object" && location.latitude && location.longitude){
    return [location.latitude, location.longitude].join(",")
  }

  return "";
}
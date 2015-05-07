# map-distance

get the google maps distance between two points from node or the browser.

## example
`npm install map-distance`

```js
var distance = require("map-distance")

distance({
  from: "Seattle, WA",
  to: "San Francisco, CA",
  mode: "driving"
},
function(err, data){
  console.log(data)
  //=> { meters: 1299983, seconds: 44323 }
})
```

or for a more complex distance matrix:
```js
var distance = require("map-distance")

distance({
  from: ['seattle, wa', 'portland, or'],
  to: ['san francisco, ca', 'mukilteo, wa'],
  mode: 'driving'
}, 
function (err, data){   
  console.log(data[2])
  //=>  { meters: 1022915, seconds: 35330, from: 'portland, or', to: 'san francisco, ca' }
})
```


## in the browser

if you're using `map-distance` in the browser with browserify, including the google maps js library is optional. if it's not present when you call `distance()`, this module will load that library first.

## google maps terms of use
if you're into, like, rule-following: remember that google requires you display a map somewhere in your application if you use their distance API.

## license
MIT

mapboxgl.accessToken = 'pk.eyJ1IjoidGhha3Vya2FyYW4wMDA3IiwiYSI6ImNsdnl5NHQ3YzBrYjMyaW1lNDQ4b2J1MjYifQ.hGBHL6w2TqKx2_V2LvWsDw';
const map = new mapboxgl.Map({
container: 'map', // container ID
 center: coordinates, // starting position [lng, lat]
zoom: 9 // starting zoom
});

try{const marker = new mapboxgl.Marker()
.setLngLat(coordinates)
.addto(map);}
catch(err){
    console.log((err));
}

              
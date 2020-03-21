
const locations = JSON.parse(document.getElementById("map").dataset.locations)
console.log(locations)
mapboxgl.accessToken = 'pk.eyJ1IjoiYWJlamlkZWZlbWkxIiwiYSI6ImNrODA3Z3p4aTAwM3czZHJ0b2JqNWJqcTQifQ.fuZ0cckxVwn0Q9lv0V-IHA';

var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom: false
    // center: [-118.113491, -34.111745],
    // zoom: 1,
    // interactive: false
});
const bounds = new mapboxgl.LngLatBounds()

locations.forEach(loc => {
    // Add marker
    const el = document.createElement("div")
    el.className = "marker"

    new mapboxgl.Marker({
        element: el,
        anchor: "bottom"
    }).setLngLat(loc.coordinates).addTo(map)

    new mapboxgl.Popup({
        offset: 30
    }).setLngLat(loc.coordinates)
    .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
    .addTo(map)

    bounds.extend(loc.coordinates)
});

map.fitBounds(bounds, {
    padding: {
        top: 200,
        bottom: 150,
        left: 100,
        right: 100
    }
})
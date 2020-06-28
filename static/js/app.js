// map layer
var tiles = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 2,
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
});

var latlng = L.latLng(4.2105, 101.9758);
var map = L.map('map', {
    center: latlng,
    zoom: 8,
    zoomControl: false,
    fullscreenControl: false,
    fullscreenControlOptions: { 
        title: "Enter fullscreen",
        titleCancel: "Exit fullscreen"
    },
    layers: [tiles]
});
// end map layer

var markers = L.markerClusterGroup();
var markerList = [];
map.addLayer(markers); 

// zoom position
L.control.zoom({
    position: 'topleft'
}).addTo(map);

// Empty input box when refresh

//

// Enter trigger button
$("#query").keyup(function(event) {
    if (event.keyCode === 13) {
        $("#search").click();
    }
});
// end Enter trigger button

// search the address then mark on map
$("#search").click(function() {
    markers.clearLayers();
    var searchReq = $.get("/getaddr/" + $("#query").val());

    searchReq.done(function(data) {
        c = Object.keys(data).length;
        //console.log(c)

        var map_data = JSON.parse(data);
        
        //console.log(map_data.y, map_data.x, map_data.length)

        if (c !== 4) {
            var marker = L.marker(new L.LatLng(map_data.y, map_data.x)
            ).setBouncingOptions({
                bounceHeight: 20,
                exclusive: true
            }).on('click', function () {
                this.bounce(3);
            }).addTo(markers);
        } else {
            alert("Not found, please type again");
        }
    });
});
// end search the address then mark on map


// debug
// console.log(data)
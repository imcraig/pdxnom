// pdxnom UI code

var directionsService = new google.maps.DirectionsService();
var directionsDisplay = new google.maps.DirectionsRenderer();

// Cart Pods, these should be stored in a JSON data structure
var cartopia = new google.maps.LatLng(45.512431,-122.65332);  /// 12th and se hawthorne ,"cartopia"
var pod0 = new google.maps.LatLng(45.519934,-122.674499); // 3rd and sw washington
var pod1 = new google.maps.LatLng(45.521143,-122.676215); // 5th and sw stark

detectBrowser();

var user_location = get_user_location();

var map = new google.maps.Map(document.getElementById('map_canvas'), {
    zoom: 13,
    center: cartopia,
    mapTypeId: google.maps.MapTypeId.ROADMAP
});

var infowindow = new google.maps.InfoWindow();
var marker, i;

directionsDisplay.setMap(map);

new google.maps.Marker({
    position: cartopia,
    map     : map
});

var closest_marker;
var closest_marker_distance;
var compute_distance = google.maps.geometry.spherical.computeDistanceBetween;


$.getJSON("./data/carts.json",
    function(data) {
        //console.dir(data);

        // first guess for closest marker
        // it is a hash, not an array
        closest_marker          = data.markers[0];
        closest_marker_distance = compute_distance(data.markers[0].getPosition(),user_location);

        $.each(data.markers, function(i,m){
                if ( i > 0 ) { // don't check our first guess against itself
                    var distance = google.maps.geometry.spherical.computeDistanceBetween(m.getPosition(),user_location);
                    if ( distance < closest_marker_distance ) {
                        closest_marker          = m;
                        closest_marker_distance = distance;
                    }

                }
                // just load 20 markers for testing
                if ( i > 20 ) { return; }

                console.log("adding marker " + m.lat + " " + m.lng + " i= " + i );
                // TODO: lat and long are reversed in data file

                var loc = new google.maps.LatLng(m.lng , m.lat );
                var marker = new google.maps.Marker({
                    position: loc,
                    map     : map
                });
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infowindow.setContent(m.title);
                        infowindow.open(map, marker);
                    }
                })(marker, i));
        });
    });

calcRoute(user_location);

function detectBrowser() {
    var useragent = navigator.userAgent;
    var mapdiv = document.getElementById("map_canvas");

    if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1 ) {

    } else {
        mapdiv.style.width = '600px';
        mapdiv.style.height = '800px';
    }
}

function get_user_location() {
    // default to cartopia for now
    var user_location = cartopia;
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
        user_location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(user_location);
        infowindow.setContent(contentString);
        infowindow.setPosition(user_location);
        infowindow.open(map);
        }, function() {
            set_default_location();
        });
    } else {
        // Browser doesn't support Geolocation
        set_default_location();
    }
    return user_location;
}

function set_default_location() {
  contentString = "Cartopia";
  map.setCenter(cartopia);
  infowindow.setContent(contentString);
  infowindow.setPosition(cartopia);
  infowindow.open(map);
}

function calcRoute(user_location) {
    console.log('calculating route from ' + user_location);
    var selectedMode = document.getElementById("mode").value;
    var request = {
        origin: user_location,
        destination: pod1,
        // Note that Javascript allows us to access the constant
        // using square brackets and a string value as its
        // "property."
        travelMode: google.maps.DirectionsTravelMode[selectedMode]
    };
    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        console.log('setting directionDisplay');
        directionsDisplay.setDirections(response);
      } else {
        console.log('direciton service error:' + status);
      }
      });
}

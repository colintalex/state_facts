//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery
//= require jquery_ujs
//= require leaflet

var activeStates = []

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

// Binds popups to each marker
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}

$(document).ready(function () {
    // Highlights only states available in dropdown menu (dropdown only lists whats in DB)
    $('#myselect option').map((index, option) => activeStates.push((option.text)))

    buildMap(params = {})
    
    // Event functionality for Search button
    $("#search").click(function() {
        // This extracts text from selected option
        var selectedId = $("#myselect option:selected").val();
        // ajax goes here
        $.ajax({
            url: '/states/' + selectedId,
            type: "GET",
            dataType: "json",
        })
        .done(function(json) {
            $("#state-name").html(json.name)
            $("#state-flag-image").html(json.flag_image)
            $("#state-description").html(json.description)
            $("#state-capitol").html(json.capitol_name)
            $("#state-population").html(json.population)
            $('#state-facts').empty()
            // Adds new state facts
            $.each(json.facts, function() {
                $('#state-facts')
                .append(`<li><a class="state-fact" id=${this.id}>${this.title}</a></li>`)
            })
        })
    })

    // Adds marker on click, On Body required for post append action
    $('body').on('click', '.state-fact', function () {
        console.log(`${this.attributes.id.value}`)
        $.ajax({
            url: `/facts/${this.id}`,
            type: "GET",
            dataType: "json",
        })
        .done(function(json) {
            console.log(json)
        })
    })

    // Adds custom points to leaflet
    // Temporary, will implement this inside ajax request
    L.geoJSON(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            return L.marker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(map);
});
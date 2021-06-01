//= require rails-ujs
//= require turbolinks
//= require_tree .
//= require jquery
//= require jquery_ujs
//= require leaflet

var activeStates = []

var geojsonMarkerOptions = {
    radius: 8,
    fillColor: "#ff7800",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

$(document).ready(function () {
    checkActiveStates()
    buildMap(params = {})

    // Creates map layer for markers
    var markerLayer = L.layerGroup().addTo(map)

    // Event functionality for Search button, passes in layer for marker clearing
    clickSearchForState(markerLayer)

    // Adds marker on click, passes in layer for marker clearing
    clickAddMarkerToLayer(markerLayer)
})


function checkActiveStates() {
    $('#myselect option').map((index, option) => activeStates.push((option.text)))
}

function clickSearchForState(layer) {
    $("#search").click(function () {
        layer.clearLayers()
        var selectedId = $("#myselect option:selected").val();
        getSingleState(selectedId)
    })
}

function clickAddMarkerToLayer(layer) {
    $('body').on('click', '.state-fact', function () {
        layer.clearLayers()
        $.ajax({
            url: `/facts/${this.id}`,
            type: "GET",
            dataType: "json",
        })
            .done(function (json) {
                addMarkerToLayer(digestFeature(json), layer)
            })
    })
}

function getSingleState(stateId) {
    $.ajax({
        url: '/states/' + stateId,
        type: "GET",
        dataType: "json",
    })
        .done(function (json) {
            digestState(json)
        })
}

// Process Fact JSON into GeoJSON feature
function digestFeature(fact) {
    var feature = {
        "type": "Feature",
        "properties": {
            "name": fact.title,
            "amenity": "",
            "popupContent": fact.details
        },
        "geometry": {
            "type": "Point",
            "coordinates": [fact.lng, fact.lat]
        }
    }
    return feature
}

function addMarkerToLayer(feature, layer) {
    L.geoJSON(feature, {
        pointToLayer: function (feat, latlng) {
            return L.marker(latlng, geojsonMarkerOptions);
        },
        onEachFeature: onEachFeature
    }).addTo(layer);
}

// Fills select HTML with corresponding state data
function digestState(json) {
    $("#state-name").html(json.name)
    $("#state-flag-image").html(json.flag_image)
    $("#state-description").html(json.description)
    $("#state-capitol").html(json.capitol_name)
    $("#state-population").html(json.population)
    $('#state-facts').empty()
    // Adds new state facts
    $.each(json.facts, function () {
        $('#state-facts')
        .append(`<li><a class="state-fact" id=${this.id}>${this.title}</a></li>`)
    })
}

// Binds popups to each marker
function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
};
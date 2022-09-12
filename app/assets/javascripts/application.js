//= require rails-ujs
//= require turbolinks
//= require jquery
//= require jquery_ujs
//= require leaflet
//= require jquery3
//= require popper
//= require bootstrap-sprockets
//= require_tree .


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
    
    makeResizableDiv();
})

function makeResizableDiv() {
    
    const element1 = document.querySelector('#state-info');
    const element2 = document.querySelector('#map');
    const divider = document.querySelector('#divider')
    divider.addEventListener('mousedown', function (e) {
        e.preventDefault()
        window.addEventListener('mousemove', resize)
        window.addEventListener('mouseup', stopResize)
    })
    
    function resize(e) {
        var dividerPercentage = ( e.pageX / window.innerWidth ) * 100
        if (dividerPercentage < 75 & dividerPercentage > 25){
            element1.style.width = element1.getBoundingClientRect().right - e.pageX + 'px'
            element2.style.width = e.pageX + element2.getBoundingClientRect().left + 'px'
            // console.log(e.pageX,element1.style.width, element2.style.width)
        }
    }

    function stopResize() {
        window.removeEventListener('mousemove', resize)
    }
}

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
                addMarkerToLayer(json, layer)
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
    $("#state-flag-image").attr("src", json.flag_image)
    $("#state-description").html(json.description)
    $("#state-capitol").html(`State Capitol: ${json.capitol_name}`)
    $("#state-population").html(`State Population: ${json.population}`)
    $('ul#state-facts').empty()
    $('#facts-header').show();
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
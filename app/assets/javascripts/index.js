//= require leaflet

const units = {
  acres: {
    factor: 0.000024711,
    display: "acres",
    decimals: 2,
  },
  feet: {
    factor: 0.32808,
    display: "feet",
    decimals: 0,
  },
  kilometers: {
    factor: 0.0001,
    display: "kilometers",
    decimals: 2,
  },
  hectares: {
    factor: 0.00001,
    display: "hectares",
    decimals: 2,
  },
  meters: {
    factor: 1,
    display: "meters",
    decimals: 0,
  },
  miles: {
    factor: 0.000621371,
    display: "miles",
    decimals: 2,
  },
  sqfeet: {
    factor: 0.107639,
    display: "sqfeet",
    decimals: 0,
  },
  sqmeters: {
    factor: 1,
    display: "sqmeters",
    decimals: 0,
  },
  sqmiles: {
    factor: 0.0000000386102,
    display: "sqmiles",
    decimals: 2,
  },
};

L.Control.MultiMeasure = L.Control.extend({
  _className: "leaflet-control-multi-measure",
  options: {
    units: {},
    position: "topleft",
    primaryLengthUnit: "miles",
    secondaryLengthUnit: "miles",
  },
  initialize: function (options) {
    L.setOptions(this, options);
    this.options.units = L.extend({}, units, this.options.units);
  },
  onAdd: function (map) {
    this._map = map;
    this._layer = L.featureGroup().addTo(this._map);
    this._tempLayer = L.featureGroup().addTo(this._layer);
    this._tempPoints = L.featureGroup().addTo(this._layer);
    this._tempArea = L.polygon([], { color: "blue", stroke: false }).addTo(
      this._tempLayer
    );
    this._tempLine = L.polyline([]).addTo(this._tempLayer);
    this._subcursor = L.circleMarker(map.getCenter(), {
      color: "transparent",
    }).addTo(this._layer);
    this._layerHistory = [];
    this._pointsHistory = [];

    console.log(units)
    const container = (this._container = L.DomUtil.create(
      "div",
      `${this._className} leaflet-bar`
    ));
    container.innerHTML = mainTemplate(this);

    L.DomEvent.disableClickPropagation(container);
    L.DomEvent.disableScrollPropagation(container);

    const pointStart = container.querySelector("#start-point");
    const lineStart = container.querySelector("#start-line");
    const areaStart = container.querySelector("#start-area");
    const toggle = container.querySelector(".measure-toggle");
    const cancel = container.querySelector(".link#cancel");
    const delete_all = container.querySelector(".link#delete-all");
    const undo = container.querySelector(".link#undo-last");
    const save = container.querySelector(".link#save");
    const close = container.querySelector("#close-icon");
    const edit_controls = container.querySelectorAll(".link.existing");
    const undo_point = container.querySelector(".link#undo-point");
    const controls = container.querySelector(".leaflet-multi-measure-controls");
    const outputs = container.querySelector(".measure-output");
    const measure_start_menu = controls.querySelector(".measure-start-menu");
    const measure_actions = controls.querySelector(".measure-actions");
    const select_units = controls.querySelector(".select-units");
    this._edit_controls = edit_controls;
    this._undo_point = undo_point;
    this._save = save;
    this._toggle = toggle;
    this._close = close;
    this._cancel = cancel;
    this._controls = controls;
    this._outputs = outputs;
    this._measure_start_menu = measure_start_menu;
    this._measure_actions = measure_actions;
    this._select_units = select_units;
    this._collapse();

    L.DomEvent.on(container, "mouseover", L.DomEvent.stop);
    L.DomEvent.on(container, "mouseover", this._disableSubCursor, this);
    L.DomEvent.on(container, "mouseout", this._enableSubCursor, this);
    L.DomEvent.on(this._map, "mouseover", this._enableSubCursor, this);

    L.DomEvent.on(toggle, "click", L.DomEvent.stop);
    L.DomEvent.on(toggle, "click", this._expand, this);
    L.DomEvent.on(close, "click", L.DomEvent.stop);
    L.DomEvent.on(close, "click", this._collapse, this);

    L.DomEvent.on(pointStart, "click", L.DomEvent.stop);
    L.DomEvent.on(pointStart, "click", this._enableMeasureType, this);
    L.DomEvent.on(lineStart, "click", L.DomEvent.stop);
    L.DomEvent.on(lineStart, "click", this._enableMeasureType, this);
    L.DomEvent.on(areaStart, "click", L.DomEvent.stop);
    L.DomEvent.on(areaStart, "click", this._enableMeasureType, this);

    L.DomEvent.on(cancel, "click", L.DomEvent.stop);
    L.DomEvent.on(cancel, "click", this._backToMenu, this);
    L.DomEvent.on(save, "click", L.DomEvent.stop);
    L.DomEvent.on(save, "click", this._saveMeasure, this);
    L.DomEvent.on(delete_all, "click", L.DomEvent.stop);
    L.DomEvent.on(delete_all, "click", this._clearAll, this);
    L.DomEvent.on(undo, "click", L.DomEvent.stop);
    L.DomEvent.on(undo, "click", this._undoLast, this);
    L.DomEvent.on(undo, "mouseover", this._highlightLast, this);
    L.DomEvent.on(undo, "mouseout", this._unHighlightLast, this);
    L.DomEvent.on(this._undo_point, "click", this._removeLastPoint, this);

    return this._container;
  },
  onRemove: function () {
    this._map.removeLayer(this._layer);
    this._map.removeLayer(this._tempLayer);
    this._map.removeLayer(this._subcursor);
    this._map.off("mousemove", this._updateSubCursorPos, this);
  },
  _disableSubCursor: function () {
    if (this._subcursor) {
      this._subcursor.off("click");
      this._layer.removeLayer(this._subcursor);
    }
  },
  _enableSubCursor: function () {
    if (this._measure_type != "none") {
      if (this._subcursor) {
        this._subcursor.addTo(this._tempLayer);
      }
    }
    let type = this._measure_type;
    if (type == "start-point") {
      this._subcursor.on("click", this._placeMarker, this);
    }
    if (type == "start-line" || type == "start-area") {
      this._subcursor.on("click", this._placeLinePoint, this);
    }
  },
  _updateSubCursorPos: function (evt) {
    if (!this._subcursor) {
      this._subcursor = L.circleMarker(evt.latlng, { opacity: 1.0 }).addTo(
        this._tempLayer
      );
    }
    if (!this._tempLayer.hasLayer(this._subcursor)) {
      this._subcursor.addTo(this._tempLayer);
    }
    this._subcursor.setLatLng(evt.latlng);
    this._subcursor.setStyle({ color: "blue", radius: 6 });
  },
  _unHighlightLast: function () {
    let last_layer = this._layerHistory[this._layerHistory.length - 1];
    if (last_layer == undefined) return;

    if (this._layer.hasLayer(last_layer)) {
      this._layer.getLayer(last_layer).setStyle({ color: "green" });
    }
  },
  _highlightLast: function () {
    let last_layer = this._layerHistory[this._layerHistory.length - 1];
    if (last_layer == undefined) return;
    if (this._layer.hasLayer(last_layer)) {
      this._layer.getLayer(last_layer).setStyle({ color: "red" });
    }
  },
  _undoLast: function () {
    var length = this._layerHistory.length - 1;
    this._layer.removeLayer(this._layerHistory[length]);
    this._layerHistory.pop();
    this.__handleEditVisibility();
    this._highlightLast();
  },
  _clearAll: function () {
    this._layer.clearLayers();
    this._tempLayer.addTo(this._layer).clearLayers();
    this._tempPoints.addTo(this._layer).clearLayers();
    this._tempLayer.clearLayers();
    this._tempArea.addTo(this._tempLayer);
    this._tempLine.setLatLngs([]);
    this._tempArea.setLatLngs([]);
    this._layerHistory = [];
    this.__handleEditVisibility();
  },
  _expand: function () {
    this._toggle.classList.add("measure-hidden");
    this._controls.classList.remove("measure-hidden");
    this._outputs.classList.add("measure-hidden");
    this._measure_actions.classList.add("measure-hidden");

    this.__handleEditVisibility();
  },
  _collapse: function () {
    this._toggle.classList.remove("measure-hidden");
    this._controls.classList.add("measure-hidden");
    this._outputs.classList.add("measure-hidden");
    this._measure_actions.classList.add("measure-hidden");
    this._measure_start_menu.classList.remove("measure-hidden");
    this._tempLayer.remove(this._subcursor);
  },
  __handleEditVisibility: function () {
    if (this._layerHistory.length < 1) {
      this._edit_controls.forEach(function (ele) {
        ele.classList.add("measure-hidden");
      });
    } else {
      this._edit_controls.forEach(function (ele) {
        ele.classList.remove("measure-hidden");
      });
    }

    // L.DomEvent.on(this._select_units, 'click', L.DomEvent.stop);
    // L.DomEvent.on(this._select_units, 'click', this._showUnitsMenu, this);

    $('.dropbtn').on('click', {model: this}, function(e){
      if (this.classList.contains("primary")){
        $(".dropdown-content.primary")[0].classList.remove("measure-hidden");
        $(".dropdown-item").on( "click", { model: e.data.model, dropdown: this }, function (e) {
            e.data.model.options.primaryLengthUnit = this.textContent;
            $('.dropdown-content.primary')[0].classList.add("measure-hidden");
            e.data.model._updatePrimaryUnit(this.textContent, 'primary');
            $(".dropbtn.primary")[0].innerText = this.textContent;
            $(".dropdown-item").off('click');
          }
        );
      }else if(this.classList.contains('secondary')){
        $(".dropdown-content.secondary")[0].classList.remove("measure-hidden");
        $(".dropdown-item").on( "click", { model: e.data.model, dropdown: this }, function (e) {
            e.data.model.options.secondaryLengthUnit = this.textContent;
            $('.dropdown-content.secondary')[0].classList.add("measure-hidden");
            e.data.model._updatePrimaryUnit(this.textContent, 'secondary');
            $(".dropbtn.secondary")[0].innerText = this.textContent;
            $(".dropdown-item").off("click");

          }
        );
      }
    })

  },
  _updatePrimaryUnit: function (unit_name, type) {
    switch(type){
      case 'primary':
        this.options.primaryLengthUnit =  unit_name
        break;
      case 'secondary':
        this.options.secondaryLengthUnit =  unit_name
        break;
    }
  },
  _showUnitsMenu: function() {
    $(".dropdown-content.primary")[0].classList.remove("measure-hidden");
    L.DomEvent.off(this._select_units);
    L.DomEvent.on(this._select_units, "click", L.DomEvent.stop);
    L.DomEvent.on(this._select_units, "click", this._hideUnitsMenu, this);
  },
  _hideUnitsMenu: function(e) {
    if (e.target.id == '' ) return;

    $(".dropbtn.primary")[0].innerText = e.target.id;
    this.options.primaryLengthUnit = e.target.id;
    $(".dropdown-content.primary")[0].classList.add("measure-hidden");
  },
  _enableMeasureType: function (evt) {
    this._measure_type = evt.target.id;
    this._tempLayer.addTo(this._map);
    this._subcursor.addTo(this._tempLayer)
    this._map.on("mousemove", this._updateSubCursorPos, this);
    L.DomEvent.off(this._close, "click", this._collapse, this);

    switch (this._measure_type) {
      case "start-point":
        this._measure_start_menu.classList.add("measure-hidden");
        this._outputs.classList.remove("measure-hidden");
        this._measure_actions.classList.remove("measure-hidden");
        this._subcursor.on("click", this._placeMarker, this);
        this._outputs.innerHTML = pointStartTemplate();
        break;
      case "start-line":
        this._measure_start_menu.classList.add("measure-hidden");
        this._outputs.classList.remove("measure-hidden");
        this._measure_actions.classList.remove("measure-hidden");
        this._subcursor.on("click", this._placeLinePoint, this);
        this._outputs.innerHTML = lineStartTemplate();
        break;
      case "start-area":
        this._measure_start_menu.classList.add("measure-hidden");
        this._outputs.classList.remove("measure-hidden");
        this._measure_actions.classList.remove("measure-hidden");
        this._subcursor.on("click", this._placeLinePoint, this);
        this._outputs.innerHTML = areaStartTemplate();
        break;
    }
  },
  _backToMenu: function () {
    this._measure_type = "none";
    this._controls.removeAttribute("style");
    this._measure_start_menu.classList.remove("measure-hidden");
    this._measure_actions.classList.add("measure-hidden");
    this._outputs.classList.add("measure-hidden");
    this.__handleEditVisibility();

    this._subcursor.off("click", this._placeMarker, this);
    this._subcursor.off("click", this._placeLinePoint, this);
    this._map.off("mousemove", this._updateSubCursorPos, this);
    
    this._tempLayer.clearLayers();
    this._tempArea.addTo(this._tempLayer);
    this._tempLine.setLatLngs([]);
    this._tempArea.setLatLngs([]);
    this._tempPoints.clearLayers();
    this._save.classList.add("measure-hidden");
    L.DomEvent.on(this._close, "click", this._collapse, this);
  },
  _placeMarker: function (evt) {
    if (!this._tempMarker) {
      this._tempMarker = new L.CircleMarker(evt.latlng, { radius: 6 }).addTo(
        this._tempLayer
      );
    }
    this._tempMarker.addTo(this._tempLayer);
    this._tempMarker.setLatLng(evt.latlng);
    this._save.classList.remove("measure-hidden");
    // Update Output Template
    this._outputs.innerHTML = pointResultsTemplate(evt.latlng);
  },
  _placeLinePoint: function (evt) {
    const marker = L.circleMarker(evt.latlng, { radius: 6 });
    marker.addTo(this._tempPoints);

    this._pointsHistory.push(marker._leaflet_id);
    if (this._pointsHistory.length > 0) {
      this._undo_point.classList.remove("measure-hidden");
      this._cancel.innerText = "Cancel This Measure";
    }
    if (!this._tempLine) {
      this._tempLine = new L.Polyline([evt.latlng]);
    } else {
      this._tempLine.addLatLng(evt.latlng);
    }

    if (!this._tempLayer.hasLayer(this._tempLine)) {
      this._tempLine.addTo(this._tempLayer);
    }
    var line_parts = this._tempLine.toGeoJSON().geometry.coordinates;
    if (this._measure_type == "start-line" && line_parts.length > 1) {
      var line = turf.lineString(line_parts);
      var primary_length_meters = turf.length(line, { units: "kilometers" }) * 1000;
      var secondary_length_meters = turf.length(line, { units: "kilometers" }) * 1000;
      this._save.classList.remove("measure-hidden");
      var p_unit = units[this.options.primaryLengthUnit]
      var s_unit = units[this.options.secondaryLengthUnit]
      var primary_length = (primary_length_meters * p_unit.factor);
      var secondary_length = (secondary_length_meters * s_unit.factor);
      this._outputs.innerHTML = lineResultsTemplate(primary_length, secondary_length);
    }
    if (this._measure_type == "start-area" && line_parts.length > 2) {
      var temp_parts = line_parts;
      temp_parts.push(temp_parts[0]);
      var polygon = turf.polygon([temp_parts]);
      var area = turf.area(polygon);
      var miles = area / 2589988.11;
      this._save.classList.remove("measure-hidden");
      this._outputs.innerHTML = areaResultsTemplate(miles, area);
      if (this._tempArea == undefined) {
        this._tempArea = L.polygon(line_parts, {
          color: "red",
          stroke: false,
        }).addTo(this._tempLayer);
      }
      this._tempArea.setLatLngs(this._tempLine.getLatLngs());
    }
  },
  _removeLastPoint: function () {
    this._tempPoints.removeLayer(this._pointsHistory.pop());
    let coords = this._tempLine.getLatLngs();
    coords.pop();
    this._tempLine.setLatLngs(coords);
    if (this._measure_type == "start-area") {
      this._tempArea.setLatLngs(coords);
    }
    if(coords.length < 2 && this._measure_type == 'start-line'){
      this._save.classList.add('measure-hidden')
    }
    if(coords.length < 3 && this._measure_type == 'start-area'){
      this._save.classList.add("measure-hidden");
    }
  },
  _saveMeasure: function () {
    this._save.classList.add("measure-hidden");
    this._undo_point.classList.add("measure-hidden");
    this._cancel.innerText = "Back To Menu";

    switch (this._measure_type) {
      case "start-point":
        var coords = this._tempMarker.getLatLng();
        var marker = L.circleMarker(coords, {
          color: "green",
          radius: 6,
        }).addTo(this._layer);
        marker.bindPopup(pointOutputTemplate(coords)).openPopup();
        this._layerHistory.push(marker._leaflet_id);
        this._tempLayer.clearLayers();
        this._subcursor.addTo(this._tempLayer);
        this._outputs.innerHTML = pointStartTemplate();
        break;
      case "start-line":
        var path = L.featureGroup();
        this._tempPoints.getLayers().forEach((lyr) => {
          L.circleMarker(lyr.getLatLng(), { color: "green", radius: 6 }).addTo(
            path
          );
        });
        var line_parts = this._tempLine.toGeoJSON().geometry.coordinates;
        var line = turf.lineString(line_parts);
        var length = turf.length(line, { units: "miles" });
        var polyline = L.polyline(this._tempLine.getLatLngs(), {
          color: "green",
        }).addTo(path);
        path.addTo(this._layer);
        var units = {};
        units[0] = this.options.primaryLengthUnit;
        units[1] = this.options.secondaryLengthUnit;
        polyline.bindPopup(outputTemplate(length, units, "Length")).openPopup();
        this._layerHistory.push(path._leaflet_id);
        this._tempPoints.clearLayers();
        this._tempLine.setLatLngs([]);
        this._outputs.innerHTML = lineStartTemplate();
        break;
      case "start-area":
        var path = L.featureGroup();
        this._tempPoints.getLayers().forEach((lyr) => {
          L.circleMarker(lyr.getLatLng(), { color: "green", radius: 6 }).addTo(
            path
          );
        });
        var line_parts = this._tempLine.toGeoJSON().geometry.coordinates;
        var units = {}
        units[0] = this.options.primaryAreaUnit
        units[1] = this.options.secondaryAreaUnit
        line_parts.push(line_parts[0]);
        var area = turf.area(turf.polygon([line_parts])) / 2589988.11;
        
        this._outputs.innerHTML = areaStartTemplate(area);

        var polyline = L.polygon(this._tempLine.getLatLngs(), {
          color: "green",
        }).addTo(path);
        path.addTo(this._layer);
        polyline.bindPopup(areaOutputTemplate(area)).openPopup();
        this._layerHistory.push(path._leaflet_id);
        this._tempPoints.clearLayers();
        this._tempLine.setLatLngs([]);
        break;
    }
    L.DomEvent.on(this._close, "click", this._collapse, this);
    this._undo_point.classList.add("measure-hidden");
    this._backToMenu();
  },
});

L.control.multiMeasure = function (options) {
  return new L.Control.MultiMeasure(options);
};


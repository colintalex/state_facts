function outputTemplate(measurements, units, title) {
  return `
  <div>
    <h3>${title}</h3>
    <h6>${measurements.toFixed(2)} ${units[0]}</h6>
    <h6>${measurements.toFixed(2)} ${units[1]}</h6>
  </div>`
}
function pointOutputTemplate(coords) {
  return `
  <div>
    <h3>Length</h3>
    <h6>${coords.lat.toFixed(5)} / ${coords.lng.toFixed(5)}</h6>
  </div>`;
}
function lengthOutputTemplate(length) {
  return `
  <div>
    <h3>Length</h3>
    <h6>${length.toFixed(2)} sq/miles</h6>
  </div>`;
}
function areaOutputTemplate(area) {
  return `
  <div>
    <h3>Area</h3>
    <h6>${area.toFixed(2)} sq/miles</h6>
  </div>`;
}


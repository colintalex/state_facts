function outputTemplate(model, title) {
  var text;
  if(model == null){
    text = 0.0000;
  }else{
    text = model;
  }
  return `
  <div>
    <h3>${title}</h3>
    <h6>${text.toFixed(2)} miles</h6>
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


function mainTemplate(model) {
  const title = "2D Measure Tool";
  return `
    <a class="measure-toggle" href="#">
      ${rulerIcon()}
    </a>
    <div class='leaflet-multi-measure-controls'>
      <h3 class="heading">2D Measure Tool</h3>
        ${startMenu()}
      <div class="measure-output">
      </div>
      <div class="measure-actions">
        ${measureActions()}
      </div>
    </div>
  `;
}

function resultsTemplate(model,title){
    if (model == null) {
      text = 0.0;
    } else {
      text = model;
    }
  return `
  <h3>${title}</h3>
  ${text.toFixed(2).toString()} miles`
}

function measureActions(){
  return `
    <ul>
      <li id='save' class='link'>
        Save Measurement
      </li>
      <li id='cancel' class='link'>
        Cancel
      </li>
    </ul>`;
}

function startMenu() {
  return `
    <div class="measure-start-menu">
    <ul>
      <li id='start-point' class='link'>
        ${pointIcon()}
        Point Measurement
      </li>
      <li id='start-line' class='link'>
        ${polylineIcon()}
        Line Measurement
      </li>
      <li id='start-area' class='link'>
        ${polygonIcon()}
        Area Measurement
      </li>
      <li id='undo-last' class='link existing'>
        ${polygonIcon()}
        Undo Last
      </li>
      <li id='delete-all' class='link existing'>
        ${polygonIcon()}
        Clear All
      </li>
    </ul>
  </div>`;
}

function rulerIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' version="1.1" id="designs" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
  <style type="text/css">
    .sketchy_een{fill:#111918;}
  </style>
  <path class="sketchy_een" d="M30.966,7.69c-0.039-0.142-0.112-0.268-0.217-0.372c-0.157-0.157-0.373-0.247-0.595-0.248
    c-0.033-0.028-0.065-0.057-0.099-0.084c-0.242-0.193-0.455-0.42-0.682-0.628c-0.228-0.209-0.457-0.418-0.684-0.626
    c-0.236-0.221-0.463-0.453-0.701-0.672c-0.485-0.441-0.932-0.918-1.369-1.405c-0.396-0.443-0.763-0.911-1.142-1.369
    c0.076-0.291-0.008-0.604-0.22-0.816c-0.167-0.167-0.376-0.244-0.585-0.244c-0.279,0-0.558,0.139-0.73,0.389
    c-0.102,0.109-0.216,0.211-0.32,0.316c-0.227,0.223-0.459,0.437-0.682,0.662c-0.254,0.26-0.498,0.526-0.768,0.772
    c-0.286,0.26-0.573,0.516-0.859,0.776c-0.593,0.546-1.19,1.087-1.781,1.637c-0.579,0.536-1.168,1.064-1.737,1.609
    c-0.593,0.569-1.219,1.101-1.822,1.661c-0.601,0.557-1.223,1.091-1.814,1.661c-1.152,1.111-2.263,2.265-3.436,3.357
    c-0.619,0.575-1.243,1.146-1.864,1.722c-0.591,0.548-1.16,1.119-1.737,1.68c-0.587,0.571-1.154,1.16-1.728,1.745
    c-0.569,0.579-1.17,1.127-1.743,1.704c-0.362,0.364-0.739,0.715-1.111,1.07c-0.443,0.424-0.869,0.859-1.29,1.304
    c-0.325,0.341-0.341,0.884,0,1.223c0.106,0.106,0.243,0.168,0.387,0.207c0.02,0.027,0.03,0.058,0.053,0.083
    c0.542,0.569,1.119,1.103,1.67,1.665c0.483,0.491,0.967,0.983,1.432,1.489c0.205,0.223,0.424,0.427,0.634,0.642
    c0.193,0.197,0.368,0.408,0.554,0.609c0.408,0.445,0.814,0.884,1.237,1.314c0.111,0.112,0.254,0.166,0.402,0.188
    c0.096,0.041,0.199,0.065,0.305,0.065c0.217,0,0.382-0.091,0.544-0.227c0.628-0.526,1.192-1.117,1.743-1.722
    c0.526-0.579,1.062-1.148,1.609-1.706c0.516-0.522,1.04-1.036,1.535-1.58c0.534-0.587,1.083-1.158,1.643-1.72
    c1.093-1.099,2.212-2.171,3.307-3.268c1.083-1.087,2.147-2.193,3.237-3.274c0.534-0.53,1.083-1.04,1.617-1.566
    c0.571-0.561,1.145-1.119,1.726-1.669c0.268-0.254,0.542-0.5,0.812-0.751c0.288-0.266,0.565-0.544,0.847-0.816
    c0.549-0.524,1.101-1.049,1.671-1.551c0.072-0.039,0.141-0.083,0.197-0.139c0.019-0.019,0.029-0.045,0.046-0.066
    c0.217-0.177,0.437-0.351,0.638-0.546c0.258-0.25,0.502-0.516,0.76-0.766c0.205-0.199,0.418-0.4,0.636-0.587
    c0.118-0.1,0.201-0.195,0.297-0.327c0.118-0.162,0.232-0.376,0.205-0.581C30.986,7.839,30.976,7.764,30.966,7.69z M28.014,9.206
    C27.91,9.1,27.808,8.992,27.705,8.889c-0.28-0.278-0.565-0.554-0.851-0.827c-0.177-0.17-0.408-0.257-0.638-0.257
    c-0.226,0-0.452,0.084-0.625,0.257c-0.337,0.337-0.355,0.93,0,1.263c0.288,0.272,0.575,0.546,0.869,0.81
    c0.102,0.092,0.204,0.187,0.306,0.282c-0.137,0.135-0.277,0.267-0.411,0.404c-0.29,0.295-0.579,0.587-0.869,0.881
    c-0.048,0.049-0.097,0.097-0.145,0.147c-0.308-0.283-0.593-0.591-0.883-0.893c-0.38-0.396-0.784-0.77-1.19-1.141
    c-0.178-0.161-0.403-0.248-0.627-0.248c-0.214,0-0.426,0.079-0.595,0.248c-0.315,0.313-0.357,0.914,0,1.221
    c0.388,0.335,0.78,0.664,1.174,0.995c0.329,0.275,0.681,0.546,0.96,0.873c0.014,0.019,0.031,0.03,0.045,0.048
    c-0.38,0.364-0.762,0.727-1.138,1.094c-0.277,0.272-0.554,0.544-0.829,0.816c-0.012-0.009-0.022-0.02-0.034-0.028
    c-0.373-0.307-0.714-0.661-1.073-0.983c-0.178-0.159-0.401-0.245-0.622-0.245c-0.21,0-0.418,0.078-0.584,0.245
    c-0.309,0.307-0.357,0.906,0,1.208c0.238,0.201,0.479,0.398,0.723,0.595c0.144,0.116,0.287,0.236,0.426,0.358
    c-0.443,0.438-0.879,0.881-1.318,1.323c-0.177,0.18-0.356,0.357-0.532,0.538c-0.026-0.017-0.045-0.044-0.072-0.058
    c-0.245-0.231-0.47-0.488-0.708-0.725c-0.404-0.404-0.814-0.802-1.231-1.194c-0.174-0.163-0.398-0.248-0.621-0.248
    c-0.217,0-0.432,0.08-0.6,0.248c-0.321,0.321-0.349,0.906,0,1.223c0.416,0.376,0.835,0.749,1.257,1.119
    c0.163,0.142,0.327,0.282,0.492,0.422c0.11,0.096,0.225,0.187,0.331,0.287c0.01,0.02,0.031,0.029,0.043,0.048
    c-0.536,0.546-1.066,1.097-1.614,1.631c-0.141,0.138-0.285,0.273-0.427,0.41c-0.128-0.12-0.241-0.262-0.359-0.39
    c-0.207-0.225-0.418-0.447-0.632-0.668c-0.164-0.167-0.385-0.25-0.607-0.25c-0.224,0-0.449,0.084-0.615,0.25
    c-0.329,0.331-0.335,0.892,0,1.221c0.238,0.232,0.479,0.463,0.725,0.688c0.102,0.092,0.209,0.183,0.313,0.277
    c-0.017,0.016-0.034,0.033-0.051,0.049c-0.557,0.53-1.121,1.06-1.655,1.613c-0.072,0.075-0.144,0.149-0.216,0.224
    c-0.081-0.125-0.185-0.235-0.322-0.301c-0.242-0.223-0.463-0.472-0.692-0.706c-0.335-0.341-0.67-0.682-1.003-1.022
    c-0.163-0.166-0.383-0.247-0.604-0.247c-0.223,0-0.445,0.083-0.61,0.247c-0.327,0.327-0.335,0.888,0,1.213
    c0.36,0.349,0.729,0.689,1.103,1.02c0.266,0.234,0.559,0.455,0.8,0.717c0.061,0.086,0.144,0.154,0.236,0.211
    c-0.096,0.098-0.188,0.199-0.285,0.295c-0.423,0.42-0.85,0.834-1.277,1.249c-0.023-0.014-0.041-0.035-0.066-0.046
    c-0.003-0.001-0.006-0.003-0.009-0.004c-0.157-0.142-0.302-0.299-0.45-0.449c-0.258-0.262-0.518-0.522-0.78-0.78
    c-0.161-0.159-0.375-0.239-0.589-0.239c-0.213,0-0.425,0.079-0.585,0.239c-0.313,0.315-0.327,0.863,0,1.176
    c0.272,0.258,0.55,0.512,0.827,0.764c0.165,0.148,0.331,0.303,0.503,0.448c-0.453,0.434-0.917,0.853-1.395,1.258
    c-0.034-0.033-0.071-0.063-0.106-0.096c-0.25-0.238-0.481-0.494-0.699-0.76c-0.175-0.211-0.337-0.427-0.526-0.626
    c-0.205-0.215-0.422-0.418-0.636-0.624c-0.491-0.471-0.946-0.987-1.391-1.501c-0.466-0.535-0.955-1.051-1.439-1.572
    c0.135-0.154,0.272-0.306,0.407-0.461c0.262-0.301,0.544-0.585,0.812-0.883c0.286-0.319,0.563-0.642,0.861-0.951
    c0.292-0.301,0.595-0.591,0.89-0.89c0.565-0.577,1.111-1.176,1.665-1.763c0.565-0.599,1.156-1.172,1.741-1.749
    c1.133-1.119,2.311-2.193,3.463-3.29c0.609-0.579,1.21-1.168,1.814-1.751c0.278-0.268,0.552-0.54,0.835-0.8
    c0.333-0.305,0.676-0.601,1.014-0.9c0.286-0.25,0.563-0.51,0.847-0.762c0.305-0.272,0.622-0.526,0.93-0.792
    c0.303-0.264,0.595-0.544,0.894-0.814c0.297-0.272,0.603-0.536,0.9-0.808c0.579-0.532,1.17-1.05,1.747-1.584
    c0.589-0.544,1.196-1.064,1.781-1.607c0.262-0.244,0.521-0.491,0.787-0.729c0.402,0.432,0.803,0.866,1.202,1.3
    c0.443,0.481,0.875,0.975,1.34,1.434c0.451,0.445,0.916,0.873,1.373,1.31c0.231,0.223,0.472,0.439,0.704,0.662
    c-0.1,0.106-0.2,0.212-0.295,0.324C28.488,8.678,28.254,8.946,28.014,9.206z M11.633,24.913c-0.006-0.008-0.012-0.016-0.018-0.023
    c-0.002-0.006-0.003-0.011-0.005-0.017C11.618,24.886,11.625,24.9,11.633,24.913z"/>
  </svg>`;
}

function checkIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 24 24">
    <path d="M9.6,17.4L16.8,12L9.6,6.6ZM12,0C5.37,0 4.44089e-16,5.37 4.44089e-16,12C4.44089e-16,18.63 5.37,24 12,24C18.63,24 24,18.63 24,12C24,5.37 18.63,0 12,0ZM12,21.6C6.708,21.6 2.4,17.292 2.4,12C2.4,6.708 6.708,2.4 12,2.4C17.292,2.4 21.6,6.708 21.6,12C21.6,17.292 17.292,21.6 12,21.6Z" fill="#5E66CC"></path>
  </svg>`;
}

function cancelIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="100%" height="100%" viewBox="0 0 24 24">
    <path d="M12,0C5.37,0 4.44089e-16,5.37 4.44089e-16,12C4.44089e-16,18.63 5.37,24 12,24C18.63,24 24,18.63 24,12C24,5.37 18.63,0 12,0ZM18,16.302L16.302,18L12,13.698L7.698,18L6,16.302L10.302,12L6,7.698L7.698,6L12,10.302L16.302,6L18,7.698L13.698,12Z" fill="#5E66CC"></path>
  </svg>`;
}

function undoIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' width="100%" height="100%" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <g data-name="Layer 2">
      <g data-name="undo">
        <rect width="100%" height="100%" transform="rotate(-90 12 12)" opacity="0" />
        <path d="M20.22 21a1 1 0 0 1-1-.76 8.91 8.91 0 0 0-7.8-6.69v1.12a1.78 1.78 0 0 1-1.09 1.64A2 2 0 0 1 8.18 16l-5.06-4.41a1.76 1.76 0 0 1 0-2.68l5.06-4.42a2 2 0 0 1 2.18-.3 1.78 1.78 0 0 1 1.09 1.64V7A10.89 10.89 0 0 1 21.5 17.75a10.29 10.29 0 0 1-.31 2.49 1 1 0 0 1-1 .76z" />
      </g>
    </g>
  </svg>`;
}

function deleteAllIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' version="1.1" baseProfile="tiny" id="Layer_1" xmlns:x="&ns_extend;" xmlns:i="&ns_ai;" xmlns:graph="&ns_graphs;"
    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
    x="0px" y="0px" width="42px" height="42px" viewBox="-0.5 0.5 42 42" xml:space="preserve">
  <path d="M12.5,16.5v17h3v-17H12.5z M18.5,16.5v17h3v-17H18.5z M24.5,16.5v17h3v-17H24.5z M27.5,4.5c0-2.5-0.609-3-3-3h-10
    c-2.52,0-2.98,0.55-2.98,3.01L11.5,7.5h-8c-1.48,0-2,0.49-2,2v1c0,1.55,0.52,2,2,2h1v26c0,2.49,0.55,3,3,3h24c2.5,0,4-0.471,4-3v-26
    h1c1.51,0,2-0.48,2-2v-1c0-1.48-0.43-2-2-2h-9V4.5z M24.5,4.5v3h-10v-3H24.5z M9.5,12.5h21v24h-21V12.5z"/>
  </svg>`;
}

function lineIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' width="15px" height="15px" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
    <path d="M1.5 0C0.671573 0 0 0.671573 0 1.5C0 2.32843 0.671573 3 1.5 3C1.73157 3 1.95089 2.94752 2.14671 2.85381L12.1462 12.8533C12.0525 13.0491 12 13.2684 12 13.5C12 14.3284 12.6716 15 13.5 15C14.3284 15 15 14.3284 15 13.5C15 12.6716 14.3284 12 13.5 12C13.2684 12 13.0491 12.0525 12.8533 12.1462L2.85381 2.14671C2.94752 1.95089 3 1.73157 3 1.5C3 0.671573 2.32843 0 1.5 0Z" />
  </svg>`;
}

function closeIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
    width="100px" height="100px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve">
  <path d="M84.707,68.752L65.951,49.998l18.75-18.752c0.777-0.777,0.777-2.036,0-2.813L71.566,15.295
    c-0.777-0.777-2.037-0.777-2.814,0L49.999,34.047l-18.75-18.752c-0.746-0.747-2.067-0.747-2.814,0L15.297,28.431
    c-0.373,0.373-0.583,0.88-0.583,1.407c0,0.527,0.21,1.034,0.583,1.407L34.05,49.998L15.294,68.753
    c-0.373,0.374-0.583,0.88-0.583,1.407c0,0.528,0.21,1.035,0.583,1.407l13.136,13.137c0.373,0.373,0.881,0.583,1.41,0.583
    c0.525,0,1.031-0.21,1.404-0.583l18.755-18.755l18.756,18.754c0.389,0.388,0.896,0.583,1.407,0.583c0.511,0,1.019-0.195,1.408-0.583
    l13.138-13.137C85.484,70.789,85.484,69.53,84.707,68.752z"/>
  </svg>
`;
}

function pointIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M21,11H19.93A8,8,0,0,0,13,4.07V3a1,1,0,0,0-2,0V4.07A8,8,0,0,0,4.07,11H3a1,1,0,0,0,0,2H4.07A8,8,0,0,0,11,19.93V21a1,1,0,0,0,2,0V19.93A8,8,0,0,0,19.93,13H21a1,1,0,0,0,0-2Zm-4,2h.91A6,6,0,0,1,13,17.91V17a1,1,0,0,0-2,0v.91A6,6,0,0,1,6.09,13H7a1,1,0,0,0,0-2H6.09A6,6,0,0,1,11,6.09V7a1,1,0,0,0,2,0V6.09A6,6,0,0,1,17.91,11H17a1,1,0,0,0,0,2Zm-5-2a1,1,0,1,0,1,1A1,1,0,0,0,12,11Z" />
  </svg>`;
}

function polylineIcon() {
  return `
  <svg class='leaflet-measure-menu-icon measure-toggle' width="100px" height="100px" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" class="iconify iconify--gis" preserveAspectRatio="xMidYMid meet">
    <path d="M32.55 11C25.662 11 20 16.661 20 23.55c0 3.887 1.802 7.38 4.61 9.688L14.481 54.166a12.33 12.33 0 0 0-1.93-.166C5.66 54 0 59.661 0 66.55C0 73.44 5.661 79.1 12.55 79.1c6.652 0 12.106-5.288 12.48-11.852a3.5 3.5 0 0 0 .07-.697a3.5 3.5 0 0 0-.07-.697c-.196-3.441-1.797-6.522-4.225-8.684L31.049 36c.494.06.993.1 1.502.1c4.613 0 8.647-2.546 10.812-6.295l17.807 4.707c.934 5.845 5.95 10.384 12.002 10.568l7.006 21.356C77.052 68.726 75 72.412 75 76.55c0 6.89 5.661 12.55 12.55 12.55c6.652 0 12.106-5.288 12.48-11.852a3.5 3.5 0 0 0 .07-.697a3.5 3.5 0 0 0-.07-.697C99.655 69.29 94.201 64 87.55 64c-.266 0-.527.022-.79.04l-6.805-20.743c3.451-2.09 5.832-5.797 6.074-10.049a3.5 3.5 0 0 0 .07-.697a3.5 3.5 0 0 0-.07-.697C85.656 25.29 80.202 20 73.551 20c-5.1 0-9.519 3.106-11.475 7.512l-17.02-4.5a3.5 3.5 0 0 0-.027-.158C44.656 16.29 39.202 11 32.551 11zm0 7c3.107 0 5.55 2.444 5.55 5.55c0 3.107-2.443 5.55-5.55 5.55c-3.106 0-5.55-2.443-5.55-5.55c0-3.106 2.444-5.55 5.55-5.55zm41 9c3.107 0 5.55 2.444 5.55 5.55c0 3.107-2.443 5.55-5.55 5.55c-3.106 0-5.55-2.443-5.55-5.55c0-3.106 2.444-5.55 5.55-5.55zm-61 34c3.107 0 5.55 2.444 5.55 5.55c0 3.107-2.443 5.55-5.55 5.55C9.445 72.1 7 69.657 7 66.55C7 63.445 9.444 61 12.55 61zm75 10c3.107 0 5.55 2.444 5.55 5.55c0 3.107-2.443 5.55-5.55 5.55c-3.106 0-5.55-2.443-5.55-5.55c0-3.106 2.444-5.55 5.55-5.55z" fill="currentColor"></path>
  </svg>`;
}

function polygonIcon() {
  return `
  <svg class='leaflet-measure-menu-icon' width="48px" height="48px" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M14 40C15.1046 40 16 39.1046 16 38C16 36.8954 15.1046 36 14 36C12.8954 36 12 36.8954 12 38C12 39.1046 12.8954 40 14 40ZM14 42C16.2091 42 18 40.2091 18 38C18 35.7909 16.2091 34 14 34C11.7909 34 10 35.7909 10 38C10 40.2091 11.7909 42 14 42Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M10 22C11.1046 22 12 21.1046 12 20C12 18.8954 11.1046 18 10 18C8.89543 18 8 18.8954 8 20C8 21.1046 8.89543 22 10 22ZM10 24C12.2091 24 14 22.2091 14 20C14 17.7909 12.2091 16 10 16C7.79086 16 6 17.7909 6 20C6 22.2091 7.79086 24 10 24Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M38 22C39.1046 22 40 21.1046 40 20C40 18.8954 39.1046 18 38 18C36.8954 18 36 18.8954 36 20C36 21.1046 36.8954 22 38 22ZM38 24C40.2091 24 42 22.2091 42 20C42 17.7909 40.2091 16 38 16C35.7909 16 34 17.7909 34 20C34 22.2091 35.7909 24 38 24Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M34 40C35.1046 40 36 39.1046 36 38C36 36.8954 35.1046 36 34 36C32.8954 36 32 36.8954 32 38C32 39.1046 32.8954 40 34 40ZM34 42C36.2091 42 38 40.2091 38 38C38 35.7909 36.2091 34 34 34C31.7909 34 30 35.7909 30 38C30 40.2091 31.7909 42 34 42Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M24 12C25.1046 12 26 11.1046 26 10C26 8.89543 25.1046 8 24 8C22.8954 8 22 8.89543 22 10C22 11.1046 22.8954 12 24 12ZM24 14C26.2091 14 28 12.2091 28 10C28 7.79086 26.2091 6 24 6C21.7909 6 20 7.79086 20 10C20 12.2091 21.7909 14 24 14Z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M34.9188 19.028L25.9188 12.5995L27.0812 10.972L36.0812 17.4006L34.9188 19.028ZM21.7844 12.8115L13.0812 19.028L11.9188 17.4006L20.622 11.184L21.7844 12.8115ZM11.6429 22.7831L14.3095 34.7831L12.3572 35.2169L9.69049 23.2169L11.6429 22.7831ZM33.6905 34.7831L36.246 23.2831L38.1984 23.7169L35.6429 35.2169L33.6905 34.7831ZM17 37H31V39H17V37Z"/>
  </svg>`;
}

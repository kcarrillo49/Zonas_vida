// Objeto de mapa Leaflet
var map = L.map("mapaid").setView([9.5, -84], 8);

// Capa base Positron de Carto
carto_positron = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
    subdomains: "abcd",
    maxZoom: 20,
  }
).addTo(map);

L.marker([10.21571, -83.77201]).addTo(map)
        .bindPopup('CIA-Los Diamantes')
        .openPopup();

L.marker([10.34317, -85.1360]).addTo(map)
        .bindPopup('CIA-EJN')
        .openPopup();



// Capa base de OSM Mapnik
var osm_mapnik = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
});

// Capa base de ESRI World Imagery
var esri_imagery = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
  }
);

// Objeto con capas base
var capasBase = {
  Positron: carto_positron,
  OSM: osm_mapnik,
  "ESRI World Imagery": esri_imagery,
};

// Control de capas
control_capas = L.control
  .layers(capasBase, null, { collapsed: false })
  .addTo(map);

// Control de escala
L.control.scale().addTo(map);

// Capa WMS de zonas de vida Holdridge
var zonas = L.tileLayer
  .wms("https://geodatos.sinia.go.cr/geoserver/CENIGA/wms?", {
    layers: "zonasdevida",
    format: "image/png",
    transparent: true,
  })
  .addTo(map);

// Se agrega al control de capas como una capa de tipo "overlay"
control_capas.addOverlay(zonas, "Zonas de Vida Holdridge");

uri2 ="https://geodatos.sinia.go.cr/geoserver/CENIGA/wms?REQUEST=GetLegendGraphic&FORMAT=image/png&WIDTH=15&HEIGHT=15&LAYER=zonasdevida";
L.wmsLegend(uri2);

export const makeGeoJsonPointFromPoi = poi => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [poi.lon, poi.lat]
  },
  properties: {
    name: poi.name
  }
});

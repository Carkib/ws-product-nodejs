export const makeGeoJsonPointFromPoi = poi => ({
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [poi.lon, poi.lat]
  },
  properties: {
    name: poi.name,
    poiId: poi.poi_id
  }
});

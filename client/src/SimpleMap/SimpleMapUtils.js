import Supercluster from "supercluster";

export const groupIntoCluster = (geoJsonPoints, zoom) => {
  const index = new Supercluster({
    radius: 40,
    maxZoom: 16
  });
  index.load(geoJsonPoints);
  return index.getClusters([-180, -85, 180, 85], zoom);
};

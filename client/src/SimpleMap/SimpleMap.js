import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Header, Icon } from "semantic-ui-react";
import { groupIntoCluster } from "./SimpleMapUtils";

const SemanticUIMarker = ({ name, color }) => (
  <Header as="h3">
    <Icon color={color} name="map marker alternate" />
    {name}
  </Header>
);

const SemanticUICluster = ({ amount, index }) => (
  <Header as="h3">
    <Icon color="red" name="dot circle outline" />
    {amount}
  </Header>
);

class SimpleMap extends Component {
  state = {
    zoom: 1
  };

  handleChange = mapProps => {
    if (mapProps.zoom !== this.state.zoom) {
      this.setState({ zoom: mapProps.zoom });
    }
  };

  render() {
    return (
      <>
        <div style={{ height: "100vh", width: "100%" }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
            defaultCenter={{ lng: -79.3899, lat: 43.6708 }}
            defaultZoom={1}
            onChange={this.handleChange}
          >
            {groupIntoCluster(this.props.geoJsonPoints, this.state.zoom).map(
              (point, index) =>
                point.properties.cluster ? (
                  <SemanticUICluster
                    key={index}
                    lng={point.geometry.coordinates[0]}
                    lat={point.geometry.coordinates[1]}
                    amount={point.properties.point_count}
                  />
                ) : (
                  <SemanticUIMarker
                    key={index}
                    lng={point.geometry.coordinates[0]}
                    lat={point.geometry.coordinates[1]}
                    name={point.properties.name}
                    color={point.color}
                  />
                )
            )}
          </GoogleMapReact>
        </div>
      </>
    );
  }
}

export default SimpleMap;

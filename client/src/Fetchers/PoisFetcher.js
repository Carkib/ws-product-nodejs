import React from "react";
import { makeGeoJsonPointFromPoi } from "./PoisFetcherUtils";

class PoisFetcher extends React.Component {
  state = {
    isLoading: true,
    pois: [],
    error: null
  };

  componentDidMount() {
    this.fetchPois();
  }

  fetchPois = () => {
    fetch(`http://localhost:5555/poi`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          pois: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  };
  render() {
    const { loading, pois } = this.state;
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        geoJsonPoints: pois.map(makeGeoJsonPointFromPoi)
      })
    );

    return loading ? null : (
      <React.Fragment>{childrenWithProps}</React.Fragment>
    );
  }
}

export default PoisFetcher;

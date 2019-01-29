import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "react-calendar-heatmap/dist/styles.css";
import MainContainer from "./MainContainer/MainContainer";
import { Header, Container, Divider } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Divider />
        <Container>
          <Header as="h1">WS-PRODUCT REACT</Header>
        </Container>
        <Divider />
        <MainContainer />
      </div>
    );
  }
}

export default App;

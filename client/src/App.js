import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import BasicTable from "./BasicTable/BasicTable";
import EventsFetcher from "./Fetchers/EventsFetcher";
import { Container } from "semantic-ui-react";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <EventsFetcher>
            <BasicTable events={[]} />
          </EventsFetcher>
        </Container>
      </div>
    );
  }
}

export default App;

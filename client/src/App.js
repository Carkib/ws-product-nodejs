import React, { Component } from "react";
import "semantic-ui-css/semantic.min.css";
import "react-calendar-heatmap/dist/styles.css";

import BasicTable from "./BasicTable/BasicTable";
import EventsFetcher from "./Fetchers/EventsFetcher";
import { Container } from "semantic-ui-react";
import { CalendarView } from "./CalendarView/CalendarView";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <EventsFetcher hourly>
            <BasicTable events={[]} />
          </EventsFetcher>
          <EventsFetcher daily>
            <CalendarView events={[]} />
          </EventsFetcher>
        </Container>
      </div>
    );
  }
}

export default App;

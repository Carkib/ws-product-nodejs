import React from "react";

import BasicTable from "../BasicTable/BasicTable";
import EventsFetcher from "../Fetchers/EventsFetcher";
import { Container, Step, Divider } from "semantic-ui-react";
import { CalendarView } from "../CalendarView/CalendarView";
import FuzzySearch from "../BasicTable/FuzzySearch/FuzzySearch";
import { ProgressStep } from "./ProgressStep/ProgressStep";
import { COMMIT, BORING, FUZZY, GEO } from "./MainContainerUtils";

class MainContainer extends React.Component {
  state = {
    activeTab: "commit"
  };

  switchTab = tabName => () => {
    this.setState({ activeTab: tabName });
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Container>
        <Step.Group>
          <ProgressStep
            active={activeTab === COMMIT}
            onClick={this.switchTab(COMMIT)}
            icon={"github"}
            title="Daily HeatMap"
            description="Are those events commits?"
            popupText="If so that guy is a beast"
          />
          <ProgressStep
            active={activeTab === BORING}
            onClick={this.switchTab(BORING)}
            icon={"table"}
            title="Boring Table"
            description="Semantic UI is very nice though"
            popupText="And checkout that pagination"
          />
          <ProgressStep
            active={activeTab === FUZZY}
            onClick={this.switchTab(FUZZY)}
            icon={"search"}
            title="Same Table, searchable"
            description="I wish that was all client-side"
            popupText="But no.. had to handle 'beyond the sample scale'"
          />

          <ProgressStep
            active={activeTab === GEO}
            onClick={this.switchTab(GEO)}
            icon={"map"}
            title="Some map"
            description="some description"
          />
        </Step.Group>
        <Divider />
        {activeTab === COMMIT && (
          <EventsFetcher daily>
            <CalendarView events={[]} />
          </EventsFetcher>
        )}
        {activeTab === BORING && (
          <EventsFetcher hourly>
            <BasicTable events={[]} paginated />
          </EventsFetcher>
        )}
        {activeTab === FUZZY && (
          <EventsFetcher hourly>
            <FuzzySearch events={[]} />
          </EventsFetcher>
        )}
        {activeTab === GEO && (
          <EventsFetcher hourly>
            <FuzzySearch events={[]} />
          </EventsFetcher>
        )}
      </Container>
    );
  }
}

export default MainContainer;

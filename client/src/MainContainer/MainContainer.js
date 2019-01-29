import React from "react";

import BasicTable from "../BasicTable/BasicTable";
import EventsFetcher from "../Fetchers/EventsFetcher";
import { Container, Step, Divider } from "semantic-ui-react";
import { CalendarView } from "../CalendarView/CalendarView";
import FuzzySearch from "../BasicTable/FuzzySearch/FuzzySearch";
import { ProgressStep } from "./ProgressStep/ProgressStep";
import { COMMIT, BORING, FUZZY, GEO } from "./MainContainerUtils";
import PoisFetcher from "../Fetchers/PoisFetcher";
import SimpleMap from "../SimpleMap/SimpleMap";

class MainContainer extends React.Component {
  state = {
    activeTab: BORING
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
            active={activeTab === BORING}
            onClick={this.switchTab(BORING)}
            icon={"table"}
            title="Boring Table"
            description="Semantic UI is very nice though"
            popupText="And checkout that pagination"
          />

          <ProgressStep
            active={activeTab === COMMIT}
            onClick={this.switchTab(COMMIT)}
            icon={"github"}
            title="Daily HeatMap"
            description="Are those commits? Probably not.."
            popupText="but if so that guy is a beast"
          />

          <ProgressStep
            active={activeTab === FUZZY}
            onClick={this.switchTab(FUZZY)}
            icon={"search"}
            title="Same Table But Searchable"
            description="I wish that search was client-side"
            popupText="I could have used that sweet premade semantic-ui one."
          />

          <ProgressStep
            active={activeTab === GEO}
            onClick={this.switchTab(GEO)}
            icon={"map"}
            title="Specific Map"
            description="Show it to your friends!"
            popupText="Let's say close family.. Let's keep it free shall we?"
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
          <PoisFetcher>
            <SimpleMap />
          </PoisFetcher>
        )}
      </Container>
    );
  }
}

export default MainContainer;

import React from "react";
import { DateInput } from "semantic-ui-calendar-react";
import { Divider, Grid, Image, List, Header } from "semantic-ui-react";
import SimpleMap from "../SimpleMap/SimpleMap";

const colorThresholds = [
  { color: "black", threshold: 1 },
  { color: "blue", threshold: 200 },
  { color: "green", threshold: 400 },
  { color: "yellow", threshold: 700 },
  { color: "orange", threshold: 1000 }
];

class DateDataFetcher extends React.Component {
  state = { date: "2017-01-01", stats: [] };

  componentDidMount() {
    this.fetchStatsForASpecificDate(this.state.date);
  }

  changeDate = (evt, calendarObject) => {
    const date = calendarObject.value;
    this.fetchStatsForASpecificDate(date);
  };

  makePointWithColorInfo = point => ({
    ...point,
    color: this.getColorForPoint(point),
    clicks: this.getClicksForPoint(point)
  });

  getClicksForPoint = point => {
    const foundStat = this.state.stats.find(
      stat => stat.poi_id === point.properties.poiId
    );
    return foundStat ? foundStat.clicks : 0;
  };

  getColorForPoint = point => {
    const clicks = this.getClicksForPoint(point);
    const colorThreshold = colorThresholds.find(
      colorThreshold => colorThreshold.threshold > clicks
    );
    return colorThreshold ? colorThreshold.color : "red";
  };

  fetchStatsForASpecificDate = date => {
    fetch(`http://localhost:5555/stats/daily?date=${date}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          date: date,
          stats: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  };

  render() {
    const { geoJsonPoints } = this.props;
    const { date } = this.state;
    const pointWithClicksInfo = geoJsonPoints.map(this.makePointWithColorInfo);

    return (
      <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column>
            <DateInput
              inline
              name="date"
              dateFormat="YYYY-MM-DD"
              placeholder="Date"
              value={date}
              iconPosition="left"
              onChange={this.changeDate}
            />
          </Grid.Column>
          <Grid.Column>
            <Header as="h3">Click Counter, more clicks = hotter color!</Header>

            <List>
              {pointWithClicksInfo.map(point => (
                <List.Item key={point.properties.name}>
                  <List.Icon name="marker" color={point.color} />
                  <List.Content>{`
                  ${point.properties.name}
                  ${point.clicks}`}</List.Content>
                </List.Item>
              ))}
            </List>
          </Grid.Column>
        </Grid.Row>

        <Divider />
        <SimpleMap geoJsonPoints={pointWithClicksInfo} />
      </Grid>
    );
  }
}

export default DateDataFetcher;

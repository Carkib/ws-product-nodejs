import React, { Component, Fragment } from "react";
import { Search } from "semantic-ui-react";
import { debounce } from "lodash";
import BasicTable from "../BasicTable";

export default class FuzzySearch extends Component {
  state = {
    events: [],
    value: ""
  };

  fetchEventFuzzy = debounce(() => {
    console.log(this.state.value);
    fetch(`http://localhost:5555/fuzzy?search=${this.state.value}`)
      .then(response => response.json())
      .then(
        data =>
          console.log(data) ||
          this.setState({
            events: data,
            isLoading: false
          })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }, 300);

  handleSearchChange = (e, { value }) => {
    this.setState({
      isLoading: true,
      value
    });
    this.fetchEventFuzzy(value);
  };

  render() {
    const { isLoading, value, events } = this.state;

    return (
      <Fragment>
        <Search
          loading={isLoading}
          onSearchChange={this.handleSearchChange}
          value={value}
          showNoResults={false}
        />
        <BasicTable events={events} highlightedText={value} />
      </Fragment>
    );
  }
}

import React from "react";

class EventsFetcher extends React.Component {
  state = {
    isLoading: true,
    events: [],
    error: null
  };

  componentDidMount() {
    this.fetchEvents(1);
  }

  fetchEvents = pageNumber => {
    fetch(`http://localhost:5555/events/hourly?page=${pageNumber}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          events: data,
          isLoading: false,
          pageNumber
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  };

  changePage = pageNumber => {
    this.fetchEvents(pageNumber);
  };

  render() {
    const { loading, events } = this.state;
    const { children } = this.props;
    console.log("events", events);

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, {
        events,
        changePage: this.changePage,
        currentPage: this.state.pageNumber
      })
    );

    return loading ? null : (
      <React.Fragment>{childrenWithProps}</React.Fragment>
    );
  }
}

export default EventsFetcher;

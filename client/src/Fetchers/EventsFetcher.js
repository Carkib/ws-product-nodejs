import React from "react";

class EventsFetcher extends React.Component {
  state = {
    isLoading: true,
    events: [],
    error: null
  };

  componentDidMount() {
    if (this.props.hourly) {
      this.fetchEventHourly(1);
    }
    if (this.props.daily) {
      this.fetchEventDaily();
    }
  }

  fetchEventDaily = () => {
    fetch(`http://localhost:5555/events/daily`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          events: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  };

  fetchEventHourly = pageNumber => {
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
    this.fetchEventHourly(pageNumber);
  };

  render() {
    const { loading, events } = this.state;
    const { children } = this.props;

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

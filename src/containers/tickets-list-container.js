import React, { Component } from "react";
import TicketsList from "../components/tickets-list";
import withAviasalesService from "../components/hoc";
import ErrorIndicator from "../components/error-indicator";
import Spinner from "../components/spinner/";
import { connect } from "react-redux";
import { ticketsRequest, ticketsLoaded, ticketsError } from "../actions";

class TicketsListContainer extends Component {
  componentDidMount() {
    let data;
    const {
      aviasalesService,
      ticketsLoaded,
      ticketsError
    } = this.props;
    aviasalesService
      .getTickets()
      .then(res => {
        console.log(res);
        data = res.tickets;

        ticketsLoaded(data);
      })
      .catch(error => {
        ticketsError(error.message);
      });
  }


  render() {
    const { tickets, isTicketsLoaded, error } = this.props;
    const spinner = !isTicketsLoaded  && !error ? <Spinner /> : null;
    const hasData = isTicketsLoaded || error;
    const errorMessage = error ? <ErrorIndicator /> : null;
    const content = hasData ? <TicketsList tickets={tickets} /> : null;

    return (
      <React.Fragment>
        {errorMessage}
        {spinner}
        {content}
      </React.Fragment>
    );
  }
}

const sortByPrice = (a, b) => {
  return a.price < b.price ? -1 : a.price > b.price ? 1 : 0;
};
const sortByDuration = (a, b) => {
  return a.summDuration() < b.summDuration()
    ? -1
    : a.summDuration() > b.summDuration()
    ? 1
    : 0;
};

function sortAndFilter(tickets, stopsValue, sortValue) {
  let newTickets = tickets;

  for (let segment of newTickets) {
    segment.summDuration = function() {
      return this.segments.reduce((prev, curr) => {
        return prev + curr.duration;
      }, 0);
    };
  }

  newTickets = stopsValue.all
    ? tickets
    : tickets.filter(ticket => {
        let ticketStopsQuantity = 0;
        for (let segment of ticket.segments) {
          ticketStopsQuantity += segment.stops.length;
        }
        if (stopsValue[ticketStopsQuantity]) {
          return true;
        }
        return false;
      });
  if (sortValue === "sortByPrice") {
    newTickets = newTickets.sort(sortByPrice);
  } else if (sortValue === "sortByDuration") {
    newTickets = newTickets.sort(sortByDuration);
  }
  return newTickets.slice(0, 5);
}

const mapStateToProps = ({
  tickets,
  isTicketsLoaded,
  stopsValue,
  sortValue,
  error
}) => {
  return {
    tickets: sortAndFilter(tickets, stopsValue, sortValue),
    isTicketsLoaded,
    error,
  };
};

const mapDispatchToProps = {
  ticketsLoaded,
  ticketsRequest,
  ticketsError
};

export default withAviasalesService()(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TicketsListContainer)
);

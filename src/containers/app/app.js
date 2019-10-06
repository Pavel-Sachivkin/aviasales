import React from "react";
import './app.css';
import { loadTickets, setSortType, setStops,} from '../../actions/tickets';
import { connect } from 'react-redux';
import Ticket from '../../components/tickets-list-item';






class App extends React.Component {
	
	constructor(props) {
		super(props);
		if (this.props.onMount) {
			this.props.onMount();
		}
	}
	
	render() {
		return (
      <main className="page-main">
        <div className="sidebar">
          {!!this.props.isTicketsLoading && <span>loading</span>}
          {!this.props.isTicketsLoading && <span>готово</span>}
          {this.props.stopsCount.map(stop => (
            <label
              className="checkbox"
              onClick={() => {
                if (this.props.onFilter) {
                  console.log("disable ", stop);



                  // this.props.onFilter(this);
                }
              }}
            >
              <input type="checkbox"></input>
              {stop} пересадок
            </label>
          ))}
        </div>

        <div className="content">
          <div className="content__button">
            <h2
              onClick={() => {
                if (this.props.onSort) {
                  this.props.onSort("cheap");
                }
              }}
            >
              Самый дешевый
            </h2>
            <h2
              onClick={() => {
                if (this.props.onSort) {
                  this.props.onSort("expensive");
                }
              }}
            >
              Самый дорогой
            </h2>
          </div>
          {this.props.sortType}
          {this.props.tickets
            .slice(0)
            .filter(ticket => {
              // console.log(ticket.segments);
              

              for (let segments of ticket.segments) {
                let corentStopsCount = segments.stops.length;
                for (let stop of this.props.stops) {

                  if (stop === corentStopsCount) {
                    return true;
                  } else {
                    return false;
                  }

                }
              }
						})
            .sort((a, b) => {
              if (this.props.sortType === "cheap") {
                return a.price - b.price;
              } else return b.price - a.price;
            })
            .map(ticket => (
              <Ticket ticket={ticket} />
            ))}

          {/* {this.props.onFilter}
					{this.props.tickets.slice(0).sort((a, b) => {
						if (this.props.onFilter.checked === true) {
              return a.stops - b.stops;
            }
					})} */}

          {

          }
        </div>
      </main>
    );
	}
}


const mapStateToProps = (state) => ({
	isTicketsLoading: state.loading,
	tickets: state.tickets,
	stopsCount: state.stops,
	sortType: state.sortType,
	stops: state.stops
});

const mapDispatchToProps = (dispatch) => ({
	onMount: () => {
		dispatch(loadTickets())
	},
	onSort: (sortType) => {
		dispatch(setSortType(sortType));
	},
  onFilter: (stopsCount) => {
    dispatch(setStops(stopsCount));
	}
});



export default connect(mapStateToProps, mapDispatchToProps)(App);

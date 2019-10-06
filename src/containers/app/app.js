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
                  this.props.onFilter(stop);


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

              ticket.segments.forEach(segments => {
                // пробегаемся по ticket.segments
                let allStopsInTicket;
                // объявили переменную в которую мы будем добавлять все точки остановок
                allStopsInTicket = segments.stops;
                // добавили в неё данные из ticket.segments.stops
                const allStopsInTicketArr = (Array.from(segments.stops));
                // сделали её массивом

                if (this.props.onFilter === allStopsInTicketArr) {

                  // нужно написать условие: если выбрано (n) пересадок то вы возвращаем билеты со значением ticket.segments.stops(n)

                  return console.log(123);
                }

                console.log(segments.stops);
                // console.log(allStopsInTicketArr);
              });

              

							return true;
              
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

import React from "react";
import './app.css';
import { loadTickets, setSortType } from '../../actions/tickets';
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
				{
					!! this.props.isTicketsLoading &&
					<span>loading</span>
				}
				{
					! this.props.isTicketsLoading &&
					<span>готово</span>
				}
				{
					this.props.stopsCount.map(stop => (
						<div onClick={() => {
							console.log('disable ', stop)
						}}>{stop} пересадок</div>
					))
				}
				<h2 onClick={() => {
					if (this.props.onSort) {
						this.props.onSort('cheap');
					}
				}}>Самый дешевый</h2>
				<h2 onClick={() => {
					if (this.props.onSort) {
						this.props.onSort('expensive');
					}
				}}>Самый дорогой</h2>
				{
					this.props.sortType
				}
				{
					this.props.tickets.slice(0).sort((a, b) => {
						if (this.props.sortType === 'cheap') {
							return a.price - b.price
						}
						
						else return b.price - a.price
					}).map(ticket => (<Ticket ticket={ticket} />))
				}
			</main>
		)
	}
}


const mapStateToProps = (state) => ({
	isTicketsLoading: state.loading,
	tickets: state.tickets,
	stopsCount: state.stops,
	sortType: state.sortType
});

const mapDispatchToProps = (dispatch) => ({
	onMount: () => {
		dispatch(loadTickets())
	},
	onSort: (sortType) => {
		dispatch(setSortType(sortType));
	}
});



export default connect(mapStateToProps, mapDispatchToProps)(App);

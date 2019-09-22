import React from "react";
import './app.css';
import { loadTickets } from '../../actions/tickets';
import { connect } from 'react-redux';
import Ticket from '../../components/tickets-list-item';


class App extends React.Component {
	
	constructor(props) {
		super(props);
		if (this.props.onMount) {
			this.props.onMount()
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
					console.log('sort Самый дешевый');
				}}>Самый дешевый</h2>
				<h2 onClick={() => {
					console.log('sort Самый быстрый');
				}}>Самый быстрый</h2>
				{
					this.props.tickets.map(ticket => (<Ticket ticket={ticket} />))
				}
			</main>
		)
	}
}


const mapStateToProps = (state) => ({
	isTicketsLoading: state.loading,
	tickets: state.tickets,
	stopsCount: state.stops
});

const mapDispatchToProps = (dispatch) => ({
	onMount: () => {
		dispatch(loadTickets())
	},
	onFilter: () => {
	
	}
});



export default connect(mapStateToProps, mapDispatchToProps)(App);

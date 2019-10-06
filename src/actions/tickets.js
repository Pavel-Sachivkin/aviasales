export const loadTickets = () => async dispatch => {
	
	dispatch(loading(true));
	const keyRequest = await fetch('https://front-test.beta.aviasales.ru/search');
	const key = await keyRequest.json();
	const ticketsResponse = await fetch(`https://front-test.beta.aviasales.ru/tickets?searchId=${key.searchId}`);
	const tickets = await ticketsResponse.json();
	
	const stops = new Set();


	tickets.tickets.forEach((ticket) => {
		ticket.segments.forEach(segment => {
			stops.add(segment.stops.length);
			
		})
	});

	
	const stopsArr = (Array.from(stops).sort((a, b) => a - b));
	
	dispatch(ticketsLoaded(tickets.tickets));
	dispatch(setStops([1]));
	dispatch(loading(false));

};


export const setSortType = (sortType) => {
	return {
		type: 'SET_SORT_TYPE',
		payload: { sortType }
	}
};

export const setStops = (stops) => {
	return {
		type: 'SET_STOPS',
		payload: { stops }
	}
};

export const updateFilters = (updateFilters) => {
	return {
		type: 'UPDATE_FILTERS',
		payload: { updateFilters }
	}
};

export const loading = (isLoading) => {
	return {
		type: 'FETCH_TICKETS_LOADING',
		payload: { isLoading }
	}
};


export const ticketsRequest = () => {
	return {
		type: 'FETCH_TICKETS_REQUEST',
		payload: true
	}
};

export const ticketsLoaded = (newTickets) => {
	return {
		type: 'FETCH_TICKETS_SUCCESS',
		payload: newTickets
	}
};

export const ticketsError = (error) => {
	return {
		type: 'FETCH_TICKETS_FAILURE',
		payload: error
	}
};

export default {}

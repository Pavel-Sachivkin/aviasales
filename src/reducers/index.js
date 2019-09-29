const initialState = {
	tickets: [],
	isTicketsLoaded: false,
	error: null,
	loading: false,
	stops: [],
	sortType: 'cleap',
	updateFilters: false
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_SORT_TYPE":
			return {
				...state,
				sortType: action.payload.sortType,
				
			};
		case "SET_STOPS":
			return {
				...state,
				stops: action.payload.stops,
				
			};

		case "UPDATE_FILTERS" :
			return {
				...state,
				updateFilters: action.payload.updateFilters,

			};

			
		case "FETCH_TICKETS_LOADING":
			return {
				...state,
				loading: action.payload.isLoading,
				
			};
		case "FETCH_TICKETS_REQUEST":
			return {
				...state,
				isTicketsLoaded: false,
				
			};
		case "FETCH_TICKETS_SUCCESS":
			return {
				...state,
				tickets: action.payload,
				isTicketsLoaded: true
			};
		case "FETCH_TICKETS_FAILURE":
			return {
				...state,
				isTicketsLoaded: false,
				error: action.payload
			}

		default:
			return state;
	}
};

export default reducer;

const initialState = {
	tickets: [],
	isTicketsLoaded: false,
	error: null,
	stopsValue: {
		all: true,
		0: false,
		1: false,
		2: false,
		3: false
	},
	sortValue: "sortByPrice",
	loading: false,
	stops: [],
	sortType: 'cleap'
};

const findFalseValue = obj => {
	let value = false;
	for (var key in obj) {
		if ( obj[key] === true ) {
			value = true;
		}
	}
	return value;
};

const setStopsValue = (state, filter) => {
	let newState = {
		...state,
		stopsValue: {
			...state.stopsValue,
			[filter]: !state.stopsValue[filter]
		}
	};
	
	return findFalseValue(newState.stopsValue) === false
		? (newState = {
			...state,
			stopsValue: {
				...newState.stopsValue,
				all: true
			}
		})
		: newState;
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
		case "SET_STOPS_VALUE":
			return setStopsValue(state, action.payload);
		case "SET_SORT_VALUE":
			return {
				...state,
				sortValue: action.payload
			};
		default:
			return state;
	}
};

export default reducer;

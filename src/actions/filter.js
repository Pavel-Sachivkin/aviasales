
const setStopsFilter = (value) => {
    return {
    type:"SET_STOPS_VALUE",
    payload: {value}
    }
}


const setStopsValue = (stops) => {
    return {
        type: "SET_STOPS_VALUE",
        payload: stops
    }
}

export {
    setStopsFilter,
    setStopsValue
}
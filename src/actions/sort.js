
const setStopsValue = (stops) => {
    return {
    type:"SET_STOPS_VALUE",
    payload: stops
    }
}

const setSortValue = (value) => {
    return {
        type:"SET_SORT_VALUE",
        payload: value
    }
}


export {
    setStopsValue,
    setSortValue
}
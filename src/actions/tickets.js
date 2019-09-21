const ticketsRequest = () => {
    return {
        type: 'FETCH_TICKETS_REQUEST',
        payload:true
    }
}

const ticketsLoaded = (newTickets) => {
    return {
        type: 'FETCH_TICKETS_SUCCESS',
        payload: newTickets
    }
}
const ticketsError = (error) => {
    return {
        type: 'FETCH_TICKETS_FAILURE',
        payload: error
    }
}

export {
    ticketsRequest,
    ticketsLoaded,
    ticketsError
}
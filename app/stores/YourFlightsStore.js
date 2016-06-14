import alt from  '../alt';
import YourFlightsActions from '../actions/YourFlightsActions';

class YourFlightsStore {
    constructor() {
        this.flights = [];

        

        this.bindListeners({
            onGetFlights: YourFlightsActions.getFlightsDispatcher,
            onGetFlight: YourFlightsActions.getFlightDispatcher
        });
    }

    onGetFlights(data) {
        this.flights = data ? data : [];
    }

    onGetFlight(data) {
        this.flight = data ? data : {};
    }
}

export default alt.createStore(YourFlightsStore, 'YourFlightsStore');